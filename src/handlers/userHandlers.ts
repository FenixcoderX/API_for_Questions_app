// Handlers for user routes

import express, { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import { verifyAuthToken } from '../middleware/verification';
import { errorHandler } from '../middleware/error';

/**
 * Retrieves all users from the database and sends them as a response
 *
 * @param {Request}_req - The request object (unused)
 * @param {Response} res - The response object used to send all users
 * @param {NextFunction} next - The next function used to pass the error to the error handling middlewares
 */
const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Get all users from the database
    const users = await User.find();
    // Remove password and email key from each user
    const usersWithoutPasswordAndEmail = users.map((user) => {
      //@ts-ignore
      const { password: pass, email: email_, ...userWithoutPasswordAndEmail } = user._doc;
      return userWithoutPasswordAndEmail;
    });

    // Convert the array of users to an object with the user ID as the key
    const objectUsersWithoutPasswordAndEmail: { [key: string]: any } = usersWithoutPasswordAndEmail.reduce((obj: { [key: string]: any }, item) => {
      obj[item.id] = item;
      return obj;
    }, {});

    // Send the users as a response
    res.status(200).json(objectUsersWithoutPasswordAndEmail);
  } catch (err) {
    next(err);
  }
};

/**
 * Handles SSE updates for the 'Users' collection in the database
 * 
 * @param req - The request object used to listen for the connection close event
 * @param res - The response object used to send the updated data
 */
const updates = async (req: Request, res: Response) => {

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Subscribe to changes in 'Users' collection
  const changeStream = User.watch([], { fullDocument: 'updateLookup' });
  changeStream.on('change', (change) => {
    delete change.fullDocument.password;
    delete change.fullDocument.email;
    // Send updated data to the client every time there is a change in the collection
    res.write(`data: ${JSON.stringify(change.fullDocument)}\n\n`);
  });

  // When the connection closes, stop listening for changes
  req.on('close', () => {
    changeStream.close();
    res.end();
  });
};

// Express routes here

/**
 * Routes for user endpoints
 *
 * @param {express.Application} app - The express application object
 */
const userRoutes = (app: express.Application) => {
  // Route to send all users information
  app.get('/users/allusers', getAll);

  // Route to send updates for the users collection
  app.get('/users/updates', verifyAuthToken, updates);
};

export default userRoutes;

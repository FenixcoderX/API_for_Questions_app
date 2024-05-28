// Handlers for user routes

import express, { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
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
    // Remove password key from each user
    const usersWithoutPassword = users.map((user) => {
      //@ts-ignore
      const { password: pass, ...userWithoutPassword } = user._doc;
      return userWithoutPassword;
    });

    // Convert the array of users to an object with the user ID as the key
    const objectUsersWithoutPassword: { [key: string]: any } = usersWithoutPassword.reduce((obj: { [key: string]: any }, item) => {
      obj[item.id] = item;
      return obj;
    }, {});

    // Send the users as a response
    res.status(200).json(objectUsersWithoutPassword);
  } catch (err) {
    next(err);
  }
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
};

export default userRoutes;

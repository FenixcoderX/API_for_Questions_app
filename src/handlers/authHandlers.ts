// Handlers for user routes

import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import { errorHandler } from '../middleware/error';

// Handler functions here

const { BCRYPT_PASSWORD: pepper, SALT_ROUNDS: saltRounds } = process.env;

/**
 * Creates a new user
 *
 * @param {Request} req - The request object containing the user information to create
 * @param {Response} res - The response object used to send massage that signup was successful
 * @param {NextFunction} next - The next function used to pass the error to the error handling middlewares
 */
const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { id, password, name } = req.body;

  if (!id || !password || !name || id === '' || password === '' || name === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  // Destructure the BCRYPT_PASSWORD and SALT_ROUNDS from the process.env object and assign them to the pepper and saltRounds variables
  const hash = bcrypt.hashSync(password + pepper, Number(saltRounds));
  const newUser = new User({
    id,
    password: hash,
    name,
    answers: {},
  });
  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (err) {
    next(err);
  }
};

/**
 * Authenticates a user
 *
 * @param {Request} req - The request object containing the user information to authenticate
 * @param {Response} res - The response object used to send the user information and token in the cookie
 * @param {NextFunction} next - The next function used to pass the error to the error handling middlewares
 */
const login = async (req: Request, res: Response, next: NextFunction) => {
  const { id, password } = req.body;

  if (!id || !password || id === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ id });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcrypt.compareSync(password + pepper, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign({ id: validUser.id }, process.env.TOKEN_SECRET as string);
    //@ts-ignore
    const { password: pass, ...validUserWithoutPassword } = validUser._doc; //_doc used beacause this is a mongoose object and needed data to use rest opearator is in _doc

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(validUserWithoutPassword);
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('access_token').status(200).json('User has been logged out');
  } catch (error) {
    next(error);
  }
};
// Express routes here

/**
 * Routes for user endpoints
 *
 * @param {express.Application} app - The express application object
 */
const authRoutes = (app: express.Application) => {
  // Route to show all users using middleware to verify the token
  app.post('/auth/signup', signup);
  // Route to show a specific user using middleware to verify the token
  app.post('/auth/login', login);
  // Route to log out
  app.post('/auth/logout', logout);
  // // Route to authenticate a user
  // app.post('/auth/authenticate', authenticate),
  // // Route to update a user using middleware to verify the token
  // app.put('/auth/:id', verifyAuthToken, update),
  // // Route to delete a user using middleware to verify the token
  // app.delete('/auth/:id', verifyAuthToken, del);
};

export default authRoutes;

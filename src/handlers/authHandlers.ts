// Handlers for user routes

import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import { verifyAuthToken } from '../middleware/verification';
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
  const { email, password, name, avatarURL } = req.body;

  if (!email || !password || !name || email === '' || password === '' || name === '') {
    next(errorHandler(400, 'All fields are required'));
  }
  const generateUID = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // Destructure the BCRYPT_PASSWORD and SALT_ROUNDS from the process.env object and assign them to the pepper and saltRounds variables
  const hash = bcrypt.hashSync(password + pepper, Number(saltRounds));
  const newUser = new User({
    id: generateUID(),
    email,
    password: hash,
    name,
    avatarURL,
    answers: {},
  });
  try {
    const newUserFromDB = await newUser.save();
    //@ts-ignore
    const { password: pass, email: email_, ...newUserFromDBWithoutPasswordEmail } = newUserFromDB._doc;
    res.json(newUserFromDBWithoutPasswordEmail);
  } catch (err) {
    console.log(err);
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
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcrypt.compareSync(password + pepper, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign({ id: validUser.id }, process.env.TOKEN_SECRET as string);
    //@ts-ignore
    const { password: pass, email: email_, ...validUserWithoutPassword } = validUser._doc; //_doc used beacause this is a mongoose object and needed data to use rest opearator is in _doc

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .json(validUserWithoutPassword);
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('access_token',{
      sameSite: 'none',
      secure: true,
    }).status(200).json('User has been logged out');
  } catch (error) {
    next(error);
  }
};

const google = async (req: Request, res: Response, next: NextFunction) => {
  const { email, avatarURL } = req.body;
  let { name } = req.body;
  if (!email || !avatarURL || !name || email === '' || avatarURL === '' || name === '') {
    next(errorHandler(400, 'All fields are required'));
  }
  try {
    const validUser = await User.findOne({ email });
    if (validUser) {
      const token = jwt.sign({ id: validUser.id }, process.env.TOKEN_SECRET as string);
      //@ts-ignore
      const { password: pass, email: email_, ...validUserWithoutPassword } = validUser._doc; //_doc used beacause this is a mongoose object and needed data to use rest opearator is in _doc

      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(validUserWithoutPassword);
    } else {
      
      const userWithSpecificName = await User.findOne({ name });
      if (userWithSpecificName) {
        name = `${name}${Math.floor(Math.random() * 100000)}`;
      }
      const generateUID = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      };
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hash = bcrypt.hashSync(generatedPassword + pepper, Number(saltRounds));
      const newUser = new User({
        id: generateUID(),
        email,
        password: hash,
        name,
        avatarURL,
        answers: {},
      });

      const newUserFromDB = await newUser.save();
      const token = jwt.sign({ id: newUserFromDB.id }, process.env.TOKEN_SECRET as string);
      //@ts-ignore
      const { password: pass, email: email_, ...newUserFromDBWithoutPassword } = newUserFromDB._doc; //_doc used beacause this is a mongoose object and needed data to use rest opearator is in _doc

      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .json(newUserFromDBWithoutPassword);
    }
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
const authRoutes = (app: express.Application) => {
// Route to create a new user
  app.post('/auth/signup', signup);
// Route to login a user
  app.post('/auth/login', login);
  // Route to log out
  app.post('/auth/logout', verifyAuthToken, logout);
  // Route to authenticate a google user
  app.post('/auth/google', google);
};

export default authRoutes;

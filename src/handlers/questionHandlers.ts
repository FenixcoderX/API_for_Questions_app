// Handlers for user routes

import express, { NextFunction, Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/verification';
import Question from '../models/question.model';
import User from '../models/user.model';
import { errorHandler } from '../middleware/error';
import mongoose from 'mongoose';

// Handler functions here

/**
 * Retrieves all questions from the database and sends them as a response
 *
 * @param {Request}_req - The request object (unused)
 * @param {Response} res - The response object used to send all users
 * @param {NextFunction} next - The next function used to pass the error to the error handling middlewares
 *
 */
const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Get all users from the database
    const questions = await Question.find();

    // Convert the array of users to an object with the user ID as the key
    const objectWithQuestions: { [key: string]: any } = questions.reduce((obj: { [key: string]: any }, item) => {
      obj[item.id] = item;
      return obj;
    }, {});

    // Send the users as a response
    res.status(200).json(objectWithQuestions);
  } catch (err) {
    next(err);
  }
};

/**
 * Creates a new question
 *
 * @param {Request} req - The request object containing the question information to create
 * @param {Response} res - The response object with the saved question
 * @param {NextFunction} next - The next function used to pass the error to the error handling middlewares
 */
const create = async (req: Request, res: Response, next: NextFunction) => {
  const { optionOneText, optionTwoText, author } = req.body;

  if (!optionOneText || !optionTwoText || !author || optionOneText === '' || optionTwoText === '' || author === '') {
    next(errorHandler(400, 'All fields are required'));
  }
  if (optionOneText.length > 100 || optionTwoText.length > 100) {
    next(errorHandler(400, 'Question length should not exceed 100 characters'));
  }

  if (author !== req.body.decoded.id) {
    next(errorHandler(401, 'Unauthorized'));
  }

  const generateUID = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // Create a new question
  const newQuestion = new Question({
    id: generateUID(),
    timestamp: Date.now(),
    author: author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  });

  try {
    const savedQuestion = await newQuestion.save();
    res.json(savedQuestion);
  } catch (err) {
    next(err);
  }
};

/**
 * Saves an answer to the question
 *
 * @param {Request} req - The request object containing the information about the answer
 * @param {Response} res - The response object with the massage that the question was updated successfully
 * @param {NextFunction} next - The next function used to pass the error to the error handling middlewares
 */
const saveAnswer = async (req: Request, res: Response, next: NextFunction) => {
  const { authedUser, qid, answer } = req.body;

  if (!authedUser || !qid || !answer || authedUser === '' || qid === '' || answer === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  if (authedUser !== req.body.decoded.id) {
    next(errorHandler(401, 'Unauthorized'));
  }

  // Create a new session to handle multiple operations in a transaction
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const updatedQuestion = await Question.findOneAndUpdate({ id: qid }, { $push: { [`${answer}.votes`]: authedUser } }, { new: true, session });

    const updatedUser = await User.findOneAndUpdate({ id: authedUser }, { $set: { [`answers.${qid}`]: answer } }, { new: true, session });

    if (!updatedQuestion || !updatedUser) {
      throw new Error('Update failed');
    }

    await session.commitTransaction();

    res.json('Question updated successfully');
  } catch (err) {
    await session.abortTransaction();

    next(err);
  } finally {
    session.endSession();
  }
};

// Express routes here

/**
 * Routes for questions endpoints
 *
 * @param {express.Application} app - The express application object
 */
const questionRoutes = (app: express.Application) => {
  // Route to send all questions
  app.get('/questions/allquestions', getAll);

  // Route to create a new question
  app.post('/questions/create', verifyAuthToken, create);

  // Route to save an answer to the question
  app.put('/questions/saveanswer', verifyAuthToken, saveAnswer);

};

export default questionRoutes;

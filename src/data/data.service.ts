import User from '../models/user.model';
import Question from '../models/question.model';
import { users, questions } from './_DATA';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

/**
 * Sets the initial data by deleting existing users and questions data from MongoDB,
 * and then inserting new users and questions data into MongoDB
 */
async function setInitialData() {
    // Delete all users data from MongoDB
   await User.deleteMany({})
      .then(() => {
        console.log('Successfully delete users data from MongoDB');
      })
      .catch((err) => {
        console.log(err);
      });
  
    // Insert users data into MongoDB
    await User.insertMany(users, {})
      .then(() => {
        console.log('Successfully add users data into MongoDB');
      })
      .catch((err) => {
        console.log(err);
      });
  
    // Delete all questions data from MongoDB
    await Question.deleteMany({})
      .then(() => {
        console.log('Successfully delete questions data from MongoDB');
      })
      .catch((err) => {
        console.log(err);
      });
  
    // Insert questions data into MongoDB
    await Question.insertMany(questions, {})
      .then(() => {
        console.log('Successfully add questions data into MongoDB');
      })
      .catch((err) => {
        console.log(err);
      });
  }

//Load the environment variables from the .env file into process.env
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO as string)
  .then(() => {
    console.log('MongoDb is connected');
    setInitialData();
  })
  .catch((err) => {
    console.log(err);
  });

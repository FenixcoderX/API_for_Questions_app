// The entry point for the application. It creates an express server and defines routes for the app.

import express, { NextFunction, Request, Response } from 'express';
import authRoutes from './handlers/authHandlers';
import userRoutes from './handlers/userHandlers';
import questionRoutes from './handlers/questionHandlers';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Create a new express server
const app: express.Application = express();
const address: string = '0.0.0.0:3001';

// Load the environment variables from the .env file into process.env
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO as string)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Name of the domain - "for all requests" (can be changed in the future)
  optionsSuccessStatus: 200,
  credentials: true, // This allows session cookies to be sent with the request
};

// Use CORS middleware
app.use(cors(corsOptions));
// Use cookie parser middleware
app.use(cookieParser());

// Extracts the entire body portion of an incoming request stream and exposes it on req.body
app.use(express.json());

// Define a route handler for the default home page
app.get('/', (req: Request, res: Response) => {
  res.send('This is API');
});

// Start the Express server
app.listen(3001, () => {
  console.log(`starting app on: ${address}`);
});

// Define routes for the app
authRoutes(app);
userRoutes(app);
questionRoutes(app);

export default app;

interface CustomError extends Error {
  statusCode: number;
}

// Error handling middleware, should be the last app.use() call
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

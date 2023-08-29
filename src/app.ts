/* eslint-disable no-unused-vars */
import cors from 'cors';
import httpStatus from 'http-status';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookies from 'cookie-parser';
import { BookRoutes } from './app/modules/book/book.route';

const app: Application = express();

app.use(cors());
app.use(cookies());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json('Book Catalog Server');
});
app.use('/api/v1/books', BookRoutes);

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;

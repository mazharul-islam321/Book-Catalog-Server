import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from './book.interface';
import { BookService } from './book.service';

const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookService.createBook(req.body);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book created successfully!',
      data: result,
    });
  }
);

export const BookController = {
  createBook,
};

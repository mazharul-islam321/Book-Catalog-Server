import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from './book.interface';
import { BookService } from './book.service';
import pick from '../../../shared/pick';
import { bookFilterableFields } from './book.constant';

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

const getAllBooks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields);

    const result = await BookService.getAllBooks(filters);
    sendResponse<IBook[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book fetched successfully!',
      data: result,
    });
  }
);

const getSingleBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookService.getSingleBook(req.params.id);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book fetched successfully!',
      data: result,
    });
  }
);

const updateSingleBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const bookData = req.body;
    const result = await BookService.updateSingleBook(id, bookData);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book updated successfully!',
      data: result,
    });
  }
);

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
};

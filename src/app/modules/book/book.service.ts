import { IBook } from './book.interface';
import Book from './book.model';

const createBook = async (book: IBook): Promise<IBook | null> => {
  return await Book.create(book);
};

export const BookService = {
  createBook,
};

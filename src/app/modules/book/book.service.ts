import { bookSearchableFields } from './book.constant';
import { IBook, IBookFilters } from './book.interface';
import Book from './book.model';

const createBook = async (book: IBook): Promise<IBook | null> => {
  return await Book.create(book);
};

const getAllBooks = async (filters: IBookFilters): Promise<IBook[]> => {
  const { searchTerm, year, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  if (year) {
    const startOfYear = new Date(+year, 0, 1).toISOString();
    const endOfYear = new Date(+year, 11, 31, 23, 59, 59).toISOString();
    andConditions.push({
      publicationDate: {
        $gte: startOfYear,
        $lt: endOfYear,
      },
    });
  }

  const queryCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(queryCondition);
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
};

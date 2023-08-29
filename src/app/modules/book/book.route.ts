import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { bookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(bookValidation.bookZodSchema),
  BookController.createBook
);
router.get('/', BookController.getAllBooks);

router.get('/:id', BookController.getSingleBook);
router.patch('/:id', BookController.updateSingleBook);

export const BookRoutes = router;

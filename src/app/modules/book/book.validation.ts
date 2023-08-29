import { z } from 'zod';

const bookZodSchema = z.object({
  body: z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string(),
    publicationDate: z.string(),
  }),
});

export const bookValidation = {
  bookZodSchema,
};

import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

export const createTodoSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    completed: z.boolean().default(false),
  })
  .strict({
    message:
      'You provided an invalid field, valid fields are: title, description, completed',
  });

export const createTodoValidator = zValidator(
  'json',
  createTodoSchema,
  (result, c) => {
    if (!result.success) {
      return c.json(
        {
          errors: result.error.issues.map((issue) => issue.message),
        },
        400
      );
    }
  }
);

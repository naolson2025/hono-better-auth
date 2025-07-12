import { Hono } from 'hono';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getTodosByUserId, insertTodo } from '../db/queries';
import type { HonoEnv } from '../types';
import { createTodoValidator } from '../validators/create-todo.validator';

export const todos = new Hono<HonoEnv>();

todos.use(authMiddleware);

todos.get('/', async (c) => {
  const user = c.get('user');

  try {
    const todoList = await getTodosByUserId(user.id);
    return c.json(todoList);
  } catch (error) {
    console.error('Error fetching todos: ', error);
    return c.json({ error: 'Failed to fetch todos' }, 500);
  }
});

todos.post('/', createTodoValidator, async (c) => {
  const user = c.get('user');
  const todoData = c.req.valid('json');

  try {
    const newTodo = await insertTodo({
      ...todoData,
      userId: user.id,
    });
    return c.json(newTodo, 201);
  } catch (error) {
    console.error('Error creating todo: ', error);
    return c.json({ error: 'Failed to create todo' }, 500);
  }
});

import { Hono } from 'hono';
import { auth } from './lib/auth';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { todos } from './routes/todos.routes';

const app = new Hono();

app.use('*', logger());
app.use('*', prettyJSON());

app
  .on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw))
  .route('/api/todos', todos)
  .get('/health', (c) => {
    return c.json({ status: 'healthy!! 🔥' });
  })
  .get('/', (c) => {
    return c.json({ message: 'Hello Hono' }, 200);
  });

export default app;

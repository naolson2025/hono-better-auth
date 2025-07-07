import { Hono } from 'hono';
import { auth } from './lib/auth';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { todos } from './routes/todos.routes';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('*', logger());
app.use('*', prettyJSON());
app.use(
  '*',
  cors({
    origin: 'http://localhost:3000', // replace with your origin
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })
);

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

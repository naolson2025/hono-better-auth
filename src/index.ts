import { Hono } from 'hono';
import { auth } from './lib/auth';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

const app = new Hono();

app.use('*', logger());
app.use('*', prettyJSON());

app
  .on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw))
  .get('/', (c) => {
    return c.text('Hello Hono!');
  });

export default app;

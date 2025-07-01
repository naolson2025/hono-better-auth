import { Hono } from 'hono';
import { auth } from './lib/auth';

const app = new Hono();

// app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app
  .use('/api/**', (c) => auth.handler(c.req.raw))
  .get('/', (c) => {
    return c.text('Hello Hono!');
  });

export default app;

/*
  Example usage:

  hono> const res = await app.request('/health')
  undefined
  hono> await res.json()
  { status: 'healthy!! 🍀' }

  hono> await queries.getUserByEmail('test@test.com')
*/

import * as repl from 'node:repl';
import { serve } from '@hono/node-server';
import app from '../src/index';
import * as queries from '../src/db/queries';
import * as db from '../src/db/db';

console.log('🚀 Starting Hono server for console...');

const server = serve(
  {
    fetch: app.fetch,
    port: 3001,
  },
  (info) => {
    console.log(`✅ Server listening on http://localhost:${info.port}`);
  }
);

console.log('🔥 Starting interactive console... (Press Ctrl+C twice to exit)');
console.log('Available globals: app, queries, db');

const replServer = repl.start({
  prompt: 'hono> ',
  useColors: true,
});

replServer.context.app = app;
replServer.context.queries = queries;
replServer.context.db = db;

replServer.on('exit', () => {
  console.log('👋 Exiting console and shutting down server...');
  server.close(() => {
    console.log('✅ Server shut down.');
    process.exit(0);
  });
});

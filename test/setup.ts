import { beforeAll, afterAll, afterEach, mock } from 'bun:test';
import {
  createTestDb,
  destroyTestDb,
  resetDb,
  TestDbContext,
} from './setup-test-db';

let ctx: TestDbContext;

beforeAll(async () => {
  ctx = await createTestDb();

  await mock.module('../src/db/db.ts', () => ({
    db: ctx.db,
  }));
});

afterEach(async () => {
  await resetDb(ctx);
});

afterAll(async () => {
  await destroyTestDb(ctx);
});

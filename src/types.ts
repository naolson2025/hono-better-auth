import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import type { todos } from '@/db/schema';
import { auth } from './lib/auth';

export type Todo = InferSelectModel<typeof todos>;
export type NewTodo = InferInsertModel<typeof todos>;

export type HonoEnv = {
  Variables: {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  };
};

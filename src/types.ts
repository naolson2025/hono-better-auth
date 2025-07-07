import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import type { user, todos, session, account, verification } from '@/db/schema';
import type { auth } from './lib/auth';

export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

export type Todo = InferSelectModel<typeof todos>;
export type NewTodo = InferInsertModel<typeof todos>;

export type Session = InferSelectModel<typeof session>;
export type NewSession = InferInsertModel<typeof session>;

export type Account = InferSelectModel<typeof account>;
export type NewAccount = InferInsertModel<typeof account>;

export type Verification = InferSelectModel<typeof verification>;
export type NewVerification = InferInsertModel<typeof verification>;

export type HonoEnv = {
  Variables: {
    user: typeof auth.$Infer.Session.user;
  };
};

import { createMiddleware } from 'hono/factory';
import { auth } from '@/lib/auth';
import type { HonoEnv } from '@/types';

export const authMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session?.user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const user = {
    ...session.user,
    image: session.user.image ?? null, // Convert undefined to null
  };

  c.set('user', user);
  await next();
});

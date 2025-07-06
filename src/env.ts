import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  DATABASE_URL: z.string().url(),
  ADMIN_DB_URL: z.string().url().optional(),
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.string().url(),
  MAILGUN_DOMAIN: z.string().min(1),
  MAILGUN_API_KEY: z.string().min(1),
});

export type Environment = z.infer<typeof EnvSchema>;

export function parseEnv(data: Record<string, unknown>) {
  const { data: env, error } = EnvSchema.safeParse(data);

  if (error) {
    const errorMessage = `error: invalid env:\n${Object.entries(
      error.flatten().fieldErrors
    )
      .map(([key, errors]) => `${key}: ${errors.join(', ')}`)
      .join('\n')}`;
    throw new Error(errorMessage);
  }

  return env;
}

export const env = parseEnv(Object.assign(process.env));

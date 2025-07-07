import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db/db';
import { openAPI } from 'better-auth/plugins';
import { sendEmail } from '@/lib/email';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }) => {
      await sendEmail({
        to: user.email,
        subject: 'Reset Your Password',
        text: `Please click the following link to reset your password: ${url}`,
        html: `<p>Please click the following link to reset your password: <a href="${url}">Reset Password</a></p><p>Token: ${token}</p>`,
      });
    },
  },
  plugins: [openAPI()],
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Verify Your Email Address',
        text: `Please click the following link to verify your email address: ${url}`,
        html: `<p>Please click the following link to verify your email address: <a href="${url}">Verify Email</a></p>`,
      });
    },
  },
});

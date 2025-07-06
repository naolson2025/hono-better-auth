import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { env } from '@/env';

interface EmailParams {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail({ to, subject, text, html }: EmailParams) {
  const mailgunDomain = env.MAILGUN_DOMAIN;
  const mailgunApiKey = env.MAILGUN_API_KEY;

  // 1. Initialize the Mailgun client
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: 'api',
    key: mailgunApiKey,
  });

  // 2. Define the message payload
  const messageData = {
    from: `Your App Name <noreply@${mailgunDomain}>`,
    to,
    subject,
    text,
    html,
  };

  // 3. Send the message
  try {
    const data = await mg.messages.create(mailgunDomain, messageData);
    console.log('Email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Error sending email via Mailgun:', error);
    throw new Error('Failed to send email.');
  }
}

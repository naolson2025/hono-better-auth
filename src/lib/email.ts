// import FormData from 'form-data';
const FormData = require('form-data');
import Mailgun from 'mailgun.js';

type EmailParams = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail({ to, subject, text }: EmailParams) {
  const mailgunDomain = process.env.MAILGUN_DOMAIN;
  const mailgunApiKey = process.env.MAILGUN_API_KEY;

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: 'api',
    key: mailgunApiKey!,
  });

  const messageData = {
    from: `Nick Olson Codes <noreply@${mailgunDomain}>`,
    to,
    subject,
    text,
  };

  try {
    const data = await mg.messages.create(mailgunDomain!, messageData);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

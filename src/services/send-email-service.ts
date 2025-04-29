import nodemailer from 'nodemailer';
import 'dotenv/config';

interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export class SendEmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
      port: Number(process.env.SMTP_PORT) || 2525,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'c1e44ce8c7d257',
        pass: process.env.SMTP_PASS || '1a55688bb3a51a',
      },
    });
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: '"Platform Name" <no-reply@example.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
  }
}
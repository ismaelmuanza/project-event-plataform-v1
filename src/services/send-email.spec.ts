import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { SendEmailService } from '@/services/send-email-service';

import nodemailer from 'nodemailer';

vi.mock('nodemailer');

describe('SendEmailService', () => {
  let sendEmailService: SendEmailService;
  let sendMailMock: Mock;

  beforeEach(() => {
    sendMailMock = vi.fn();
    (nodemailer.createTransport as Mock).mockReturnValue({
      sendMail: sendMailMock,
    });

    sendEmailService = new SendEmailService();
  });

  it('should send an email with the correct options', async () => {
    await sendEmailService.sendEmail({
      to: 'test@example.com',
      subject: 'Test Email',
      text: 'This is a test email.',
      html: '<p>This is a test email.</p>',
    });

    expect(sendMailMock).toHaveBeenCalledWith({
      from: '"Platform Name" <no-reply@example.com>',
      to: 'test@example.com',
      subject: 'Test Email',
      text: 'This is a test email.',
      html: '<p>This is a test email.</p>',
    });
  });

  it('should throw an error if email sending fails', async () => {
    sendMailMock.mockRejectedValueOnce(new Error('Failed to send email'));

    await expect(
      sendEmailService.sendEmail({
        to: 'test@example.com',
        subject: 'Test Email',
        text: 'This is a test email.',
      }),
    ).rejects.toThrow('Failed to send email');
  });
});
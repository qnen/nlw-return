import nodemailer from 'nodemailer';
import { MailIntegration, SendMailData } from '../mail-integration';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '88109c92299877',
    pass: '5201ecc4515d3b',
  },
});

export class NodemailerMailIntegration implements MailIntegration {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@geedget.com>',
      to: 'Gabriel Brecci <gbrecci@gmail.com>',
      subject,
      html: body,
    });
  }
}

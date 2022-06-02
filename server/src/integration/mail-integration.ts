export interface SendMailData {
  subject: string;
  body: string;
}

export interface MailIntegration {
  sendMail: (mailData: SendMailData) => void;
}

import { MailIntegration } from '../integration/mail-integration';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedback {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailIntegration: MailIntegration
  ) {}

  async handle(request: SubmitFeedbackRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error('Type is required.');
    }
    if (!comment) {
      throw new Error('Comment is required.');
    }

    if (
      screenshot &&
      !screenshot.startsWith('data:image/png;base64')
    ) {
      throw new Error('Invalid screenshot format.');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailIntegration.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join('\n'),
    });
  }
}

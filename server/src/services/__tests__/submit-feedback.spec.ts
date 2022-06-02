import { SubmitFeedback } from '../submit-feedback';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedback(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.handle({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,iVBORw0KGgoU',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(
      submitFeedback.handle({
        type: '',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,iVBORw0KGgoU',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(
      submitFeedback.handle({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,iVBORw0KGgoU',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.handle({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'test.jpg',
      })
    ).rejects.toThrow();
  });
});

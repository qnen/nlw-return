export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (feedbackData: FeedbackCreateData) => Promise<void>;
}

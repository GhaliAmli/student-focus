export interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: Date;
  status: 'pending' | 'reviewed';
}

export interface FeedbackFormData {
  name: string;
  email: string;
  message: string;
}

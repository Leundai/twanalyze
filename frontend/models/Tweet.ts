export enum SentimentScore {
  Positive = 'positive',
  Negative = 'negative',
  Neutral = 'neutral',
  Mixed = 'mixed'
}

export type SentimentMagnitude = {
  positive: number,
  negative: number,
  neutral: number
}
export interface Sentiment {
  score: SentimentScore; // The type of tweet emotion – with Azure, this number is between 0 and 1 (0 is negative, 1 is positive)
  magnitude: SentimentMagnitude; // The strength of the tweet emotion
}

export interface User {
  name: string;
  username: string;
  profile_picture: string; // URL to profile picture
  tweets: Tweet[];
  average_sentiment: SentimentMagnitude
}

export interface Tweet {
  text: string;
  likes: number;
  retweets: number;
  time_created: string; // Date is formatted "2020-10-07T17:09:37Z"
  sentiment: Sentiment;
  reply_sentiment?: Sentiment; // Sentiment of all replies; not implemented as of now
  replies: Tweet[];
}

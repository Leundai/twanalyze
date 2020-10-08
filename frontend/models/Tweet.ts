export interface Sentiment {
  score: number;
  magnitude: number;
}

export interface User {
  name: string;
  username: string;
  profile_picture: string; // URL to profile picture
  tweets: Tweet[];
}

export interface Tweet {
  text: string;
  likes: number;
  retweets: number;
  time_created: Date; // Might be the incorrect type and may change - date is formatted "2020-10-07T17:09:37Z"
  sentiment: Sentiment;
  reply_sentiment?: Sentiment; // Sentiment of all replies; not implemented as of now
  replies: Tweet[];
}

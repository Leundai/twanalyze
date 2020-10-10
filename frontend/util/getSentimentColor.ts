import { SentimentScore } from "../models/Tweet";

export const getSentimentColor = (score: SentimentScore, opacity: number) => {
    switch (score) {
        case SentimentScore.Positive:
          return `rgba(0, 200, 100, ${opacity})`;
        case SentimentScore.Negative:
          return `rgba(200, 0, 100, ${opacity})`;
        case SentimentScore.Mixed:
          return `rgba(255, 200, 100, ${opacity})`;
        case SentimentScore.Neutral:
          return `rgba(150, 150, 150, ${opacity})`;
        default:
          return `rgba(150, 150, 150, ${opacity})`;
      }
    
}

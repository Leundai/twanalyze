import { SentimentScore } from "../models/Tweet";

export const getSentimentColor = (score: SentimentScore, opacity: number = 0.9) => {
    // switch (score) {
    //     case SentimentScore.Positive:
    //       return `rgba(0, 200, 100, ${opacity})`;
    //     case SentimentScore.Negative:
    //       return `rgba(200, 0, 100, ${opacity})`;
    //     case SentimentScore.Mixed:
    //       return `rgba(255, 200, 100, ${opacity})`;
    //     case SentimentScore.Neutral:
    //       return `rgba(150, 150, 150, ${opacity})`;
    //     default:
    //       return `rgba(150, 150, 150, ${opacity})`;
    //   }
    switch (score) {
        case SentimentScore.Positive:
          return `rgba(0, 195, 87, ${opacity})`;
        case SentimentScore.Negative:
          return `rgba(244, 0, 92, ${opacity})`;
        case SentimentScore.Mixed:
          return `rgba(255, 169, 0, ${opacity})`;
        case SentimentScore.Neutral:
          return `rgba(132, 154, 167, ${opacity})`;
        default:
          return `rgba(132, 154, 167, ${opacity})`;
      }
    // switch (score) {
    //     case SentimentScore.Positive:
    //       return `#00C357`;
    //     case SentimentScore.Negative:
    //       return `#F4005C`;
    //     case SentimentScore.Mixed:
    //       return `#FFA900`;
    //     case SentimentScore.Neutral:
    //       return `#849AA7`;
    //     default:
    //       return `#849AA7`;
    //   }
    
}

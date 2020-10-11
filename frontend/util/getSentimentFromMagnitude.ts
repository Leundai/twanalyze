import { Sentiment, SentimentMagnitude, SentimentScore } from "../models/Tweet";

export const getSentimentFromMagnitude = (magnitude: SentimentMagnitude): Sentiment => {
  if (
    magnitude.negative > magnitude.neutral &&
    magnitude.negative > magnitude.positive
  ) {
    return {
      score: SentimentScore.Negative,
      magnitude
    };
  } else if (
    magnitude.neutral > magnitude.negative &&
    magnitude.neutral > magnitude.positive
  ) {
    return {
      score: SentimentScore.Neutral,
      magnitude
    };
  } else return {
    score: SentimentScore.Positive,
    magnitude
  }
}

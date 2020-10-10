import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Sentiment, SentimentScore } from '../models/Tweet';
import { StyleSheet } from 'react-native';
import { getSentimentColor } from '../util/getSentimentColor';

interface Props {
  sentiment: Sentiment;
  opacity?: number;
}

const SentimentChartScoreIcon = ({ sentiment, opacity }: Props) => {
  const { score } = sentiment;
  const color = getSentimentColor(sentiment.score, opacity);

  switch (score) {
    case SentimentScore.Positive:
      return <FontAwesome5 name='smile' color={color} style={styles.icon} />;
    case SentimentScore.Negative:
      return <FontAwesome5 name='angry' color={color} style={styles.icon} />;
    case SentimentScore.Mixed:
      return <FontAwesome5 name='surprise' color={color} style={styles.icon} />;
    case SentimentScore.Neutral:
      return <FontAwesome5 name='meh' color={color} style={styles.icon} />;
    default:
      return <FontAwesome5 name='meh' color={color} style={styles.icon} />;
  }
};

export default SentimentChartScoreIcon;

const styles = StyleSheet.create({
  icon: {
    fontSize: 36,
  },
});

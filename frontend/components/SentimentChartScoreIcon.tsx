import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Sentiment, SentimentScore } from '../models/Tweet';
import { StyleSheet } from 'react-native';

interface Props {
  sentiment: Sentiment;
  opacity: number;
}

const SentimentChartScoreIcon = ({ sentiment, opacity }: Props) => {
  const { score } = sentiment;

  switch (score) {
    case 'Positive':
      return (
        <FontAwesome5
          name='smile'
          color={`rgba(0, 200, 100, ${opacity})`}
          style={styles.icon}
        />
      );
    case 'Negative':
      return (
        <FontAwesome5
          name='angry'
          color={`rgba(200, 0, 100, ${opacity})`}
          style={styles.icon}
        />
      );
    case 'Mixed':
      return (
        <FontAwesome5
          name='surprise'
          color={`rgba(255, 200, 100, ${opacity})`}
          style={styles.icon}
        />
      );
    case 'Neutral':
      return (
        <FontAwesome5
          name='meh'
          color={`rgba(150, 150, 150, ${opacity})`}
          style={styles.icon}
        />
      );
  }
};

export default SentimentChartScoreIcon;

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 30.5,
    left: 32.5,
    fontSize: 36,
  },
});

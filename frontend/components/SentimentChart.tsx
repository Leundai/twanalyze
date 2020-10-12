import React from 'react';

import { View, Text, Image, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import { Sentiment, SentimentScore } from '../models/Tweet';
import { getSentimentColor } from '../util/getSentimentColor';
import SentimentChartScoreIcon from './SentimentChartScoreIcon';

interface Props {
  sentiment: Sentiment;
  hideLegend?: boolean;
  customImageURI?: string;
}

const SentimentChart = ({ sentiment, hideLegend, customImageURI }: Props) => {
  const pieData = [
    {
      name: 'Positive',
      score: sentiment.magnitude.positive,
      color: getSentimentColor(SentimentScore.Positive),
    },
    {
      name: 'Neutral',
      score: sentiment.magnitude.neutral,
      color: getSentimentColor(SentimentScore.Neutral),
    },
    {
      name: 'Negative',
      score: sentiment.magnitude.negative,
      color: getSentimentColor(SentimentScore.Negative),
    },
  ];

  const scoreChartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    color: () => getSentimentColor(sentiment.score),
  };

  // Capitalize score
  const scoreText =
    sentiment.score.charAt(0).toUpperCase() + sentiment.score.slice(1);

  return (
    <View style={styles.container}>
      <PieChart
        width={100}
        height={100}
        backgroundColor='transparent'
        data={pieData}
        chartConfig={scoreChartConfig}
        hasLegend={false}
        absolute
        accessor='score'
        paddingLeft='25'
      />
      <View
        style={customImageURI ? styles.imageContainer : styles.iconContainer}
      >
        {customImageURI ? (
          <Image source={{ uri: customImageURI }} style={styles.image} />
        ) : (
          <SentimentChartScoreIcon sentiment={sentiment} />
        )}
      </View>
      {hideLegend ? (
        <></>
      ) : (
        <>
          <Text style={styles.label}>{scoreText}</Text>
          <Text style={styles.dataDisplay}>
            Positive: {Math.round(sentiment.magnitude.positive * 100)}%
          </Text>
          <Text style={styles.dataDisplay}>
            Negative: {Math.round(sentiment.magnitude.negative * 100)}%
          </Text>
          <Text style={styles.dataDisplay}>
            Neutral: {Math.round(sentiment.magnitude.neutral * 100)}%
          </Text>
        </>
      )}
    </View>
  );
};

export default SentimentChart;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  iconTest: {
    position: 'absolute',
    top: 30.5,
    left: 32.5,
    fontSize: 36,
  },
  label: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 5,
    maxWidth: 100,
  },
  dataDisplay: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 11,
  },
  iconContainer: {
    backgroundColor: '#0D202D',
    position: 'absolute',
    paddingVertical: 5,
    paddingHorizontal: 7,
    top: 25.5,
    left: 25.5,
    borderRadius: 50,
  },
  imageContainer: {
    backgroundColor: '#0D202D',
    position: 'absolute',
    padding: 7,
    top: 23.25,
    left: 23.25,
    borderRadius: 50,
  },
  icon: {
    position: 'absolute',
    top: 30.5,
    left: 32.5,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 25,
  },
});

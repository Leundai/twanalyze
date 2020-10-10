import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { ProgressChartProps } from 'react-native-chart-kit/dist/ProgressChart';
import { Sentiment } from '../models/Tweet';
import { getSentimentColor } from '../util/getSentimentColor';
import {
  getSentimentMagnitudeText,
  getSentimentScoreText,
} from '../util/getSentimentText';
import { interpolateValue } from '../util/interpolateValue';
import SentimentChartScoreIcon from './SentimentChartScoreIcon';

interface Props {
  sentiment: Sentiment;
}

// Shared config for both score and magnitude charts
const CHART_OPACITY = 0.7;
const defaultChartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

// Shared props for both score and magnitude charts
const defaultChartProps: ProgressChartProps = {
  width: 100,
  height: 100,
  strokeWidth: 16,
  radius: 32,
  data: { data: [] },
  chartConfig: defaultChartConfig,
  hideLegend: true,
  accessor: '', // warning: no idea what this does
  backgroundColor: 'transparent',
  paddingLeft: '', // warning: no idea what this does
};

const SentimentChart = ({ sentiment }: Props) => {
  let confidence = sentiment.magnitude.positive;
  if (
    sentiment.magnitude.negative > sentiment.magnitude.neutral &&
    sentiment.magnitude.negative > sentiment.magnitude.positive
  ) {
    confidence = sentiment.magnitude.negative;
  } else if (
    sentiment.magnitude.neutral > sentiment.magnitude.negative &&
    sentiment.magnitude.neutral > sentiment.magnitude.positive
  ) {
    confidence = sentiment.magnitude.neutral;
  }

  const data = {
    data: [confidence],
  };

  // Chart display settings
  // Apathetic to Emotional -> Gray to Purple
  const r = interpolateValue(confidence, 200, 255);
  const g = interpolateValue(confidence, 200, 0);
  const b = interpolateValue(confidence, 200, 255);

  const opacity = confidence < 0.5 ? 0.25 : confidence > 0.6 ? 0.6 : confidence;

  const color = getSentimentColor(sentiment.score, opacity);

  const scoreChartConfig = {
    ...defaultChartConfig,
    // color: () => `rgba(${r}, ${g}, ${b}, ${CHART_OPACITY})`,
    // color: () => `rgba(${150}, ${150}, ${150}, ${opacity})`,
    color: () => getSentimentColor(sentiment.score, opacity),
  };

  // Capitalize score
  const scoreText =
    sentiment.score.charAt(0).toUpperCase() + sentiment.score.slice(1);

  return (
    <View style={styles.container}>
      <ProgressChart
        {...defaultChartProps}
        data={data}
        chartConfig={scoreChartConfig}
      />
      <SentimentChartScoreIcon sentiment={sentiment} opacity={opacity} />
      <Text style={styles.label}>{scoreText}</Text>
      {/* <Text style={styles.label}>{text}</Text> */}
      <Text style={styles.dataDisplay}>
        Positive: {Math.round(sentiment.magnitude.positive * 100)}%
      </Text>
      <Text style={styles.dataDisplay}>
        Negative: {Math.round(sentiment.magnitude.negative * 100)}%
      </Text>
      <Text style={styles.dataDisplay}>
        Neutral: {Math.round(sentiment.magnitude.neutral * 100)}%
      </Text>
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
});

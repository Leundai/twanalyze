import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { ProgressChartProps } from 'react-native-chart-kit/dist/ProgressChart';
import { Sentiment } from '../models/Tweet';
import {
  getSentimentMagnitudeText,
  getSentimentScoreText,
} from '../util/getSentimentText';
import { interpolateValue } from '../util/interpolateValue';

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

const SentimentChartScore = ({ sentiment }: Props) => {
  const data = {
    data: [sentiment.score],
  };

  // Chart display settings
  // Negative to Positive -> Red to Green
  const r =
    sentiment.score <= 0.5
      ? 255
      : interpolateValue((sentiment.score - 0.5) * 2, 200, 0);

  const g =
    sentiment.score >= 0.5
      ? 255
      : interpolateValue(sentiment.score * 2, 0, 255);

  const b = 100;

  const scoreChartConfig = {
    ...defaultChartConfig,
    color: () => `rgba(${r}, ${g}, ${b}, ${CHART_OPACITY})`,
  };

  const text = getSentimentScoreText(sentiment.score);
  console.log(text);

  return (
    <View>
      <ProgressChart
        {...defaultChartProps}
        data={data}
        chartConfig={scoreChartConfig}
      />
      <Text style={styles.label}>{text}</Text>
      <Text style={styles.dataDisplay}>Score: {sentiment.score}</Text>
    </View>
  );
};

const SentimentChartMagnitude = ({ sentiment }: Props) => {
  // The sentiment magnitude can only be displayed as a number from 0 to 1.
  // After obtaining real sentiment data, adjust this value so that the maximum
  // possible adjusted magnitude is 1.0.
  const MAGNITUDE_FACTOR = 0.2;
  const adjustedMagnitude = sentiment.magnitude * MAGNITUDE_FACTOR;

  const data = {
    data: [adjustedMagnitude],
  };

  // Chart display settings
  // Apathetic to Emotional -> Gray to Purple
  const r = interpolateValue(adjustedMagnitude, 200, 255);
  const g = interpolateValue(adjustedMagnitude, 200, 0);
  const b = interpolateValue(adjustedMagnitude, 200, 255);

  const scoreChartConfig = {
    ...defaultChartConfig,
    color: () => `rgba(${r}, ${g}, ${b}, ${CHART_OPACITY})`,
  };

  const text = getSentimentMagnitudeText(adjustedMagnitude);
  return (
    <View>
      <ProgressChart
        {...defaultChartProps}
        data={data}
        chartConfig={scoreChartConfig}
      />
      <Text style={styles.label}>{text}</Text>
      <Text style={styles.dataDisplay}>Magnitude: {sentiment.magnitude}</Text>
    </View>
  );
};

const SentimentChart = ({ sentiment }: Props) => {
  return (
    <View style={styles.container}>
      <SentimentChartScore sentiment={sentiment} />
      <SentimentChartMagnitude sentiment={sentiment} />
    </View>
  );
};

export default SentimentChart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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

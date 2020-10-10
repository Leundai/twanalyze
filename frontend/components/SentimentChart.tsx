import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { ProgressChartProps } from 'react-native-chart-kit/dist/ProgressChart';
import { Sentiment } from '../models/Tweet';
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

const SentimentChartScore = ({ sentiment }: Props) => {
  // const data = {
  //   data: [sentiment.score],
  // };

  // Chart display settings
  // Negative to Positive -> Red to Green
  // const r =
  //   sentiment.score <= 0.5
  //     ? 255
  //     : interpolateValue((sentiment.score - 0.5) * 2, 200, 0);

  // const g =
  //   sentiment.score >= 0.5
  //     ? 255
  //     : interpolateValue(sentiment.score * 2, 0, 255);

  // const b = 100;
  // const color = `rgba(${r}, ${g}, ${b}, ${CHART_OPACITY})`;

  // const scoreChartConfig = {
  //   ...defaultChartConfig,
  //   color: () => `rgba(${r}, ${g}, ${b}, ${CHART_OPACITY})`,
  // };

  // const text = getSentimentScoreText(sentiment.score);

  return (
    <View>
      {/* <ProgressChart
        {...defaultChartProps}
        data={data}
        chartConfig={scoreChartConfig}
      /> */}
      {/* <SentimentChartScoreIcon score={sentiment.score} /> */}
      <Text style={styles.label}>{sentiment.score}</Text>
      {/* <Text style={styles.dataDisplay}>Score: {sentiment.score}</Text> */}
    </View>
  );
};

const SentimentChartMagnitude = ({ sentiment }: Props) => {
  // The sentiment magnitude can only be displayed as a number from 0 to 1.
  // After obtaining real sentiment data, adjust this value so that the maximum
  // possible adjusted magnitude is 1.0.
  // const MAGNITUDE_FACTOR = 0.2;
  // const adjustedMagnitude = sentiment.confidence * MAGNITUDE_FACTOR;

  const data = {
    data: [sentiment.confidence],
  };

  // Chart display settings
  // Apathetic to Emotional -> Gray to Purple
  const r = interpolateValue(sentiment.confidence, 200, 255);
  const g = interpolateValue(sentiment.confidence, 200, 0);
  const b = interpolateValue(sentiment.confidence, 200, 255);

  const opacity =
    sentiment.confidence < 0.25
      ? 0.25
      : sentiment.confidence > 0.75
      ? 0.75
      : sentiment.confidence;

  const scoreChartConfig = {
    ...defaultChartConfig,
    // color: () => `rgba(${r}, ${g}, ${b}, ${CHART_OPACITY})`,
    color: () => `rgba(${150}, ${150}, ${150}, ${opacity})`,
  };

  const text = getSentimentMagnitudeText(sentiment.confidence);
  return (
    <View style={styles.containerTest}>
      <ProgressChart
        {...defaultChartProps}
        data={data}
        chartConfig={scoreChartConfig}
      />
      <SentimentChartScoreIcon sentiment={sentiment} opacity={opacity} />
      <Text style={styles.label}>{sentiment.score}</Text>
      {/* <Text style={styles.label}>{text}</Text> */}
      <Text style={styles.dataDisplay}>
        Confidence: {sentiment.confidence * 100}%
      </Text>
    </View>
  );
};

const SentimentChart = ({ sentiment }: Props) => {
  return (
    <View style={styles.container}>
      <SentimentChartMagnitude sentiment={sentiment} />
    </View>
  );
};

export default SentimentChart;

const styles = StyleSheet.create({
  containerTest: {
    position: 'relative',
  },
  iconTest: {
    position: 'absolute',
    top: 30.5,
    left: 32.5,
    fontSize: 36,
  },
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

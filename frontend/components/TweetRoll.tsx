import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tweet } from '../models/Tweet';
import TweetDisplay from './TweetDisplay';

interface Props {
  tweets: Tweet[];
}

const TweetRoll = ({ tweets }: Props) => {
  return (
    <View style={styles.container}>
      {tweets.map((tweet, index) => (
        <TweetDisplay tweet={tweet} key={index} />
      ))}
    </View>
  );
};

export default TweetRoll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

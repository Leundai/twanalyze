import React from 'react';
import { View, StyleSheet } from 'react-native';
import TweetDisplay from '../components/TweetDisplay';
import TweetRoll from '../components/TweetRoll';
import UserDisplay from '../components/UserDisplay';
import { getDummyUserWithTweets } from '../util/getDummyUserWithTweets';

interface Props {}

const Timeline = (props: Props) => {
  const user = getDummyUserWithTweets();

  return (
    <View style={styles.container}>
      <UserDisplay user={user} />
      <TweetRoll tweets={user.tweets} />
    </View>
  );
};

export default Timeline;

const styles = StyleSheet.create({
  container: {
    maxWidth: 600,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

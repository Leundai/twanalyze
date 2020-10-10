import { useAtom } from 'jotai';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Logo from '../components/Logo';
import TextInputHandle from '../components/TextInputHandle';
import TweetDisplay from '../components/TweetDisplay';
import TweetRoll from '../components/TweetRoll';
import UserDisplay from '../components/UserDisplay';
import { userAtom } from '../state/userAtom';
import { getDummyUserWithTweets } from '../util/getDummyUserWithTweets';

interface Props {}

const Timeline = (props: Props) => {
  const [user, setUser] = useAtom(userAtom);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInputHandle />
      </View>
      {user ? (
        <>
          <UserDisplay user={user} />
          <TweetRoll tweets={user.tweets} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
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
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});

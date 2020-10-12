import { useAtom } from 'jotai';
import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import ErrorMessage from '../components/ErrorMessage';
import Logo from '../components/Logo';
import TextInputHandle from '../components/TextInputHandle';
import TweetDisplay from '../components/TweetDisplay';
import TweetRoll from '../components/TweetRoll';
import UserDisplay from '../components/UserDisplay';
import { searchAtom } from '../state/searchAtom';
import { responseAtom } from '../state/responseAtom';
import { getDummyUserWithTweets } from '../util/getDummyUserWithTweets';

interface Props {}

const Timeline = (props: Props) => {
  const [response] = useAtom(responseAtom);
  const [searchInformation] = useAtom(searchAtom);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInputHandle />
      </View>
      {response?.result ? (
        <>
          <UserDisplay user={response.result} />
          <TweetRoll tweets={response.result.tweets} />
        </>
      ) : !searchInformation.isLoading ? (
        <ErrorMessage handle={searchInformation.handle} />
      ) : (
        <></>
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

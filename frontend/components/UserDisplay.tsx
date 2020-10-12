import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { User } from '../models/Tweet';
import { getSentimentFromMagnitude } from '../util/getSentimentFromMagnitude';
import SentimentChart from './SentimentChart';

interface Props {
  user: User;
}

const UserDisplay = ({ user }: Props) => {
  const sentiment = getSentimentFromMagnitude(user.average_sentiment);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <SentimentChart
          sentiment={sentiment}
          hideLegend
          customImageURI={user.profile_picture}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{user.username}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserDisplay;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  profile: {
    height: 48,
    width: 48,
    borderRadius: 35,
  },
  // profile: {
  //   height: 70,
  //   width: 70,
  //   borderRadius: 35,
  // },
  textContainer: {
    marginLeft: 10,
  },
  name: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  username: {
    color: '#bbbbbb',
  },
});

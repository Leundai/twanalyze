import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tweet } from '../models/Tweet';
import { getFormattedDate } from '../util/getFormattedDate';

interface Props {
  tweet: Tweet;
}

const TweetDisplay = ({ tweet }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.horizontalContainer}>
        <FontAwesome5 name='calendar' style={styles.dateIcon} />
        <Text style={styles.date}>
          {getFormattedDate(new Date(tweet.time_created))}
        </Text>
      </View>
      <Text style={styles.text}>{tweet.text}</Text>
      <View style={styles.horizontalContainer}>
        <FontAwesome5 name='heart' style={styles.dateIcon} />
        <Text style={styles.responseText}>{tweet.likes.toLocaleString()}</Text>
        <FontAwesome5 name='retweet' style={styles.dateIcon} />
        <Text style={styles.responseText}>
          {tweet.retweets.toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

export default TweetDisplay;

const styles = StyleSheet.create({
  container: {
    borderColor: '#35444E',
    borderTopWidth: 2,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  text: {
    color: '#eeeeee',
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    color: '#bbbbbb',
  },
  date: {
    color: '#bbbbbb',
    marginLeft: 5,
  },
  responseText: {
    color: '#bbbbbb',
    marginLeft: 5,
    marginRight: 10,
  },
});

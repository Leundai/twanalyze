import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Tweet } from '../models/Tweet';
import { getFormattedDate } from '../util/getFormattedDate';
import SentimentChart from './SentimentChart';

interface Props {
  tweet: Tweet;
}

const TweetDisplay = ({ tweet }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.tweetContentContainer}>
        <View style={styles.horizontalContainer}>
          <FontAwesome5 name='calendar' style={styles.dateIcon} />
          <Text style={styles.date}>
            {getFormattedDate(new Date(tweet.time_created))}
          </Text>
        </View>
        <Text style={styles.text}>{tweet.text}</Text>
        <View style={styles.horizontalContainer}>
          <FontAwesome5 name='heart' style={styles.dateIcon} />
          <Text style={styles.responseText}>
            {tweet.likes.toLocaleString()}
          </Text>
          <FontAwesome5 name='retweet' style={styles.dateIcon} />
          <Text style={styles.responseText}>
            {tweet.retweets.toLocaleString()}
          </Text>
        </View>
      </View>
      <SentimentChart sentiment={tweet.sentiment} />
    </View>
  );
};

export default TweetDisplay;

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    borderColor: '#35444E',
    borderTopWidth: 2,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: SCREEN_WIDTH > 600 ? 'row' : 'column',
  },
  tweetContentContainer: {
    flex: 1,
    marginRight: SCREEN_WIDTH > 600 ? 20 : 0,
    marginBottom: SCREEN_WIDTH > 600 ? 0 : 20,
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

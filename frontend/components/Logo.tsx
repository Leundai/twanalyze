import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  showSubtitle?: boolean;
  style?: object;
}

const Logo = ({ showSubtitle, style }: Props) => {
  return (
    <View style={[styles.textContainer, style]}>
      <View style={styles.titleContainer}>
        <FontAwesome5 name='twitter' color='#fff' style={styles.twitterIcon} />
        <Text style={styles.title}>twanalyze</Text>
      </View>
      {showSubtitle ? (
        <Text style={styles.subtitle}>
          Find out everything you didn't know about your timeline.
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 30,
    textAlign: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  twitterIcon: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },
  title: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '700',
    marginLeft: 15,
  },
  subtitle: {
    marginTop: 5,
    fontSize: 18,
    color: '#eee',
    textAlign: 'center',
  },
});

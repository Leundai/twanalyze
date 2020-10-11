import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface Props {
  handle: string;
}

const ErrorMessage = ({ handle }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unable to fetch tweets for @{handle}</Text>
      <Text style={styles.subtitle}>
        This is likely because this user is private.
      </Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    textAlign: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: '#dddddd',
    fontSize: 18,
    marginTop: 5,
  },
});

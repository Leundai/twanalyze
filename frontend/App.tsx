import { Provider } from 'jotai';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import Router from './routes/Router';

export default function App() {
  return (
    <View style={styles.container}>
      <Provider>
        <Router />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12202C',
    minH: '100vh',
  },
});

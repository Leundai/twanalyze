import { Provider } from 'jotai';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import Router from './routes/Router';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import useMonitorHandleForFetching from './hooks/useMonitorHandle';
import { StatusBar } from 'expo-status-bar';

const queryCache = new QueryCache();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Provider>
          <Router />
        </Provider>
      </ReactQueryCacheProvider>
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

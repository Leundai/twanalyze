import { Provider } from 'jotai';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import Router from './routes/Router';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { StatusBar } from 'expo-status-bar';

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      // Prevent auto-refetching to limit the amount of Azure calls
      refetchOnWindowFocus: false,
    },
  },
});

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
    minHeight: '100%',
  },
});

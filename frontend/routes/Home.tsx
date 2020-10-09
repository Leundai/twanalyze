import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import { routeAtom, Routes } from '../state/routeAtom';

export default function App() {
  const [route, setRoute] = useAtom(routeAtom);
  const [handle, setHandle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Call whatever needs to be called for authentication
  const handleSubmit = () => {
    console.log(handle);
    setIsLoading(true);

    // In the future, this will be set after a successful authentication
    setTimeout(() => {
      setIsLoading(false);
      setRoute(Routes.Timeline);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <FontAwesome5
            name='twitter'
            color='#fff'
            style={styles.twitterIcon}
          />
          <Text style={styles.title}>twanalyze</Text>
        </View>
        <Text style={styles.subtitle}>
          Find out everything you didn't know about your timeline.
        </Text>
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.inputContainer}>
          <FontAwesome5 name='at' style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            onChangeText={(text) => setHandle(text)}
            value={handle}
            onSubmitEditing={handleSubmit}
            editable={!isLoading}
          />
        </View>
        <TouchableOpacity style={styles.inputButton} onPress={handleSubmit}>
          {isLoading ? (
            <ActivityIndicator style={styles.inputSpinner} color='#fff' />
          ) : (
            <Text style={styles.inputButtonText}>Go →</Text>
          )}
        </TouchableOpacity>
      </View>

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12202C',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  },
  lowerContainer: {
    flexDirection: 'row',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingLeft: 12,
    paddingRight: 10,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  inputIcon: {
    color: '#222',
    fontSize: 14,
  },
  input: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
  },
  inputButton: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#00A3F9',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputSpinner: {
    paddingHorizontal: 8,
  },
});

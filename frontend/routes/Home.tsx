import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAtom } from 'jotai';
import { routeAtom, Routes } from '../state/routeAtom';
import TextInputHandle from '../components/TextInputHandle';
import { responseAtom } from '../state/responseAtom';
import Logo from '../components/Logo';

export default function App() {
  const [_, setRoute] = useAtom(routeAtom);
  const [response] = useAtom(responseAtom);

  useEffect(() => {
    if (response) {
      setRoute(Routes.Timeline);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Logo showSubtitle />
      <TextInputHandle />
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

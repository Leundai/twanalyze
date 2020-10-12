import { FontAwesome5 } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { searchAtom } from '../state/searchAtom';

interface Props {}

const TextInputHandle = (props: Props) => {
  const [searchInformation, setSearchInformation] = useAtom(searchAtom);
  const [handle, setHandle] = useState(searchInformation.handle);

  const onSubmit = async () => {
    setSearchInformation({
      ...searchInformation,
      handle,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <FontAwesome5 name='at' style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            onChangeText={(text) => setHandle(text)}
            value={handle}
            onSubmitEditing={onSubmit}
            editable={!searchInformation.isLoading}
          />
        </View>
        <TouchableOpacity style={styles.inputButton} onPress={onSubmit}>
          {searchInformation.isLoading ? (
            <ActivityIndicator style={styles.inputSpinner} color='#fff' />
          ) : (
            <Text style={styles.inputButtonText}>Go →</Text>
          )}
        </TouchableOpacity>
      </View>
      {searchInformation.error ? (
        <Text style={styles.error}>{searchInformation.error}</Text>
      ) : (
        <></>
      )}
    </>
  );
};

export default TextInputHandle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 0,
    paddingLeft: 12,
    paddingRight: 10,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  inputIcon: {
    color: '#222',
    fontSize: 14,
    marginVertical: 15,
  },
  input: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
    height: '100%',
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
  error: {
    color: '#F5505C',
    marginTop: 15,
  },
});

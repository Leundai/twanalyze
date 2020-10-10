import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

interface Props {
  onSubmitHandle: (handle: string) => void;
  isLoading: boolean;
}

const TextInputHandle = ({ onSubmitHandle, isLoading }: Props) => {
  const [handle, setHandle] = useState('');

  const onSubmit = () => onSubmitHandle(handle);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <FontAwesome5 name='at' style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          onChangeText={(text) => setHandle(text)}
          value={handle}
          onSubmitEditing={onSubmit}
          editable={!isLoading}
        />
      </View>
      <TouchableOpacity style={styles.inputButton} onPress={onSubmit}>
        {isLoading ? (
          <ActivityIndicator style={styles.inputSpinner} color='#fff' />
        ) : (
          <Text style={styles.inputButtonText}>Go →</Text>
        )}
      </TouchableOpacity>
    </View>
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
});

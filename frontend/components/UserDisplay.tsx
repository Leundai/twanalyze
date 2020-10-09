import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { User } from '../models/Tweet';

interface Props {
  user: User;
}

const UserDisplay = ({ user }: Props) => {
  console.log(user.profile_picture);

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profile_picture }} style={styles.profile} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
      </View>
    </View>
  );
};

export default UserDisplay;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  profile: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  textContainer: {
    marginLeft: 10,
  },
  name: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  username: {
    color: '#bbbbbb',
  },
});

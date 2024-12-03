import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen = ({ user, onLogout }) => {
  console.log('User in ProfileScreen:', user);

  
  if (!user || !user.email) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No user is logged in.</Text>
        <Button title="Log Out" onPress={onLogout} />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {user.email}!</Text>
      <Text style={styles.text}>Username: {user.username}</Text>
      <Button title="Log Out" onPress={onLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileScreen;

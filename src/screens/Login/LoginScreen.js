import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ImageBackground } from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from '../../firebaseConfig'; 

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    
    // Check if email and password fields are empty
    if (!email || !password) {
      setError('Please enter both username and password');
      return;
    }
  
    try {
      console.log('User:', email);
      console.log('Password:', password);
  
      const userRef = ref(database, `users/${email}`);
      const snapshot = await get(userRef);
  
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.password === password) {
          Alert.alert('Login Successful');
          setIsLoggedIn(true);
  
          // Pass username to Home screen after login
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home', params: { username: email } }],
          });
        } else {
          Alert.alert('Error', 'Incorrect password');
        }
      } else {
        Alert.alert('Error', 'User not found');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error(error.message);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to SignUp screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../src/LoginBg.jpg')} // Adjust the image path as needed
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Login</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="User Name"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
  },
  innerContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10, 
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#4CAF50', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import React, { useState, } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from './contexts/authContext';
import AuthNavigator from "./navigators/authNavigator";
import MainNavigator from "./navigators/mainNavigator";


export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(true); //set this to false to simulate logged out state
  return (
    <AuthContext.Provider value={setLoggedIn}>
      {isLoggedIn}?
        <MainNavigator/>
        :
        <AuthNavigator/>
    </AuthContext.Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

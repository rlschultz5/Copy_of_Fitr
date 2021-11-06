import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, Button } from 'react-native';
import ProfileList from './profileList';
import { AuthContext } from '../../contexts/authContext';
const DUMMY = [{
  username: "JDOE",
  password: "********",
  name: "JOHN DOE",
  email: "jdoe@wisc.edu",
  city: "Madison",
  state: "WI",
  zipcode: 53715,
  schoolYear: "Junior",
  activities: ["Basketball", "Hockey", "Football"],
  preferences: ["Basketball", "Moderate", "Friday"],
  isAdmin: false
}]

export default function ProfileScreen({navigation}) {

    const setLoggedIn = React.useContext(AuthContext);


  return (
    <View style={styles.container}>
      <Text style={{ left: "5%", fontSize: 30 }}> Profile Page</Text>
      <View style={styles.listContainer}>
        <Text style={styles.title}>John's Profile</Text>
      </View>   
      <ProfileList data={DUMMY} /> 
      <Pressable onPress={()=>navigation.navigate("changePassword")}>
        <Text style={{marginBottom:20}}>
          Change Password
        </Text>
      </Pressable>  
      <Pressable onPress={()=>navigation.navigate("Login")}>
        <Text style={{marginBottom:20}}>
          Delete Account
        </Text>
      </Pressable> 
      <Pressable onPress={()=>setLoggedIn(false)}>
        <Text style={{marginBottom:20}}>
          Logout
        </Text>
      </Pressable> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:50,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  listContainer: {
    padding: 20,
  }
});

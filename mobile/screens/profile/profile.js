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
      <Pressable style={{backgroundColor:"#004275", justifyContent:"center",height:50, margin:5, marginTop: 15, borderRadius:10}}
      onPress={()=>navigation.navigate("changePassword")}>
        <Text style={{color:"white", alignSelf:"center", fontWeight:"500", fontSize:15}}>
          Change Password
        </Text>
      </Pressable>  
      <Pressable style={{backgroundColor:"#004275", justifyContent:"center",height:50, margin:5, marginTop: 15, borderRadius:10}}
        onPress={()=>setLoggedIn(false)}>
        <Text style={{color:"white", alignSelf:"center", fontWeight:"500", fontSize:15}}>
          Delete Account
        </Text>
      </Pressable> 
      <Pressable style={{backgroundColor:"#004275", justifyContent:"center",height:50, margin:5, marginTop: 15, borderRadius:10}}
      onPress={()=>setLoggedIn(false)}>
        <Text style={{color:"white", alignSelf:"center", fontWeight:"500", fontSize:15}}>
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
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  listContainer: {
    padding: 20,
  }
});

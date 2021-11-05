import React, { useState } from 'react';
import { View, KeyboardAvoidingView, SafeAreaView, ScrollView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
import { StyleSheet, Text, View, Pressable, Image, Button } from 'react-native';



  // const username = "JDOE"; //get functions needed
  // const password = "password";
  // const name = "JOHN DOE";
  // const email = "jdoe@wisc.edu";
  // const city = "Madison";
  // const state = "WI";
  // const zipcode = 53715;
  // const schoolYear = "Junior";
  // var activities = ["Basketball", "Hockey", "Football"];
  // var preferences = ["Basketball", "Moderate", "Friday"];
  // const isAdmin = false;

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

export default function ProfileScreen() {

    return (
      <View style={styles.container}>
        <Text style={{ left: "5%", fontSize: 30 }}> Profile Page</Text>
        <View style={styles.listContainer}>
          <Text style={styles.title}>John's Profile</Text>
        </View>        
        <WorkoutList data={DUMMY} />
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
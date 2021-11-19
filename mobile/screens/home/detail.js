import React, { useEffect, useState } from 'react';
import { View, Pressable, KeyboardAvoidingView, Image, ScrollView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import API from "../../api.js"
import { Ionicons } from '@expo/vector-icons';
import dateFormat, { masks } from "dateformat";


const Detail = ({ route, navigation }) => {

  const [user, setUser] = useState();
  const [disabled, setDisabled] = useState();
  const [submitted, setSubmitted] = useState(-1);
  const date = dateFormat (new Date(route.params.workout.date), "dddd, mmmm dS, h:MM TT");


  useEffect(() => {

    async function getUserData() {
      
      try {
        let userData = JSON.parse(await AsyncStorage.getItem('user'));
        setUser(userData);
        if(route.params.workout.membersAttending.includes(userData._id)) {
          setSubmitted(true);
          setDisabled(true);
        }

      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
  }, [])

  const joinWorkout = async () => {
    console.log(route.params.workout)
    setDisabled(true);
    try {
      let res = await axios.post(`http://${API}:8080/api/user/joinWorkout`, {
        user_id: user._id,
        workout_id: route.params.workout._id,

      })        
      setSubmitted(true);
      route.params.workout.membersAttending.push(user._id);
      
    } catch (e){
      console.log(e);
      setDisabled(false);
    }
    
  }

  return (
    <View style={{ flex: 1, paddingTop: 50, backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 23 }}>
        <Text style={styles.header}>Detail</Text>
        <View style={{ borderBottomWidth: 1, borderColor: "#d9d9d9", marginBottom: 20 }}>
          <Text style={{ fontWeight: "500", fontSize: 24, marginBottom: 15, color: "#e6006b" }}>{route.params.workout.title}</Text>
          <Text style={{ fontWeight: "300", fontSize: 16, marginBottom: 12, color: "#3d3d3d" }}><Ionicons size={20} name="time-outline" /> {date}</Text>
          <Text style={{ fontWeight: "300", fontSize: 16, marginBottom: 20, color: "#3d3d3d" }}> {`Location: ${route.params.workout.location}`}</Text>

          
          <Text style={{ fontWeight: "400", fontSize: 18, marginBottom: 40 }}>{`${route.params.workout.description}`}</Text>
        </View>
        <Text style={{ fontWeight: "300", fontSize: 18, marginBottom: 20, color: "#3d3d3d" }}>{`Sports: ${route.params.workout.activity}`}</Text>
        <Text style={{ fontWeight: "300", fontSize: 18, marginBottom: 20, color: "#3d3d3d" }}>{`Experience Level: ${route.params.workout.experienceLevel}`}</Text>
        <Text style={{ fontWeight: "300", fontSize: 18, marginBottom: 20, color: "#3d3d3d" }}>{`Capacity: ${route.params.workout.filled}/${route.params.workout.capacity}`}</Text>
      </ScrollView >
      <Pressable onPress={() => joinWorkout()}>
        <View style={{ position: "relative", bottom: 20, height: 40, width: "80%", left: "10%", backgroundColor: (submitted===true || disabled===true)?"grey":"#004275", justifyContent: 'space-between', alignItems: "center", borderRadius: 20 }}>
          <Text style={{ marginTop: 7, fontSize: 20, fontWeight: "600", color: "white" }}>
            {(submitted===true)?"Joined":"Join Workout"}
          </Text>
        </View>
      </Pressable>

    </View>
  );
}
/*<View style={{ position: 'absolute', height: 40, width: "80%", left: "10%", bottom: 25, backgroundColor: "#FF3008", justifyContent: 'space-between', alignItems: "center", borderRadius: 20 }}>
          <Text style={{ marginTop: 7, fontSize: 20, fontWeight: "600", color: "white" }}>
            Submit Application
          </Text>
        </View>*/
export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    fontWeight: "500",
    marginBottom: 36
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 50
  },
  btnContainer: {
    marginTop: 12
  }
});




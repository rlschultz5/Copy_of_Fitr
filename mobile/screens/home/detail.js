import React, {useEffect, useState} from 'react';
import { View, KeyboardAvoidingView, Image, ScrollView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"

const Detail = ({ route, navigation }) => {

  const [user, setUser] = useState();
  const [disabled, setDisabled] = useState();
  const [submitted, setSubmitted] = useState();
  

  useEffect(() => {

    async function getUserData() {
      console.log(route.params.management)
      try {
        let userData = JSON.parse(await AsyncStorage.getItem('user'));
        setUser(userData);
      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
  }, [])

  const onSubmit = () => {
    setDisabled(true);
    let res = axios.post(`http://${API}:8080/api/application/apply`, {


    })

    setDisabled(false);
    setIsSubmitted(true);
  }

  return (
    <View style={{ flex: 1, paddingTop: 50, backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 23 }}>
        <Text style={styles.header}>Detail</Text>
        <View style={{ borderBottomWidth:1, borderColor: "#d9d9d9", marginBottom:15}}>
          <Text style={{ fontWeight: "500", fontSize: 24, marginBottom: 15, color: "#e6006b" }}>{route.params.workout.title}</Text>
          <Text style={{ fontWeight: "400", fontSize: 18, marginBottom: 15 }}>{`${route.params.workout.description}`}</Text>
        </View>
        <Text style={{ fontWeight: "300", fontSize: 18, marginBottom: 15, color:"#3d3d3d" }}>{`Sports: ${route.params.workout.activity}`}</Text>
        <Text style={{ fontWeight: "300", fontSize: 18, marginBottom: 15, color:"#3d3d3d" }}>{`Experience Level: ${route.params.workout.experienceLevel}`}</Text>
        <Text style={{ fontWeight: "300", fontSize: 18, marginBottom: 15, color:"#3d3d3d"}}>{`Capacity: ${route.params.workout.filled}/${route.params.workout.capacity}`}</Text>
      </ScrollView >
      <TouchableWithoutFeedback onPress={() => joinWorkout()}>
          <View style={{ position: "relative", bottom:20, height: 40, width: "80%", left: "10%", backgroundColor: "#004275", justifyContent: 'space-between', alignItems: "center", borderRadius: 15 }}>
            <Text style={{ marginTop: 7, fontSize: 20, fontWeight: "600", color: "white" }}>
              Join Workout
            </Text>
          </View>
      </TouchableWithoutFeedback>

    </View>
  );
}
/*<View style={{ position: 'absolute', height: 40, width: "80%", left: "10%", bottom: 25, backgroundColor: "#FF3008", justifyContent: 'space-between', alignItems: "center", borderRadius: 15 }}>
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




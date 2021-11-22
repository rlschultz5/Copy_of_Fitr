import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import WorkoutList from "../home/workoutList.js";
import { StyleSheet, Text, View, Pressable, Image, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import API from "../../api.js"
import axios from "axios";
import AnimatedLoader from "react-native-animated-loader";
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';




const DUMMY = [{
  title: "4v4 Basketball at the Nick!",
  level: "All",
  sports: "Basketball",
  location: "Nick court 3",
  capacity: 8,
  filled: 3
}, {
  title: "Casual Jog around Campus",
  level: "All",
  sports: "Running",
  location: "College Library",
  capacity: 12,
  filled: 3
}]

export default function AttendingWorkouts({ navigation }) {

  const [workouts, setWorkouts] = useState({});
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const getWorkouts = async () => {
      try{
        let userData = JSON.parse(await AsyncStorage.getItem("user"));

      const res = await axios.post(`http://${API}:8080/api/user/getAttendingWorkouts`, {
        user_id: userData._id
      });
      setWorkouts(res.data.data);
      setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    }
    getWorkouts();
  },[])


  return (
    <View style={styles.container}>
       
      <View style={styles.grid}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={{ fontSize: 30, fontWeight: "700" }}> Fitr </Text>
          <Image resizeMode="contain" style={{ width: 30, height: 30, top: "1%", left: 10 }} source={require("../../assets/logo.png")} />

        </View>

      </View>

    
      <View style={styles.listContainer}>
        <Text style={styles.title}>Attending Workouts: </Text>

      </View>



      {(loading)?
  (

    <LottieView style={{width:60, alignSelf:"center", top:"10%"}} speed={2} source={require("../loader.json")} autoPlay={true} loop={true}></LottieView>
  ):<WorkoutList data={workouts} navigation={navigation}/>}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  },
  grid: {
    padding: "5%",
    paddingBottom: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#d9d9d9",
    borderBottomWidth: 1
  },
  filterBtnText: {
    alignSelf: "center",
  },
  filterBtn: {
    alignSelf: "center",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 15,
    height: 30,
    width: "60%",
    justifyContent: "center",
    marginBottom: 20,
  },
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    margin:15,
    fontWeight: "600",
  },
  listContainer: {
    padding: 10,
  }
});

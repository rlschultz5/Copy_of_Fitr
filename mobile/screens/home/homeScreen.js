import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import WorkoutList from './workoutList';
import { StyleSheet, Text, View, Pressable, Image, Button } from 'react-native';
import Filter from './filter';
import { Ionicons } from '@expo/vector-icons';
import API from "../../api.js"
import axios from "axios";
import AnimatedLoader from "react-native-animated-loader";
import LottieView from 'lottie-react-native';



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

export default function HomeScreen({ navigation }) {

  const [workouts, setWorkouts] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({});
  const [loading,setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useEffect(()=>{
    const getWorkouts = async () => {
      setLoading(true);
      let extractedFilter = {};
      for(let key in filter) {
        if(filter[key] instanceof Date) extractedFilter[key] = filter[key]
        else if(filter[key] !== 'object' && filter[key] === true)  extractedFilter[key] = false;
        else if( filter[key] && filter[key].value != -1 && filter[key] != "") {
          extractedFilter[key] = filter[key].label;
        }
      }
      
      console.log(extractedFilter);
      try{
      const res = await axios.post(`http://${API}:8080/api/workout/getWorkouts`, {
        fields:extractedFilter
      });
      setWorkouts(res.data.data);
      setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    }
    getWorkouts();
  },[filter, refresh])


  return (
    <View style={styles.container}>
       
      <View style={styles.grid}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={{ fontSize: 30, fontWeight: "700" }}> Fitr </Text>
          <Image resizeMode="contain" style={{ width: 30, height: 30, top: "1%", left: 10 }} source={require("../../assets/logo.png")} />

        </View>

        <Pressable onPress={() => navigation.navigate("Profile")}>
          <Ionicons size={30} name="person-circle-outline" />
        </Pressable>

      </View>

      <Pressable style={{backgroundColor:"#004275", justifyContent:"center",height:50, margin:15, marginTop: 25, borderRadius:10}}
      onPress={()=>{navigation.navigate("Create Workout")}}>
        <Text style={{color:"white", alignSelf:"center", fontWeight:"500", fontSize:15}}>
          Create Workout
        </Text>

      </Pressable>
      <View style={styles.listContainer}>
        <Text style={styles.title}>Workouts Available: </Text>
        <Pressable onPress={()=>setRefresh(!refresh)}>
        <Ionicons style={{flex:1}} name="refresh-outline" size={20}/>
        </Pressable>

      </View>

      <Pressable onPress={() => setShowFilter(true)}>
        <View style={styles.filterBtn}>
          <Text style={styles.filterBtnText}>
            {(filter.activity)?filter.activity.label:"Set Filter"}
          </Text>
        </View>
      </Pressable>

      <Filter visible={showFilter} setVisible={setShowFilter} filter={filter} setFilter={setFilter} />

      {(loading)?
  (

    <LottieView style={{width:60, alignSelf:"center", top:"10%"}} speed={2} source={require("./loader.json")} autoPlay={true} loop={true}></LottieView>
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
    fontWeight: "600",
    flex: 10
  },
  listContainer: {
    padding: 20,
    flexDirection:"row",
  }
});

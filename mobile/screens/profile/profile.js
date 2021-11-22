import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Image, Button } from "react-native";
import { AuthContext } from "../../contexts/authContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import LottieView from 'lottie-react-native';

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pullUserData = async () => {
      let userData = JSON.parse(await AsyncStorage.getItem("user"));
      setProfile(userData);
      console.log(userData);
      setLoading(false);
    };
    pullUserData();
  }, []);

  const setLoggedIn = React.useContext(AuthContext);

  return loading ? (<LottieView style={{ width: 60, alignSelf: "center", top: "10%" }} speed={2} source={require("../loader.json")} autoPlay={true} loop={true}></LottieView>
  ) : (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: "#e6006b", }}> Profile</Text>

      <View style={{ borderWidth: 1, borderColor: "black", borderRadius: 20, padding: 15, marginTop:30, marginBottom:30 }}>
        <Text style={{ color: "black", fontWeight: "400", fontSize: 18 }}>
          Username: {profile.username}</Text>
        <Text style={{ color: "black", fontWeight: "400", fontSize: 18, marginTop: 15 }}>
          Name: {profile.name}</Text>
        <Text style={{ color: "black", fontWeight: "400", fontSize: 18, marginTop: 15 }}>
          Email: {profile.email}</Text>
        <Text style={{ color: "black", fontWeight: "400", fontSize: 18, marginTop: 15 }}>
          Year: {profile.schoolYear}</Text>
      </View>
      <Pressable onPress={() => navigation.navigate("attendingWorkouts")}>
        <Text style={styles.list}>Attending Workouts</Text>
      </Pressable>
      <View style={{ borderColor: "#6e6e6e", borderBottomWidth:1}}/>
      <Pressable onPress={() => navigation.navigate("myWorkouts")}>
        <Text style={styles.list}>My Workouts</Text>
      </Pressable>
      <View style={{ borderColor: "#6e6e6e", borderBottomWidth:1}}/>

      <Pressable onPress={() => navigation.navigate("changePassword")}>
        <Text style={styles.list}>Change Password</Text>
      </Pressable>
      <View style={{ borderColor: "#6e6e6e", borderBottomWidth:1}}/>

      <Pressable onPress={() => setLoggedIn(false)}>
        <Text style={styles.list}>Logout</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop:70,
    flex: 1,
    backgroundColor: 'white',
  },
  list:{
    fontSize: 18, marginBottom: 10, left:5, borderBottomWidth:1, marginTop:10
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  listContainer: {
    padding: 20,
  },
});
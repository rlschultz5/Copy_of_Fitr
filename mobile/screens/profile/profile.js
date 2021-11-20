import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Image, Button } from "react-native";
import { AuthContext } from "../../contexts/authContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const pullUserData = async () => {
      let userData = JSON.parse(await AsyncStorage.getItem("user"));
      setProfile(userData);
    };
    pullUserData();
  });

  const setLoggedIn = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={{ left: "5%", fontSize: 30 }}> Profile Page</Text>
      <View style={styles.listContainer}>
        <Text style={styles.title}>{profile.name}'s Profile</Text>
      </View>
        <Text style={{color:"white", fontWeight:"500", fontSize:25, marginTop: 15}}>
          {profile.username}</Text>
        <Text style={{color:"white", fontWeight:"500", fontSize:25, marginTop: 15}}>
          {profile.name}</Text>
        <Text style={{color:"white", fontWeight:"500", fontSize:25, marginTop: 15}}>
          {profile.email}</Text>
        <Text style={{color:"white", fontWeight:"500", fontSize:25, marginTop: 15}}>
          {profile.schoolYear}</Text>
      <Pressable onPress={() => navigation.navigate("changePassword")}>
        <Text style={{ marginBottom: 20 }}>Change Password</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={{ marginBottom: 20 }}>Delete Account</Text>
      </Pressable>
      <Pressable onPress={() => setLoggedIn(false)}>
        <Text style={{ marginBottom: 20 }}>Logout</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  listContainer: {
    padding: 20,
  },
});
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dateFormat, { masks } from "dateformat";



export default function WorkoutCell({ navigation, data }) {
  const renderDate = () => {
    if (data.date) {
      const date = dateFormat(new Date(data.date), "dddd, mmmm dS, h:MM TT");
      return (<Text style={{ fontWeight: "300", fontSize: 14, marginBottom: 12, color: "#3d3d3d" }}><Ionicons size={14} name="time-outline" /> {date}</Text>
      )
    }

  }

  return (
    <View style={cellStyle.container}>
      <Pressable style={{ width: "100%" }} onPress={() => { navigation.navigate("Detail", { workout: data }) }}>

        <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 5 }}>{data.title}</Text>
        {renderDate()}
        <Text style={cellStyle.highlight}>{data.activity}</Text>
        <Text>{`Experience Level: ${data.experienceLevel}`}</Text>
        <Text>{`Status: ${(data.isFull)?"Full":"Available"}`}</Text>
      </Pressable>

    </View>
  );
}

const cellStyle = StyleSheet.create({
  container: {
    width: "85%",
    padding: 15,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: "flex-start",
    justifyContent: 'center',
    marginBottom: 15,
  },
  title: {

  }
  ,
  highlight: {
    fontWeight: "600",
    color: "#e6006b"
  }
});

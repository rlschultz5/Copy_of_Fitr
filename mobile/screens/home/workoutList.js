import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WorkoutCell from "./workoutCell";

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
        capacity: -1,
        filled: 3
    }]

export default function WorkoutList() {
  return (
    <View style={styles.container}>
      {DUMMY.map((workout, index)=>{
          return <WorkoutCell data={workout}/>
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

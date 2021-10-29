import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WorkoutCell from "./workoutCell";


export default function WorkoutList({data}) {
  return (
    <View style={styles.container}>
      {data.map((workout, index)=>{
          return <WorkoutCell key={index} data={workout}/>
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import WorkoutCell from "./workoutCell";


export default function WorkoutList({data, navigation}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((workout, index)=>{
          if(workout.title) return <WorkoutCell navigation={navigation} key={index} data={workout}/>
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import WorkoutList from './workoutList';
import { StyleSheet, Text, View, Pressable, Image, Button } from 'react-native';
import Filter from './filter';

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

export default function HomeScreen() {

  const [showFilter, setFilter] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={{ top: "10%", left: "5%", fontSize: 30 }}> Home </Text>
      <View style={styles.listContainer}>
        <Text style={styles.title}>Workouts Available</Text>

      </View>

      <Filter visible={showFilter} setVisible={setFilter} />
      <Pressable onPress={() => setFilter(true)}>
        <Text>
          Filter
        </Text>
      </Pressable>
      <WorkoutList data={DUMMY} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  listContainer: {
    padding: 20,
  }
});

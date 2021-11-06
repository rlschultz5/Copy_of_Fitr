import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import WorkoutList from './workoutList';
import { StyleSheet, Text, View, Pressable, Image, Button } from 'react-native';
import Filter from './filter';
import { Ionicons } from '@expo/vector-icons';


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

export default function HomeScreen({navigation}) {

  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState()

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <Text style={{ left: "5%", fontSize: 30, flex: 1 }}> Home </Text>
        <Pressable onPress={()=>navigation.navigate("Profile")}>
          <Ionicons size={30} name="person-circle-outline" />
        </Pressable>
        
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.title}>Workouts Available</Text>

      </View>

      <Pressable onPress={() => setShowFilter(true)}>
        <View style={styles.filterBtn}>
          <Text style={styles.filterBtnText}>
            {(filter != undefined) ? filter.sports : "Set Filter"}
          </Text>
        </View>
      </Pressable>

      <Filter visible={showFilter} setVisible={setShowFilter} />

      <WorkoutList data={DUMMY} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    padding: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
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
    paddingTop: 50,
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

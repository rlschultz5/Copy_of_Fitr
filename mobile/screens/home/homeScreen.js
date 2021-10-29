import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import WorkoutList from './workoutList';
import { StyleSheet, Text, View, Pressable} from 'react-native';
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
      <Text>Home</Text>
      <Filter visible={showFilter} setVisible={setFilter}/>
      <Pressable onPress={()=>setFilter(true)}>
          <Text>
              Filter
          </Text>
        </Pressable>
        <WorkoutList data={DUMMY}/>
      <StatusBar style="auto" />
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

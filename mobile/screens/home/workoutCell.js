import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function WorkoutCell({data}) {
  return (
    <View style={cellStyle.container}>
      <Text>{data.title}</Text>
      <Text>{data.sports}</Text>
      <Text>{`${data.filled}/${data.capacity}`}</Text>
    </View>
  );
}

const cellStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
      
  }
});

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfileCell from './profileCell';


export default function ProfileList({data}) {
  return (
    <View style={styles.container}>
      {data.map((info, metric)=>{
          return <ProfileCell key={metric} data={info}/>
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

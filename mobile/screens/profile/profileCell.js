import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileCell({data}) {
  return (
    <View style={cellStyle.container}>
      <Text style={{color:"#064884", alignSelf:"center", fontWeight:"500", fontSize:15}}>
        {data.username}</Text>
      <Text>{data.password}</Text>
      <Text>{data.name}</Text>
      <Text>{data.email}</Text>
      <Text>{data.city}</Text>
      <Text>{data.state}</Text>
      <Text>{data.zipcode}</Text>
      <Text>{data.schoolYear}</Text>
      <Text>{data.activities}</Text>
      <Text>{data.preferences}</Text>
      <Text>{data.isAdmin}</Text>
    </View>
  );
}

const cellStyle = StyleSheet.create({
  container: {
    width:"80%",
    padding:15,
    borderColor:"grey",
    borderWidth:1,
    borderRadius:15,
    backgroundColor: 'white',
    alignItems: "flex-start",
    justifyContent: 'center',
    marginBottom:15,
  },
  title: {
      
  }
});

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';

export default function WorkoutCell({navigation, data}) {
  return (
    <View style={cellStyle.container}>
          <Pressable style={{width:"100%"}} onPress={()=>{navigation.navigate("Detail", {workout: data})}}>

      <Text style={{fontWeight:"600", fontSize:16, marginBottom:15}}>{data.title}</Text>
      <Text>{data.sports}</Text>
      <Text>{`Experience Level: ${data.level}`}</Text>
      <Text>{`${data.filled}/${data.capacity}`}</Text>
      </Pressable>

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
    backgroundColor: '#fff',
    alignItems: "flex-start",
    justifyContent: 'center',
    marginBottom:15,
  },
  title: {
      
  }
});

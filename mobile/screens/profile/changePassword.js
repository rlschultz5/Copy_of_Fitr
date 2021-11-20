import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, Button, TextInput } from 'react-native';
import ProfileList from './profileList';


export default function changePassword({navigation}) {
  const [password, setPassword] = useState();

  return (
    <View style={styles.container}>
      <Text style={{ alignSelf:"center", fontSize: 30, marginBottom:50}}> Change Password</Text>
      <TextInput onChangeText={setPassword} value={password} placeholderTextColor="grey" placeholder="Enter new password" style={styles.textInput} style={{fontSize: 20, margin: 10}} />
      <Pressable style={{backgroundColor:"#004275", justifyContent:"center", height:50, margin:5, marginTop: 20, borderRadius:10}}
      onPress={()=>navigation.navigate("MainProfile")}>
        <Text style={{color:"white", alignSelf:"center", fontWeight:"500", fontSize:15}}>
          Submit
        </Text>
      </Pressable> 
      <Pressable style={{backgroundColor:"#004275", justifyContent:"center", height:50, margin:5, marginTop: 20, borderRadius:10}}
      onPress={()=>navigation.navigate("MainProfile")}>
        <Text style={{color:"white", alignSelf:"center", fontWeight:"500", fontSize:15}}>
          Cancel
        </Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:50,
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

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, Button, TextInput } from 'react-native';
import ProfileList from './profileList';


export default function changePassword({navigation}) {
  const [password, setPassword] = useState();

  return (
    <View style={styles.container}>
      <Text style={{ left: "5%", fontSize: 30, marginBottom:50}}> Change Password</Text>
      <Text style={{ marginBottom:20 }}>Enter new password below</Text>
      <TextInput onChangeText={setPassword} value={password} placeholderTextColor="#ffc3b8" placeholder="Password" style={styles.textInput} />
      <Pressable onPress={()=>navigation.navigate("MainProfile")}>
        <Text style={{ marginTop:20 }}>
          Submit
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

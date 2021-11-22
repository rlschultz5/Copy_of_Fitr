import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import axios from "axios";
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
import API from "../../api";
import { AuthContext } from '../../contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const authScreen = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState("NA");
  const [isError, setError] = useState(false);

  const setLoggedIn = React.useContext(AuthContext);


  const onSubmit = async () => {
    setIsLoading(true);
    try {
      
      const res = await axios.post(`http://${API}:8080/api/signin`, { username: username, password: password });
      setIsLoading(false);

      if (res.status != 200) {
        setAuthStatus("denied");
        setError(true);
        console.log("denied");
        return;
      }

      try {
        console.log(res.data.data);
        await AsyncStorage.removeItem('user');
        await AsyncStorage.setItem('user', JSON.stringify(res.data.data))
      } catch (e) {
        // saving error
      }
      setLoggedIn(true);

    } catch (e) {
      console.log(e.message);
      setError(true);
      setIsLoading(false);
      setAuthStatus("denied");
      return;
    }
  }

  // Change Submit button to {onSubmit}
  // <Button color="white" title="Submit" disabled={isLoading} onPress={onSubmit} />

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Fitr.</Text>
          <View>
            <TextInput placeholderTextColor="grey" style ={styles.textInput} onChangeText={setUsername} value={username} placeholder="Username" style={styles.textInput} />
            <TextInput placeholderTextColor="grey" secureTextEntry={true} onChangeText={setPassword} value={password} placeholder="Password" style={styles.textInput} />
          </View>
          {(isError)?(<Text style={{color:"blue"}}>* Login Failed. The credentials do not match.</Text>):<Text/>}
          <View style={styles.btnContainer}>
            <Button color="black" title="Submit" disabled={isLoading} onPress={() => onSubmit()} />
            <Button color="black" title="Forgot your password?" onPress={() => navigation.navigate('Forgot Password')} />
            <Button color="black" title="Don't have an account?" onPress={() => navigation.navigate('Signup')} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}



export default authScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
    marginTop:"50%"
  },
  header: {
    fontSize: 36,
    fontWeight: "600",
    color: "black",
    alignSelf:"center",
    fontSize:60,
    color:"#e6006b"
  },
  textInput: {
    fontSize: 16,
    padding: 6,
    height: 40,
    color: "black",
    borderBottomColor: "#3f3f3f",
    paddingLeft: 15,
    borderBottomWidth: 1,
    width:"95%",
    alignSelf:"center",
    borderRadius:10,
    marginBottom: 20
  },
  btnContainer: {
    marginTop: 12
  },
  picker: { // new
    width: 325,
    height: 45,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 15,
    color: 'white',
    marginBottom: 20,
    paddingLeft: 10
  }
});


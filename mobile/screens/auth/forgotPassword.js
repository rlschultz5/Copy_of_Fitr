import React, { useState } from 'react';
import axios from "axios";
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../../api";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState("NA");
  const [isError, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  const goHome = () => {
    navigation.navigate("Login");
  }
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      let userData = JSON.parse(await AsyncStorage.getItem('user'));
      const res = await axios.post(`http://${API}:8080/api/forgotPassword`, { username: userData.username });
      setIsLoading(false);

      if (res.status != 200) {
        setAuthStatus("denied");
        setError(true);
        console.log("denied");
        return;
      }
      setSubmitted(true);
      // navigation.navigate("AuthNavigator", { screen: "Login" });

    } catch (e) {
      console.log(e.message);
      setError(true);
      setIsLoading(false);
      setAuthStatus("denied");
      return;
    }
  }

  // Change Submit button to {onSubmit}

  return (submitted) ?
  (
    <TouchableWithoutFeedback onPress={goHome}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
        <Text style={{ position: "absolute", top: "45%", fontSize: 25, fontWeight: "500", color: "#FF3008" }}>
          Your new temporary password has been emailed to you!
        </Text>
        <Text style={{ marginTop: 50, color: "gray" }}>Click Anywhere to Log in!</Text>
      </View>
    </TouchableWithoutFeedback>
  )
  : (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Fitr</Text>
          <View>
            <TextInput placeholderTextColor="grey" secureTextEntry={false} onChangeText={setEmail} value={email} placeholder="Email" style={styles.textInput} />
            <Button color="white" title="Send reset password email" disabled={isLoading} onPress={onSubmit} />
          </View>
          {(isError)?(<Text style={{color:"blue"}}>* Email not listed. Try again or make an account today!</Text>):<Text/>}

          <View style={styles.btnContainer}>
            <Button color="black" title="Back to login screen" onPress={() => navigation.navigate('Login')} />
            <Button color="black" title="Get Registered!" onPress={() => navigation.navigate('Signup')} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default ForgotPassword;

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


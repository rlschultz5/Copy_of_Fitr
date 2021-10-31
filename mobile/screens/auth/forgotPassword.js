import React, { useState } from 'react';
// import axios from "axios";
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import API from "../../api";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState("NA");
  const [isError, setError] = useState(false);


  // const onSubmit = async () => {
  //   setIsLoading(true);
  //   try {
      
  //     const res = await axios.post(`http://${API}:8080/api/forgotPassword`, { email: email });
  //     setIsLoading(false);

  //     if (res.status != 200) {
  //       setAuthStatus("denied");
  //       setError(true);
  //       console.log("denied");
  //       return;
  //     }

  //     try {
  //       await AsyncStorage.setItem('user', JSON.stringify(res.data))
  //     } catch (e) {
  //       // saving error
  //       // TODO: CORRECT??
  //     }

  //     navigation.navigate("AuthNavigator", { screen: "Login" });

  //   } catch (e) {
  //     console.log(e.message);
  //     setError(true);
  //     setIsLoading(false);
  //     setAuthStatus("denied");
  //     return;
  //   }
  // }

  // Change Submit button to {onSubmit}

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Fitr</Text>
          <View>
            <TextInput placeholderTextColor="#ffc3b8" secureTextEntry={true} onChangeText={setEmail} value={email} placeholder="Email" style={styles.textInput} />
            <Button color="white" title="Send reset password email" disabled={isLoading} onPress={null} />
          </View>
          {(isError)?(<Text style={{color:"blue"}}>* Email not listed. Try again or make an account today!</Text>):<Text/>}

          <View style={styles.btnContainer}>
            <Button color="white" title="Back to login screen" onPress={() => navigation.navigate('Login')} />
            <Button color="white" title="Get Registered!" onPress={() => navigation.navigate('Signup')} />
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
    backgroundColor: "#344955"
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    fontWeight: "300",
    marginBottom: 48,
    color:"white",
  },
  textInput: {
    height: 40,
    color: "white",
    borderColor: "white",
    borderBottomWidth: 1,
    marginBottom: 50
  },
  btnContainer: {
    marginTop: 12
  }
});


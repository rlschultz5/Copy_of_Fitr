import React, { useState } from 'react';
import { View, KeyboardAvoidingView, SafeAreaView, ScrollView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
// import { Checkbox } from 'react-native-paper';
import axios from "axios";
import API from "../../api";
import { Picker } from 'react-native-woodpicker'


const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zipCode, setZipCode] = useState();
  const [schoolYear, setSchoolYear] = useState();
  // const [preferences, setPreferences] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isError, setError] = useState(false);

  const SCHOOLYEAR = [
    { label: "Select School Year", value: -1 },
    { label: "Freshman", value: 2 },
    { label: "Sophomore", value: 3 },
    { label: "Junior", value: 4 },
    { label: "Senior", value: 5 },]

  const goHome = () => {
    navigation.navigate("Login");
  }

  const onSubmit = async () => {
    console.log(username);
    console.log(password);
    console.log(name);
    console.log(email);
    console.log(city);
    console.log(state);
    console.log(zipCode);
    console.log(schoolYear.label);
    if(username == null|| password == null || name == null || email == null || city == null || state == null || zipCode == null ||schoolYear == null) {
      console.log("something is null");
      setError(true);
      return;
    }

    try {
      setDisabled(true);
      const res = await axios.post(`http://${API}:8080/api/signup`,
        {
          username: username,
          password: password,
          name: username,
          email: email,
          city: city,
          state: state,
          zipCode: parseInt(zipCode),
          schoolYear: schoolYear.label,
          activities: []
        });
      setIsLoading(false);


      if (res.status != 200) {
        setAuthStatus("denied");
        console.log("denied");
        return;
      }

      setSubmitted(true);
    } catch (e) {
      console.log(e.message);
    }
    setDisabled(false);
  } 


  return (submitted) ?
    (
      <TouchableWithoutFeedback onPress={goHome}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
          <Text style={{ position: "absolute", top: "45%", fontSize: 25, fontWeight: "500", color: "#FF3008" }}>
            Successfully Signed Up!
          </Text>
          <Text style={{ marginTop: 20, color: "gray" }}>Click Anywhere to Log in!</Text>
        </View>
      </TouchableWithoutFeedback>
    )
    : (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={{ marginTop: 40 }}>
            <View style={styles.inner}>
              <Text style={styles.header}>Become a Workout Partner!</Text>
              <View>
                <Text style={styles.label}>General Info:</Text>
                <Text style={styles.label}></Text>

                <TextInput onChangeText={setUsername} value={username} placeholderTextColor="#ffc3b8" placeholder="Username" style={styles.textInput} />
                <TextInput onChangeText={setPassword} value={password} placeholderTextColor="#ffc3b8" placeholder="Password" style={styles.textInput} />
                <TextInput onChangeText={setName} value={name} placeholderTextColor="#ffc3b8" placeholder="Name" style={styles.textInput} />
                <TextInput onChangeText={setEmail} value={email} placeholderTextColor="#ffc3b8" placeholder="Email" style={styles.textInput} />
                <TextInput onChangeText={setCity} value={city} placeholderTextColor="#ffc3b8" placeholder="City" style={styles.textInput} />
                <TextInput onChangeText={setState} value={state} placeholderTextColor="#ffc3b8" placeholder="State" style={styles.textInput} />
                <TextInput onChangeText={setZipCode} value={zipCode} placeholderTextColor="#ffc3b8" placeholder="Zip Code" style={styles.textInput} />
                <Picker textInputStyle={{color: '#ffc3b8', padding: 5}}
                  containerStyle={styles.picker}
                  item={schoolYear}
                  items={SCHOOLYEAR}
                  onItemChange={setSchoolYear}
                  title ="School Year"
                  placeholder="Select School Year"
                  style={{ flex: 1, textAlign: "right" }}
                  isNullable
                />
                {/* <Text style={styles.label}>Optional:</Text>
                <Text style={styles.label}></Text>
                <TextInput onChangeText={setPreferences} value={preferences} placeholderTextColor="#ffc3b8" placeholder="(Preferences Option To Be Implemented)" style={styles.textInput} /> */}
              </View>

              {(isError)?(<Text style={{color:"blue"}}>* Sign up Failed. Please fill in all the blanks.</Text>):<Text/>}


              <View style={styles.btnContainer}>
                <Button color="white" disabled={disabled} title="Create" onPress={onSubmit} />
                <Button color="white" title="Already have an account?" onPress={() => navigation.navigate("Login")} />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#344955"
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    marginLeft: 100,
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 4,
    width: 10,
    height: 10
  },
  label: {
    marginTop: 8,
    color: "white",
    fontWeight: "600"
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
    color: "white",
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
  },
  picker: { // new
    width: 330,
    height: 45,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: '#344955',
    color: 'white'
  }
});
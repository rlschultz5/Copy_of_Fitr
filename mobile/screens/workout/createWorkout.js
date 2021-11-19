import React, { useState, Component, Dropdown } from 'react';
import axios from "axios";
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, ScrollView, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
import API from "../../api";
import { AuthContext } from '../../contexts/authContext';
import { Picker } from 'react-native-woodpicker'
import { DatePicker } from 'react-native-woodpicker'

const CreateWorkout = ({ navigation }) => {
  const [title, setTitle] = useState(null);
  const [activity, setActivity] = useState(null);
  const [experience, setExperience] = useState(null);
  const [length, setLength] = useState(null);
  const [dateAndTime, setDateAndTime] = useState(null);
  const [location, setLocation] = useState(null);
  const [minPeople, setMinPeople] = useState(null);
  const [maxPeople, setMaxPeople] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [authStatus, setAuthStatus] = useState("NA");
  const [isError, setError] = useState(false);

  const [pickedSports, setSports] = useState();
  const SPORTS = [
    { label: "Select Activity", value: -1 },
    { label: "Basketball", value: 2 },
    { label: "Volleyball", value: 3 },]
  const LOCATION = [
    { label: "Select Location", value: -1 },
    { label: "The Nick", value: 2 },
    { label: "The Shell", value: 3 },
    { label: "Marching Band Field", value: 4 },
    { label: "Anytime Fitness", value: 5 },]
  const EXPERIENCE = [
    { label: "Select Experience", value: -1 },
    { label: "Casual", value: 2 },
    { label: "Intermediate", value: 3 },
    { label: "Competitive", value: 4 },]
  const LENGTH = [
    { label: "Select Length", value: -1 },
    { label: "30 Min", value: 2 },
    { label: "60 Min", value: 3 },
    { label: "90 Min", value: 4 },
    { label: "120 Min", value: 5 },]

  const setLoggedIn = React.useContext(AuthContext);
  const onSubmit = async () => {

    if(activity == null|| experience == null || length == null || dateAndTime == null || location == null || minPeople == null || maxPeople == null ) {
      setError(true);
      return;
    }

    setDisabled(true);
    try {
        const res = await axios.post(`http://${API}:8080/api/createWorkout`,
        {
          tite: title,
          activity: activity,
          location: location,
          minPeople: minPeople,
          maxPeople: maxPeople,
          experience: experience,
          length: length,

          dateAndTime: dateAndTime
        });
      setIsLoading(false);

      if (res.status != 200) {
        setAuthStatus("denied");
        setError(true);
        console.log("denied");
        return;
      }

      try {
        await AsyncStorage.setItem('user', JSON.stringify(res.data))
        console.log(res.data);
      } catch (e) {
        // saving error
        // TODO: CORRECT??
      }

      navigation.navigate("AuthNavigator", { screen: "Login" });

    } catch (e) {
      console.log(e.message);
      setError(true);
      setIsLoading(false);
      setAuthStatus("denied");
      return;
    }
  }

  // Change Create Workout! button to {createWorkout}

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{ marginTop: 40 }}>
          <View style={styles.inner}>
            <Text style={styles.header}>Fitr</Text>
            <View>
              <Text></Text>
              <TextInput placeholderTextColor="ffc3b8" secureTextEntry={true} onChangeText={setTitle} value={title} placeholder="Workout Title" style={styles.textInput} />
              {/* <TextInput placeholderTextColor="grey" secureTextEntry={true} onChangeText={setActivity} value={activity} placeholder="Activity (TODO: dropdown list)" style={styles.textInput} /> */}
              <Picker
                containerStyle={styles.picker}
                item={activity}
                items={SPORTS}
                onItemChange={setActivity}
                title="Pick your activity"
                placeholder="Select Activity"
                style={{ flex: 1, textAlign: "right" }}
                isNullable
              />
              <Picker
                containerStyle={styles.picker}
                item={location}
                items={LOCATION}
                onItemChange={setLocation}
                title="Location"
                placeholder="Select Location"
                style={{ flex: 1, textAlign: "right" }}
                isNullable
              />
              <TextInput placeholderTextColor="ffc3b8" secureTextEntry={true} onChangeText={setMinPeople} value={minPeople} placeholder="Minimum People" style={styles.textInput} />
              <TextInput placeholderTextColor="ffc3b8" secureTextEntry={true} onChangeText={setMaxPeople} value={maxPeople} placeholder="Maximum People" style={styles.textInput} />
              <Picker
                containerStyle={styles.picker}
                item={experience}
                items={EXPERIENCE}
                onItemChange={setExperience}
                title="Experience"
                placeholder="Select Experience"
                style={{ flex: 1, textAlign: "right" }}
                isNullable
              />
              <Picker
                containerStyle={styles.picker}
                item={length}
                items={LENGTH}
                onItemChange={setLength}
                title="Length"
                placeholder="Select Length"
                style={{ flex: 1, textAlign: "right" }}
                isNullable
              />
              <TextInput placeholderTextColor="ffc3b8" secureTextEntry={true} onChangeText={setDateAndTime} value={dateAndTime} placeholder="Date and Time (TODO: clock implementation)" style={styles.textInput} />
              <Text></Text>
              <Button color="black" disabled={disabled} title="Create Workout!" onPress={onSubmit} />
            </View>
            {(isError)?(<Text style={{color:"blue"}}>* Unsuccessful. Make sure all fields are filled out and try again.</Text>):<Text/>}

          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default CreateWorkout;

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
  },
  picker: { // new
    width: 300,
    height: 45,
    borderColor: 'blue',
    borderWidth: 2,
    backgroundColor: 'grey',
    color: 'white'
  }
});


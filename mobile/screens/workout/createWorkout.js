import React, { useState } from 'react';
import axios from "axios";
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, ScrollView, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
import API from "../../api";
import { AuthContext } from '../../contexts/authContext';
import { Picker } from 'react-native-woodpicker'
import { DatePicker } from 'react-native-woodpicker'
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreateWorkout = ({ navigation }) => {
  const [creator_id, setCreator_id] = useState();
  const [title, setTitle] = useState(null);
  const [activity, setActivity] = useState(null);
  const [experience, setExperience] = useState(null);
  const [length, setLength] = useState(null);
  // const [date, setDate] = useState(null);
  const [pickedDate, setPickedDate] = useState();
  const [location, setLocation] = useState(null);
  const [minPeople, setMinPeople] = useState(null);
  const [maxPeople, setMaxPeople] = useState(null);
  const [description, setDescription] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [authStatus, setAuthStatus] = useState("NA");
  const [isError, setError] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

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
    { label: "30 Min", value: 30 },
    { label: "60 Min", value: 60 },
    { label: "90 Min", value: 90 },
    { label: "120 Min", value: 120 },]
  const handleText = () => pickedDate
    ? pickedDate.toDateString()
    : "No value Selected";

  const setLoggedIn = React.useContext(AuthContext);
  const onSubmit = async () => {
    // setIsLoading(true);

    try {
      let userData = JSON.parse(await AsyncStorage.getItem('user'));
      let date = (new Date("2016-02-29T07:00:00.000Z"));

        
        console.log(title);
        console.log(activity);
        console.log(location);
        console.log(minPeople);
        console.log(maxPeople);
        console.log(experience);
        console.log(length);
        console.log(userData._id);
        console.log(pickedDate);
        console.log(userData._id);
      if(title == null || activity == null || location == null || minPeople == null || maxPeople == null || experience == null || length == null ||  pickedDate == null || userData._id == null ) {
      
        
        setError(true);
        return;
      }
      const res = await axios.post(`http://${API}:8080/api/workout/create`,
        {
          title: title,
          activity: activity.label,
          location: location.label,
          minPeople: parseInt(minPeople),
          maxPeople: parseInt(maxPeople),
          date: pickedDate, // NOT DONE!!!!
          experienceLevel: experience.label,
          length: length.value,
          creator_id: userData._id,
          membersAttending: [userData._id],
          description: description
        });
      // setIsLoading(false);

      if (res.status != 200) {
        setAuthStatus("denied");
        setError(true);
        console.log("denied");
        return;
      }

      navigation.navigate("Main");
    } catch (e) {
      console.log(e);
      setError(true);
      // setIsLoading(false);
      setAuthStatus("denied");
      return;
    }

    setDisabled(true);
  }

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
              <TextInput placeholderTextColor="#ffc3b8" secureTextEntry={false} onChangeText={setTitle} value={title} placeholder="Workout Title" style={styles.textInput} />
              <Picker
                textInputStyle={{color: '#ffc3b8', padding: 5}}
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
                textInputStyle={{color: '#ffc3b8', padding: 5}}
                containerStyle={styles.picker}
                item={location}
                items={LOCATION}
                onItemChange={setLocation}
                title="Location"
                placeholder="Select Location"
                style={{ flex: 1, textAlign: "right" }}
                isNullable
              />
              <TextInput placeholderTextColor="#ffc3b8" secureTextEntry={false} onChangeText={setMinPeople} value={minPeople} placeholder="Minimum People" style={styles.textInput} />
              <TextInput placeholderTextColor="#ffc3b8" secureTextEntry={false} onChangeText={setMaxPeople} value={maxPeople} placeholder="Maximum People" style={styles.textInput} />
              {/* <TextInput placeholderTextColor="white" secureTextEntry={false} onChangeText={setDate} value={date} placeholder="Date and Time (TODO: clock implementation)" style={styles.textInput} /> */}
              <DatePicker
                textInputStyle={{color: '#ffc3b8', padding: 5}}
                containerStyle={styles.picker}
                value={pickedDate}
                onDateChange={setPickedDate}
                title="Date Picker"
                text={handleText()}
                isNullable={false}
                iosDisplay="inline"
                //backdropAnimation={{ opacity: 0 }}
                //minimumDate={new Date(Date.now())}
                //maximumDate={new Date(Date.now()+2000000000)}
                //iosMode="date"
                //androidMode="countdown"
                //iosDisplay="spinner"
                //androidDisplay="spinner"
                //locale="fr"
              />
              <Picker
                textInputStyle={{color: '#ffc3b8', padding: 5}}
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
                textInputStyle={{color: '#ffc3b8', padding: 5}}
                containerStyle={styles.picker}
                item={length}
                items={LENGTH}
                onItemChange={setLength}
                title="Length"
                placeholder="Select Length"
                style={{ flex: 1, textAlign: "right" }}
                isNullable
              />
              <TextInput placeholderTextColor="#ffc3b8" secureTextEntry={false} onChangeText={setDescription} value={description} placeholder="Description" style={styles.textInput} />
              <Text></Text>
              <Button color="white" disabled={disabled} title="Create Workout!" onPress={onSubmit} />
            </View>
            {(isError)?(<Text style={{color:"white"}}>* Unsuccessful. Make sure all fields are filled out and try again.</Text>):<Text/>}

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
    fontSize: 16,
    padding: 6,
    height: 40,
    color: "white",
    borderColor: "white",
    borderBottomWidth: 1,
    marginBottom: 20
  },
  btnContainer: {
    marginTop: 12
  },
  picker: { // new
    width: 325,
    height: 45,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: '#344955',
    color: 'white',
    marginBottom: 20
  }
});


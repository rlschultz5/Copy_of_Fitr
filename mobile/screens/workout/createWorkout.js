import React, { useEffect, useState, useRef} from 'react';
import axios from "axios";
import { Animated, Easing, View, Pressable, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, ScrollView, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
import API from "../../api";
import { AuthContext } from '../../contexts/authContext';
import { Picker } from 'react-native-woodpicker'
import { DatePicker } from 'react-native-woodpicker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import LottieView from 'lottie-react-native';




const CreateWorkout = ({ navigation }) => {
  const [creator_id, setCreator_id] = useState();
  const [title, setTitle] = useState(null);
  const [activity, setActivity] = useState(null);
  const [experience, setExperience] = useState(null);
  const [length, setLength] = useState(null);
  const [pickedDate, setPickedDate] = useState();
  const [location, setLocation] = useState(null);
  const [minPeople, setMinPeople] = useState(null);
  const [maxPeople, setMaxPeople] = useState(null);
  const [description, setDescription] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [authStatus, setAuthStatus] = useState("NA");
  const [isError, setError] = useState(false);
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(-1);
  // const [isLoading, setIsLoading] = useState(false);

  // let opacity = new Animated.Value(0);

  // const animate = easing => {
  //   Animated.timing(opacity, {
  //     toValue: 1,
  //     duration: 1200,
  //     easing
  //   }).start();
  // };

  // useEffect(()=>{
  //   animate(Easing.bounce)
  // },[])

  // const size = opacity.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, 80]
  // });

  // const animatedStyles = [
  //   {},
  //   {
  //     opacity,
  //     width: size,
  //     height: size
  //   }]
  // ;


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
    : "Choose a date";

  const setLoggedIn = React.useContext(AuthContext);

  const onSubmit = async () => {
    setLoading(true);

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
      console.log(time);
      console.log(userData._id);
      if (title == null || activity == null || location == null || minPeople == null || maxPeople == null || experience == null || length == null || time == null || userData._id == null) {
        
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
          date: time, // NOT DONE!!!!
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
      
    } catch (e) {
      console.log(e);
      setError(true);
      // setIsLoading(false);
      setAuthStatus("denied");
      return;
    }
    setLoading(false);
    setDisabled(true);
    setSuccess(true);
    setTimeout(()=>{navigation.navigate("Main")}, 3000)

  }
  if(true) return (
    <View style={{justifyContent:"center", alignItems:"center", flex:1, backgroundColor:"white"}}>
    {/* <Animated.View style={animatedStyles}> */}
      <Text style={{ alignSelf:"center", fontSize:30, textAlign:"center", color:"#e6006b", fontWeight:"500", marginBottom:20}}>Workout Created Successfully!</Text>
      
    {/* </Animated.View> */}
    {/* <Text style={{marginTop:15}}>Returning to home page in 3 seconds...</Text> */}
    <Button onPress={()=>{navigation.navigate("Main")}} title="Go Home" color="black"/>
    </View>
  
  )
  return loading ? (<LottieView style={{ width: 60, alignSelf: "center", top: "10%" }} speed={2} source={require("../loader.json")} autoPlay={true} loop={true}></LottieView>
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{ marginTop: 60 }}>
          <View style={styles.inner}>
            <Text style={styles.header}>Create Workout</Text>
            <Text style={{ width: "80%", color: "#e6006b", marginBottom: 30 }}>If none works, create your own!</Text>
            <View>
              <Text></Text>
              <TextInput placeholderTextColor="black" secureTextEntry={false} onChangeText={setTitle} value={title} placeholder="Workout Title" style={styles.textInput} />
              <TextInput placeholderTextColor="black" secureTextEntry={false} onChangeText={setDescription} value={description} placeholder="Description" style={styles.textInput} />
              <TextInput placeholderTextColor="black" secureTextEntry={false} onChangeText={setMinPeople} value={minPeople} placeholder="Minimum People" style={styles.textInput} />
              <TextInput placeholderTextColor="black" secureTextEntry={false} onChangeText={setMaxPeople} value={maxPeople} placeholder="Maximum People" style={styles.textInput} />
              <View style={{ height: 30 }} />

              <Picker
                textInputStyle={{ color: 'black', padding: 5 }}
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
                textInputStyle={{ color: 'black', padding: 5 }}
                containerStyle={styles.picker}
                item={location}
                items={LOCATION}
                onItemChange={setLocation}
                title="Location"
                placeholder="Select Location"
                style={{ flex: 1, textAlign: "right" }}
                isNullable
              />
              {/* <TextInput placeholderTextColor="white" secureTextEntry={false} onChangeText={setDate} value={date} placeholder="Date and Time (TODO: clock implementation)" style={styles.textInput} /> */}
              {/* <DatePicker
                textInputStyle={{ color: 'black', padding: 5 }}
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
              /> */}


              <Picker
                textInputStyle={{ color: 'black', padding: 5 }}
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
                textInputStyle={{ color: 'black', padding: 5 }}
                containerStyle={styles.picker}
                item={length}
                items={LENGTH}
                onItemChange={setLength}
                title="Length"
                placeholder="Select Length"
                style={{ flex: 1, textAlign: "right" }}
                isNullable
              />
              <View style={{ height: 30 }} />

              <View style={{ flexDirection: "row", marginBottom:20 }}>
                <Text style={{ flex: 1, fontSize: 16 }}>Choose time: </Text>
                <DateTimePicker
                  testID="timePicker"
                  style={{ flex: 2, top: -8 }}
                  value={time}
                  mode="datetime"
                  is24Hour={false}
                  display="default"
                  onChange={(e, d) => setTime(d)}
                />
              </View>

              <Text></Text>
              <Pressable disabled={disabled} style={{backgroundColor:"#004275", justifyContent:"center",height:50, margin:15, marginTop: 25, borderRadius:10}}
      onPress={onSubmit}>
        <Text style={{color:"white", alignSelf:"center", fontWeight:"500", fontSize:15}}>
          Create Workout!
        </Text>

      </Pressable>
            </View>
            {(isError) ? (<Text style={{ color: "white" }}>* Unsuccessful. Make sure all fields are filled out and try again.</Text>) : <Text />}

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
    backgroundColor: "white"
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    fontWeight: "400",
    color: "black",
  },
  textInput: {
    fontSize: 16,
    padding: 6,
    height: 40,
    color: "black",
    borderColor: "#3f3f3f",
    borderBottomWidth: 1,
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


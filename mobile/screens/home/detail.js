import React from 'react';
import { View, KeyboardAvoidingView, Image, ScrollView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';

const Detail = ({ route, navigation }) => {
  return (
    <View style={{ flex: 1, paddingTop: 50, backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "white", padding:30}}>
       <Text style={styles.header}>Detail</Text>
      <Text style={{fontWeight:"500", fontSize:24, marginBottom:15}}>{route.params.workout.title}</Text>
      <Text style={{fontWeight:"300", fontSize:20, marginBottom:15}}>{`Sports: ${route.params.workout.activity}`}</Text>
      <Text style={{fontWeight:"300", fontSize:20, marginBottom:15}}>{`${route.params.workout.description}`}</Text>
      <Text style={{fontWeight:"300", fontSize:20, marginBottom:15}}>{`Experience Level: ${route.params.workout.level}`}</Text>
      <Text style={{fontWeight:"300", fontSize:20, marginBottom:15}}>{`Capacity: ${route.params.workout.filled}/${route.params.workout.capacity}`}</Text>
      </ScrollView >

    </View>
  );
}
/*<View style={{ position: 'absolute', height: 40, width: "80%", left: "10%", bottom: 25, backgroundColor: "#FF3008", justifyContent: 'space-between', alignItems: "center", borderRadius: 15 }}>
          <Text style={{ marginTop: 7, fontSize: 20, fontWeight: "600", color: "white" }}>
            Submit Application
          </Text>
        </View>*/
export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    fontWeight: "600",
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 50
  },
  btnContainer: {
    marginTop: 12
  }
});




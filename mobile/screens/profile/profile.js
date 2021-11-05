import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, Button } from 'react-native';


export default function ProfileScreen() {

  return (
    <View style={styles.container}>
      <Text>ProfilePage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    padding: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterBtnText: {
    alignSelf: "center",

  },
  filterBtn: {
    alignSelf: "center",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 15,
    height: 30,
    width: "60%",
    justifyContent: "center",
    marginBottom: 20,
  },
  container: {
    paddingTop: 50,
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

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Pressable, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from 'react-native-woodpicker'
import { DatePicker } from 'react-native-woodpicker'

import CheckBox from 'react-native-check-box'



export default function Filter({ visible, setVisible, filter, setFilter }) {
    const [pickedSports, setSports] = useState(filter.activity);
    const [pickedEL, setEL] = useState(filter.experienceLevel);
    const [pickedGender, setGender] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [pickedDate, setPickedDate] = useState();

  const handleText = () => pickedDate
      ? pickedDate.toDateString()
      : "Select Date";

    const closeModule = () => {
        setFilter({ activity: pickedSports, experienceLevel: pickedEL, isFull: isChecked, date: pickedDate })
        setVisible(false)
    }

    const resetFilter = () => {
        setSports(filter.activity);
        setEL(filter.experienceLevel);
        setIsChecked(false);
        setPickedDate(undefined);
    }


    const SPORTS = [
        { label: "All", value: -1 },
        { label: "Basketball", value: 2 },
        { label: "Volleyball", value: 3 },]

    const EXPERIENCE_LEVEL = [
        { label: "Any", value: -1 },
        { label: "Casual", value: 1 },
        { label: "Intermediate", value: 2 },
        { label: "Competitive", value: 3 },
    ]

    const GENDERS = [
        { label: "No", value: 1 },
        { label: "Female", value: 2 },
        { label: "Male", value: 3 },
        { label: "Non-Binary", value: 4 },
        { label: "Other", value: 5 }

    ]

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={filterStyle.bgModal} >
            </View>
            <Modal visible={visible} transparent={true} style={filterStyle.mainModal} animationType="slide" >


                <View style={filterStyle.container}>
                    <Pressable style={filterStyle.closeButton} onPress={() => closeModule()}>
                        <Ionicons name='ios-close-outline' size={32} color="gray" />
                    </Pressable>
                    <View style={filterStyle.textContainer}>
                        <Text style={filterStyle.title}>Filters</Text>
                        <Text>Set filters for your workouts!</Text>
                    </View>
                    <ScrollView>
                    <View style={{paddingLeft:30}} >
                        <Pressable onPress={resetFilter}>
                            <Text style={{color:"#e6006b"}}>Reset Filter</Text>
                            </Pressable>
                        </View>

                        <View style={filterStyle.grid}>
                            <Text style={{ flex: 1 }}>Sports</Text>
                            <Picker
                                containerStyle={filterStyle.picker}
                                item={pickedSports}
                                items={SPORTS}
                                onItemChange={setSports}
                                title="Pick your sports"
                                placeholder="All"
                                style={{ flex: 1, textAlign: "right" }}
                                isNullable
                            />
                        </View>
                        <View style={filterStyle.grid}>
                            <Text style={{ flex: 1 }}>Date</Text>
                            <DatePicker
                                containerStyle={filterStyle.picker}
                                value={pickedDate}
                                onDateChange={setPickedDate}
                                title="Date Picker"
                                text={handleText()}
                                isNullable={false}
                                iosDisplay="inline"
                                style={{ flex: 1, textAlign: "right" }}
                            />
                        </View>

                        <View style={filterStyle.grid}>
                            <Text style={{ flex: 1 }}>Experience Level</Text>
                            <Picker
                                containerStyle={filterStyle.picker}
                                item={pickedEL}
                                items={EXPERIENCE_LEVEL}
                                onItemChange={setEL}
                                title="Pick your experience level"
                                placeholder="Any"
                                style={{ flex: 1, textAlign: "right" }}
                                isNullable
                            />
                        </View>

                        <CheckBox
                            style={{ flex: 1, padding: "10%" }}
                            onClick={() => {
                                setIsChecked(!isChecked)
                            }}
                            isChecked={isChecked}
                            leftText={"Show only available workouts"}
                        />
                    </ScrollView>



                </View>

            </Modal>
        </Modal>
    );
}

const filterStyle = StyleSheet.create({
    picker: {
        borderColor: "grey",
        borderWidth: 1,
        height: 25,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 10,
    },
    grid: {
        padding: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    mainModal: {
        marginTop: "30%"
    },
    bgModal: {
        flex: 1,
        backgroundColor: "black",
        opacity: 0.2,
    },
    title: {
        fontSize: 30,
        fontWeight: "600",
    },
    textContainer: {
        padding: 30,
    },
    container: {
        top: "20%",
        flex: 1,
        backgroundColor: "white",
        borderRadius: 20

    },
    closeButton: {
        left: 20,
        top: 15
    }

});

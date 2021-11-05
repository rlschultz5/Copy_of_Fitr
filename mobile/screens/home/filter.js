import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from 'react-native-woodpicker'




export default function Filter({ visible, setVisible }) {
    const [pickedSports, setSports] = useState();
    const [pickedEL, setEL] = useState();
    const [pickedGender, setGender] = useState();

    const SPORTS = [
        { label: "Basketball", value: 1 },
        { label: "Volleyball", value: 2 },]

    const EXPERIENCE_LEVEL = [
        { label: "All", value: 1 },
        { label: "Beginner", value: 2 },
        { label: "Intermediate", value: 3 },
        { label: "Advanced", value: 4 },
    ]

    const GENDERS = [
        { label: "No", value: 1},
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
                    <Pressable style={filterStyle.closeButton} onPress={() => setVisible(false)}>
                        <Ionicons name='ios-close-outline' size={32} color="gray" />
                    </Pressable>
                    <View style={filterStyle.textContainer}>
                        <Text style={filterStyle.title}>Filters</Text>
                        <Text>Set filters for your workouts!</Text>
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
                    <View style={filterStyle.grid}>
                        <Text style={{ flex: 1 }}>Gender Specific?</Text>
                        <Picker
                            containerStyle={filterStyle.picker}
                            item={pickedGender}
                            items={EXPERIENCE_LEVEL}
                            onItemChange={setGender}
                            title="Choose your gender filter"
                            placeholder="No"
                            style={{ flex: 1, textAlign: "right" }}
                            isNullable
                        />
                    </View>
                    <View style={filterStyle.grid}>
                        <Text style={{ flex: 1 }}>Capacity</Text>
                        <Text style={{ flex: 1, textAlign: "right" }}>boo</Text>
                    </View>


                </View>

            </Modal>
        </Modal>
    );
}

const filterStyle = StyleSheet.create({
    picker:{
        borderColor: "grey",
        borderWidth:1,
        height:25,
        paddingRight:10,
        paddingLeft:10,
        borderRadius:10,
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

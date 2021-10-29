import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function Filter({ visible, setVisible }) {
    return (
        <Modal visible={visible} animationType="fade">
            <View style={filterStyle.bgModal} >
            </View>
            <Modal visible={visible} transparent={true} style={filterStyle.mainModal} animationType="slide" >


                <View style={filterStyle.container}>
                    <Pressable style={filterStyle.closeButton} onPress={() => setVisible(false)}>
                        <Ionicons name='ios-close-outline' size={32} color="gray"/>
                    </Pressable>
                    <View style={filterStyle.textContainer}>
                        <Text style={filterStyle.title}>Filters</Text>
                        <Text>Set filters for your workouts!</Text>
                    </View>
                    <View style={filterStyle.grid}>
                        <Text style={{flex:1}}>blah</Text>
                        <Text style={{flex:1, textAlign:"right"}}>boo</Text>
                    </View>

                </View>

            </Modal>
        </Modal>
    );
}

const filterStyle = StyleSheet.create({
    grid:{
        flexDirection:"row",
        justifyContent:"space-between",
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
        top: 50,
        flex: 1,
        backgroundColor: "white",
        borderRadius: 20

    },
    closeButton: {
        left:20,
        top:15
    }

});

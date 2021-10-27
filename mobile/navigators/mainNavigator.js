import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/native-stack';


import * as React from 'react';
import HomeScreen from '../screens/home/homeScreen';

const Stack = createBottomTabNavigator();


function AuthStack() {
    return (
            <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                <Tab.Screen name="Home" component={HomeScreen} />
            </Tab.Navigator>
    );
}

export default AuthStack;
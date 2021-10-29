import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as React from 'react';
import HomeScreen from '../screens/home/homeScreen';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createBottomTabNavigator();


function MainNavigator() {
    return (
            <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                <Tab.Screen name="Home" component={HomeScreen} />
            </Tab.Navigator>
    );
}

export default MainNavigator;
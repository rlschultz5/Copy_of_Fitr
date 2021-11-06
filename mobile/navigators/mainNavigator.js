import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as React from 'react';
import HomeScreen from '../screens/home/homeScreen';
import AuthScreen from '../screens/auth/authScreen';
import { NavigationContainer } from '@react-navigation/native';
import ProfileNavigator from './profileNavigator';

const Tab = createBottomTabNavigator();


function MainNavigator() {
    return (
            <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Profile" component={ProfileNavigator} />
            </Tab.Navigator>
    );
}

export default MainNavigator;
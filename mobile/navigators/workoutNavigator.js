import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as React from 'react';
import CreateEvent from '../screens/workout/createWorkout';
import HomeScreen from '../screens/home/homeScreen';
import AuthScreen from '../screens/auth/authScreen';

const Tab = createBottomTabNavigator();

function WorkoutNavigator() {
    return (
            <Tab.Navigator initialRouteName="Create Workout" screenOptions={{headerShown: false}}>
                <Tab.Screen name="Create Workout" component={CreateWorkout} />
                <Tab.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={AuthScreen} />

            </Tab.Navigator>
    );
}

export default WorkoutNavigator;

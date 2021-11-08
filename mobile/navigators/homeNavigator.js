import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as React from 'react';
import Detail from '../screens/home/detail';
import HomeScreen from '../screens/home/homeScreen';
import CreateWorkout from '../screens/workout/createWorkout';

const Stack = createStackNavigator();

function HomeNavigator() {
    return (
            <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Main" component={HomeScreen} />
                <Stack.Screen name="Create Workout" component={CreateWorkout} />
                <Stack.Screen name="Detail" component={Detail} />

            </Stack.Navigator>
    );
}

export default HomeNavigator;

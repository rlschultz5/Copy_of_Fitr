import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import * as React from 'react';
import ProfileScreen from '../screens/profile/profile';
import MyWorkout from '../screens/profile/changePassword';
import changePassword from '../screens/profile/changePassword';

const Stack = createNativeStackNavigator();


function ProfileNavigator({navigation}) {
    return (
            <Stack.Navigator initialRouteName="MainProfile" screenOptions={{headerShown: false}}>
                <Stack.Screen name="MainProfile" component={ProfileScreen} />
                <Stack.Screen name="changePassword" component={changePassword} />
            </Stack.Navigator>
    );
}

export default ProfileNavigator;
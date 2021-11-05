import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import * as React from 'react';
import ProfileScreen from '../screens/profile/profile';
const Stack = createNativeStackNavigator();


function ProfileNavigator({navigation}) {
    return (
            <Stack.Navigator initialRouteName="MainProfile" screenOptions={{headerShown: false}}>
                <Stack.Screen name="MainProfile" component={ProfileScreen} />
            </Stack.Navigator>
    );
}

export default ProfileNavigator;
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import * as React from 'react';
import AuthScreen from '../screens/auth/authScreen';

const Stack = createStackNavigator();


function AuthNavigator() {
    return (
            <Stack.Navigator initialRouteName="TEMP" screenOptions={{headerShown: false}}>
                <Stack.Screen name="TEMP" component={AuthScreen} />
            </Stack.Navigator>
    );
}

export default AuthNavigator;
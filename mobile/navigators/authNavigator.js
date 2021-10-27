import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import * as React from 'react';
import AuthScreen from '../screens/auth/authScreen';

const Stack = createNativeStackNavigator();


function AuthStack() {
    return (
            <Stack.Navigator initialRouteName="TEMP" screenOptions={{headerShown: false}}>
                <Stack.Screen name="TEMP" component={AuthScreen} />
            </Stack.Navigator>
    );
}

export default AuthStack;
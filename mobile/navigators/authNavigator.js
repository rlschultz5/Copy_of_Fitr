import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as React from 'react';
import AuthScreen from '../screens/auth/authScreen';
import SignupScreen from '../screens/auth/signupScreen';
import ForgotPassword from '../screens/auth/forgotPassword';
import HomeScreen from '../screens/home/homeScreen';

const Stack = createStackNavigator();

function AuthNavigator() {
    return (
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={AuthScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Forgot Password" component={ForgotPassword} />
            </Stack.Navigator>
    );
}

export default AuthNavigator;

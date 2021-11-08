import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as React from 'react';
import HomeScreen from '../screens/home/homeScreen';
import AuthScreen from '../screens/auth/authScreen';
import { NavigationContainer } from '@react-navigation/native';
import ProfileNavigator from './profileNavigator';
import { Ionicons } from '@expo/vector-icons';
import CreateWorkout from '../screens/workout/createWorkout';
import HomeNavigator from './homeNavigator';

const Tab = createBottomTabNavigator();


function MainNavigator() {
    return (
            <Tab.Navigator initialRouteName="Home" 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'barbell-outline'
                      : 'barbell-outline';
                  } else if (route.name === 'Profile') {
                    iconName = focused ? 'person-outline' : 'person-outline';
                  }
      
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#e6006b',
                tabBarInactiveTintColor: 'gray',
                headerShown:false              })}
            >
                <Tab.Screen name="Home" component={HomeNavigator} />
                <Tab.Screen name="Profile" component={ProfileNavigator} />

            </Tab.Navigator>
    );
}

export default MainNavigator;
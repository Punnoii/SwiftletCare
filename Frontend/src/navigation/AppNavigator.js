// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import Screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ChooseSectionScreen from '../screens/ChooseSectionScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PatientDetailsScreen from '../screens/PatientDetailsScreen';

const Stack = createStackNavigator();
// screenOptions={{ headerShown: false }}

const AppNavigator = ({isLoggedIn}) => {
  console.log({isLoggedIn});
  // initialRouteName={isLoggedIn ? 'ChooseSection' : 'Login'}
  return (
    <NavigationContainer initialRouteName={isLoggedIn ? 'ChooseSection' : 'Login'}>
      <Stack.Navigator>
            <Stack.Screen name="ChooseSection" component={ChooseSectionScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="PatientDetails" component={PatientDetailsScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
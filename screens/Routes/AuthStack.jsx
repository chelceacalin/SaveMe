import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../Authentication/SignInScreen';
import SignUpScreen from '../Authentication/SignUpScreen';

const Stack = createStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Sign In" component={SignInScreen} />
    <Stack.Screen name="Sign Up" component={SignUpScreen} />
  </Stack.Navigator>
  )
}

export default AuthStack
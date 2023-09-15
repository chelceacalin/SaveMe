import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../Authentication/SignInScreen';
import SignUpScreen from '../Authentication/SignUpScreen';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign In"
        component={SignInScreen}
        options={{ headerShown: false }} // Hide the header for this screen
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{ headerShown: false }} // Hide the header for this screen
      />
    </Stack.Navigator>
  )
}

export default AuthStack

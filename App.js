import React from 'react';
import './config/firebase';
import { useAuthentication } from './hooks/useAuthentication';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home/Home';
import SignInScreen from './screens/Authentication/SignInScreen';
import SignUpScreen from './screens/Authentication/SignUpScreen';
import { StyleSheet } from 'react-native';
import CustomDrawerContent from './screens/drawer/CustomDrawer';
import {
  createDrawerNavigator
} from "@react-navigation/drawer";



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function StackNavigatorWithDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={StackNavigator} />
    </Drawer.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const { user } = useAuthentication();

  return (
    <NavigationContainer>
      {user ? (
        <StackNavigatorWithDrawer />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
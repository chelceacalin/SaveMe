import React from 'react';
import './config/firebase';
import { useAuthentication } from './hooks/useAuthentication';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './screens/Routes/AuthStack';
import HomeScreen from './screens/Home/Home';
import { StyleSheet, StatusBar } from 'react-native'; // Import StatusBar
import CustomDrawerContent from './screens/drawer/CustomDrawer';
import { createDrawerNavigator } from "@react-navigation/drawer";

import StackNavigator from './screens/Routes/StackNavigator';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function StackNavigatorWithDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={StackNavigator} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const { user } = useAuthentication();

  return (
    <NavigationContainer>
      {/* Set StatusBar with the desired background color and bar style */}
      <StatusBar backgroundColor="#000000" barStyle="light-content" />

      {user ? (
        <StackNavigatorWithDrawer />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

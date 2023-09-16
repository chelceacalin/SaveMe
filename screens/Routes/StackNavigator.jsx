import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoudEmergencyConfig from '../EmergencyConfig/LoudEmergencyConfig';
import SilentEmergencyConfig from '../EmergencyConfig/SilentEmergencyConfig';
import ConversationList from '../Chatting/ConversationList';
import Conversation from '../Chatting/IndividualChat/Conversation';
import HomeScreen from '../Home/Home';

const Stack = createStackNavigator();

const headerOptions = {
  headerStyle: {
    backgroundColor: '#082031',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    color: 'white',
  },
};

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }} // Hide the header on the "home" screen
      />
      <Stack.Screen
        name="LoudEmergencyConfig"
        component={LoudEmergencyConfig}
        options={headerOptions} 
      />
      <Stack.Screen
        name="SilentEmergencyConfig"
        component={SilentEmergencyConfig}
        options={headerOptions} 
      />
      <Stack.Screen
        name="conversations"
        component={ConversationList}
        options={headerOptions} 
      />
      <Stack.Screen
        name="conversation"
        component={Conversation}
        options={headerOptions} 
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;

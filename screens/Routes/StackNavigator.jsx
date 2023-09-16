import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header } from '@react-navigation/stack';
import LoudEmergencyConfig from '../EmergencyConfig/LoudEmergencyConfig';
import SilentEmergencyConfig from '../EmergencyConfig/SilentEmergencyConfig';
import ConversationList from '../Chatting/ConversationList';
import Conversation from '../Chatting/IndividualChat/Conversation';
import HomeScreen from '../Home/Home';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="LoudEmergencyConfig" component={LoudEmergencyConfig} />
      <Stack.Screen name="SilentEmergencyConfig" component={SilentEmergencyConfig} />
      <Stack.Screen name="conversations" component={ConversationList} 
        options={{headerShown:true}}


      />
      <Stack.Screen
        name="conversation"
        component={Conversation}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;

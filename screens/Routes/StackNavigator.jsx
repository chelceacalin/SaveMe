import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Home/Home';
import LoudEmergencyConfig from '../EmergencyConfig/LoudEmergencyConfig';
import SilentEmergencyConfig from '../EmergencyConfig/SilentEmergencyConfig';

const Stack = createStackNavigator();

function StackNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="home" component={HomeScreen}/>
			<Stack.Screen name="LoudEmergencyConfig" component={LoudEmergencyConfig}/>
			<Stack.Screen name="SilentEmergencyConfig" component={SilentEmergencyConfig}/>
		
		</Stack.Navigator>
	);
}

export default StackNavigator
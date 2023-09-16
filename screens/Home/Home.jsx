import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAuthentication} from '../../hooks/useAuthentication';
import {getAuth} from 'firebase/auth';
import {useEffect, useState} from "react";
import {getLocationPermission, getUserLocation} from "../../services/location.service";
import {sendSMS} from "../../services/sms.service";

const auth = getAuth();

export default function HomeScreen() {
	const [loudButtonPressed, setLoudButtonPressed] = useState(false);
	const [silentButtonPressed, setSilentButtonPressed] = useState(false);
	
	useEffect(() => {
		getLocationPermission();
	}, []);
	
	useEffect(() => {
		if (loudButtonPressed || silentButtonPressed) {
			const interval = setInterval(() => {
				getUserLocation().then(data => {
					sendSMS({latitude: data.latitude, longitude: data.longitude});
				})
			}, 20000);
			return () => clearInterval(interval);
		}
	}, [loudButtonPressed, silentButtonPressed])
	
	const {user} = useAuthentication();
	
	function onPressLoudButton() {
		setLoudButtonPressed(!loudButtonPressed)
		setSilentButtonPressed(false)
	}
	
	function onPressSilentButton() {
		setSilentButtonPressed(!silentButtonPressed)
		setLoudButtonPressed(false)
	}
	
	return (
		<View style={styles.container}>
			<TouchableOpacity style={[styles.button, styles.loudButton]} onPress={onPressLoudButton}>
				<Text style={styles.emergency}>Emergency</Text>
				<Text style={styles.emergencyType}>LOUD</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, styles.silentButton]} onPress={onPressSilentButton}>
				<Text style={styles.emergency}>Emergency</Text>
				<Text style={styles.emergencyType}>SILENT</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1b3a4f',
		alignItems: 'center',
		justifyContent: 'center',
	},
	signOut: {
		marginTop: 10,
		margin: 'auto'
	},
	button: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 70,
		margin: 35,
		padding: 10,
		borderRadius: 10,
		borderColor: 'white',
		borderWidth: 1,
		width: '75%'
	},
	loudButton: {
		backgroundColor: '#b63132',
	},
	silentButton: {
		backgroundColor: '#12438f'
	},
	emergency: {
		color: 'white',
		fontWeight: 500,
		marginRight: 10,
		fontSize: 'x-large'
	},
	emergencyType: {
		color: '#ffba1e',
		fontWeight: 700,
		fontSize: 'x-large'
	}
});
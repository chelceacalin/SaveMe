import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Input} from 'react-native-elements';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {ref, set} from '@firebase/database';
import {db} from '../../config/firebase';

const auth = getAuth();

export default function SignUpScreen  ({navigation})  {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [validationMessage, setValidationMessage] = useState('');
	const [phone, setPhone] = useState('');
	
	async function createAccount() {
		if (email === '' || password === '') {
			setValidationMessage('Required fields are missing');
			return;
		}
		
		try {
			let userKey;
			let success = false;
			await createUserWithEmailAndPassword(auth, email, password).then((credential) => {
				success = true;
				userKey = credential.user.uid;
				
				const newUserEntry = {
					id: userKey,
					email: email,
					password: password,
					phone: phone,
				};
				
				set(ref(db, `users/${userKey}`), newUserEntry);
			});
			
			if (success) {
				setEmail('');
				setPassword('');
				setValidationMessage('');
				navigation.navigate('Sign In');
			} else {
				setValidationMessage('User account creation failed');
			}
		} catch (error) {
			setValidationMessage(error.message);
		}
	}
	
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.label}>Email</Text>
				<Input
					placeholder='Email'
					containerStyle={styles.inputContainer}
					inputStyle={styles.input}
					value={email}
					onChangeText={(text) => setEmail(text)}
					leftIcon={<Icon name='envelope' size={16}/>}
				/>
				<Text style={styles.label}>Password</Text>
				<Input
					placeholder='Password'
					containerStyle={styles.inputContainer}
					inputStyle={styles.input}
					value={password}
					onChangeText={(value) => setPassword(value)}
					secureTextEntry
					leftIcon={<Icon name='key' size={16}/>}
				/>
				<Text style={styles.label}>Phone Number</Text>
				<Input
					placeholder='Phone Number'
					containerStyle={styles.inputContainer}
					inputStyle={styles.input}
					value={phone}
					onChangeText={(value) => setPhone(value)}
					leftIcon={<Icon name='key' size={16}/>}
				/>
				
				<Text style={styles.error}>{validationMessage}</Text>
				<Button
					title='Sign up'
					buttonStyle={styles.signInButton}
					titleStyle={styles.signInButtonTitle}
					onPress={createAccount}
				/>
				<View>
					<Text style={styles.loginText}>
						Already have an account?
						<TouchableOpacity onPress={() => navigation.navigate('Sign In')} style={styles.loginLink}>
							<Text style={styles.loginLinkText}>Login here</Text>
						</TouchableOpacity>
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: '#1B394F',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputContainer: {
		marginTop: 10,
		backgroundColor: 'white',
		width: 'auto',
		borderRadius: 20, // Make the inputs round
		paddingHorizontal: 15,
	},
	input: {
		color: 'black',
		fontSize: 16,
	},
	label: {
		marginTop: 15,
		color: 'white',
		marginBottom: 2,
	},
	signInButton: {
		marginTop: 10,
		backgroundColor: '#FFC107',
		borderRadius: 10,
	},
	signInButtonTitle: {
		color: '#1B394F',
		fontSize: 18,
	},
	error: {
		marginTop: 10,
		color: 'red',
		fontSize: 14,
		textAlign: 'center',
	},
	loginText: {
		marginTop: 10,
		fontSize: 17,
		color: 'white',
		textAlign: 'center',
	},
	loginLink: {
		color: '#FF3D00',
		marginLeft: 10,
	},
	loginLinkText: {
		t:  'bold',
	},
});


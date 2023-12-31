import axios from 'axios';
import {encode} from 'base-64';

export async function sendSMS(coordinates, loudEmergencyContact) {
	//TODO: Be sure to securely store your Twilio account SID and auth token,
	// and never expose them in your client-side code.
	// Use environment variables or a server to make API requests to Twilio securely.
	const accountSid = 'ACdf1cd6b2e0d83c9add402c0b7a162f52';
	const authToken = '66a22463fd1ce67b8bb804a8e9d64349';
	const twilioPhoneNumber = '+14062063691';
	
	const message = 'Hello, this is a test SMS from my app!';
	
	const baseUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}`;
	
	const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`;
	
	const requestData = {
		To: loudEmergencyContact,
		From: twilioPhoneNumber,
		Body: 'HELP! Save me! This is my location: ' + googleMapsUrl,
	};
	
	try {
		const response = await axios.post(
			`${baseUrl}/Messages.json`,
			requestData,
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${encode(`${accountSid}:${authToken}`)}`,
				},
			}
		);
		
		if (response.status === 201) {
			alert('SMS sent successfully!');
		} else {
			alert('Failed to send SMS');
		}
		
	} catch (error) {
		console.error(error);
		alert('An error occurred while sending SMS');
	}
}

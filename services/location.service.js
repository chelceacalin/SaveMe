import * as Location from 'expo-location';

export async function getLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
    }
    // Permission granted, you can now access the user's location.
}

export async function getUserLocation() {
    try {
        const location = await Location.getCurrentPositionAsync({});
        return location.coords;
    } catch (error) {
        console.error('Error getting user location:', error);
        // Handle location error here.
    }
}
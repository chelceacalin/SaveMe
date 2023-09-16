import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

export default function CameraScreen() {
  const cameraRef = useRef(null);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false); 

  useEffect(() => {
    const delay = 1700; 
    const timer = setTimeout(() => {
      if (cameraReady && cameraRef.current) {
        takePicture();
      }
    }, delay);
  
    return () => clearTimeout(timer);
  }, [cameraReady]); 
  

  useEffect(() => {
    if (cameraReady && cameraRef.current) {
      takePicture();
    }
  }, [cameraReady]); 

  const takePicture = async () => {
    console.log("camera ref: ", cameraRef);
    if (cameraRef.current) {
      try {
        console.log("Taking picture...");
        const options = {
          format: 'jpg',
          quality: 1,
        };
        const uri = await captureRef(cameraRef, options);
        if (uri) {
          console.log("Picture captured successfully:", uri);
          const asset = await MediaLibrary.createAssetAsync(uri);
          MediaLibrary.createAlbumAsync('Expo', asset)
            .then(() => {
              console.log('Image saved to album');
            })
            .catch((error) => {
              console.error('Error creating album:', error);
            });
        } else {
          console.log("Failed to capture picture. URI is null.");
        }
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    } else {
      console.log("Camera ref is null.");
    }
  };
  

  return (
    <View style={[styles.container, { backgroundColor: '#1b3a4f' }]}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          ref={(ref) => {
            cameraRef.current = ref;
          }}
          ratio="4:6"
          onCameraReady={() => setCameraReady(true)} 
        >
        </Camera>
      </View>
      <TouchableOpacity
        style={styles.captureButton}
        onPress={takePicture}
      >
        <Text style={styles.captureButtonText}>
          Take Picture
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    aspectRatio: 2 / 3, 
  },
  captureButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  captureButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

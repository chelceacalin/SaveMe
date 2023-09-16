import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { captureRef } from 'react-native-view-shot';
import uuid from 'react-native-uuid';
import { storage } from '../../config/firebase';
import {
  getDownloadURL,
  uploadBytes,
  ref as storageRef,
} from "@firebase/storage";
import { useAuthentication } from '../../hooks/useAuthentication';

export default function CameraScreen({ navigation }) {
  const backCameraRef = useRef(null);
  const frontCameraRef = useRef(null);
  const { user } = useAuthentication();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    const delay = 1700;
    const timer = setTimeout(() => {
      if (cameraReady && backCameraRef.current && frontCameraRef.current) {
        takeBackPhotoAndUpload();
        takeFrontPhotoAndUpload();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [cameraReady]);

  const takeBackPhotoAndUpload = async () => {
    await takePictureAndUpload(backCameraRef, 'Back');
  };

  const takeFrontPhotoAndUpload = async () => {
    await takePictureAndUpload(frontCameraRef, 'Front');
  };

  const takePictureAndUpload = async (camera, type) => {
    if (camera) {
      try {
        const options = {
          format: 'jpg',
          quality: 1,
        };
        const uri = await captureRef(camera, options);
        if (uri) {
          uploadImageToFirebase(uri, type);
        } else {
          console.log(`Failed to capture ${type} picture. URI is null.`);
        }
      } catch (error) {
        console.error(`Error taking ${type} picture:`, error);
      }
    } else {
      console.log(`Camera ref for ${type} is null.`);
    }
  };

  const uploadImageToFirebase = async (imageUri, type) => {
    console.log(`Uploading ${type} photo`);
    const imgRef = storageRef(storage, `EmergencyList/${user.uid}/${type}/${uuid.v4()}.jpeg`);
    fetch(imageUri)
      .then((response) => response.blob())
      .then((blob) => {
        const metadata = { contentType: "image/jpeg" };

        uploadBytes(imgRef, blob, metadata).then(() => {
          getDownloadURL(imgRef).then((res) => {
            console.log(`Image uploaded to Firebase (${type}):`, res);
          });
        });
      });
  };

  return (
    <View style={[styles.container, { backgroundColor: '#1b3a4f' }]}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          ref={(ref) => {
            backCameraRef.current = ref;
          }}
          type={Camera.Constants.Type.back} // Use the back camera
          ratio="4:6"
          onCameraReady={() => setCameraReady(true)}
        />
        <Camera
          style={styles.camera}
          ref={(ref) => {
            frontCameraRef.current = ref;
          }}
          type={Camera.Constants.Type.front} // Use the front camera
          ratio="4:6"
        />
      </View>
      <TouchableOpacity
        style={styles.captureButton}
        onPress={() => {
          takeBackPhotoAndUpload();
          takeFrontPhotoAndUpload();
        }}
      >
        <Text style={styles.captureButtonText}>
          Take Photos
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
    flexDirection: 'row',
  },
  camera: {
    flex: 1,
    aspectRatio: 2 / 3,
    margin: 15,
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

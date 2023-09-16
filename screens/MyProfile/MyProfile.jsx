import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { getAuth } from "firebase/auth";
import { db, storage } from "../../config/firebase";
import uuid from "react-native-uuid";
import { get, set, ref, onValue, update } from "@firebase/database";
import {
  getDownloadURL,
  uploadBytes,
  ref as storageRef,
} from "@firebase/storage";
import { useAuthentication } from "../../hooks/useAuthentication";
import * as ImagePicker from "expo-image-picker";

const auth = getAuth();

export default function MyProfile() {
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const { user } = useAuthentication();

  const uploadImage = () => {
    if (image === null) {
      return;
    }

    const imgRef = storageRef(storage, `ProfilePics/${uuid.v4()}.jpeg`);
    fetch(image)
      .then((response) => response.blob())
      .then((blob) => {
        const metadata = { contentType: "image/jpeg" };

        uploadBytes(imgRef, blob, metadata).then(() => {
          getDownloadURL(imgRef).then((res) => {
            setUploadedImageURL(res); // Store the uploaded image URL
            console.log(res);

            const userRef = ref(db, `users/${user.uid}`);
            update(userRef, { photoUrl: res });
            readUserData();
          });
        });
      });
  };
  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== "granted") {
      console.log("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    readUserData();
  }, []);

  const readUserData = () => {
    onValue(ref(db, `/users/${auth.currentUser.uid}`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUserData(data);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Welcome to your profile,{" "}
          <Text style={styles.nameColor}>
            {userData ? userData.username : "Loading..."}
          </Text>
        </Text>
      </View>

      

      <View style={styles.profileContainer}>
        {userData ? (
          <Image
            source={{ uri: userData.photoUrl }}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/fir-auth-fbaef.appspot.com/o/defaultImage.png?alt=media&token=8f2e90d4-7fc8-45f0-8696-dea85c2317fe",
            }}
            style={styles.profileImage}
          />
        )}
        <TouchableOpacity onPress={handleImagePicker}>
          <Text style={styles.Text}>Click to select an image</Text>
        </TouchableOpacity>

        <Button
          style={{ marginTop: 40 }}
          title="Upload Image"
          onPress={uploadImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nameColor: {
    color: "#E76C6C",
  },
  Text: {
    color: "white",
    fontSize: 16,
    margin: 5,
  },

  container: {
    flex: 1,
    backgroundColor: "#1b3a4f",
    alignItems: "center",
    paddingTop: 25,
  },
  header: {
    paddingTop: 20,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 45,
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, 
  },
});

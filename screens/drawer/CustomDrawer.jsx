import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { getAuth, signOut } from "firebase/auth";
import { Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { db } from "../../config/firebase";
import { ref, onValue } from "@firebase/database";

function CustomDrawerContent(props) {
  const auth = getAuth();

  const [photoUrl, setPhotoURL] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userData = ref(db, `users/${auth.currentUser.uid}`);

    onValue(userData, (snapshot) => {
      const data = snapshot.val();
      setPhotoURL(data.photoUrl);
      setUsername(data.username);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1b3a4f" }}>
      <DrawerContentScrollView {...props} style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => props.navigation.navigate("myprofile")}>
          <Image source={{ uri: photoUrl }} style={styles.userPhoto} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("myprofile")}>
          <Text style={[styles.buttonText, styles.margin]}>Welcome, <Text style={styles.username}>{username}</Text></Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <View>
            <View style={styles.buttonView}>
              <Entypo name="home" size={24} color="white" />
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate("home")}
              >
                <Text style={styles.buttonText}>Go Home</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonView}>
              <MaterialCommunityIcons
                name="face-man-profile"
                size={24}
                color="white"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate("myprofile")}
              >
                <Text style={styles.buttonText}>My Profile</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonView}>
              <MaterialCommunityIcons
                name="alarm-light"
                size={24}
                color="white"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate("LoudEmergencyConfig")}
              >
                <Text style={styles.buttonText}>Loud Emergency Config</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonView}>
              <MaterialCommunityIcons
                name="alarm-light-outline"
                size={24}
                color="white"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  props.navigation.navigate("SilentEmergencyConfig")
                }
              >
                <Text style={styles.buttonText}>Silent Emergency Config</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[styles.buttonView, styles.bottomAlign]}>
          <Feather name="log-out" size={24} color="white" />
          <TouchableOpacity
            style={styles.button}
            onPress={() => signOut(auth)}
          >
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    height: 180,
    flex:1
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    marginTop: 10,
    marginLeft: 10,
    padding: 10,
    width: "86%",
    flexDirection: "row",
  },
  buttonView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 75,
    margin: "auto",
    marginLeft: "28%",
    marginTop: "15%",
    marginBottom: "5%",
  },
  bottomAlign: {
    marginTop: "80%",
  },
  username: {
    color: "#E76C6C",
  },
  margin: {
    marginLeft: "25%",
    marginBottom: "15%",
  },
});

export default CustomDrawerContent;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
} from "react-native";
import { db } from "../../../config/firebase";
import { ref, onValue } from "@firebase/database";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { getAuth } from "firebase/auth";
import { getDatabase, child, get } from "firebase/database";

export default function IndividualChatNavbar({ navigation,targetUserUid }) {
  const auth = getAuth();
  const [targetUserData, setTargetUserData] = useState(null);

  useEffect(() => {
    readData();
  }, []);

  const readData = () => {
    const dbRef = ref(db);
    get(child(dbRef, `users/${targetUserUid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setTargetUserData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("conversations")}>
          <Text style={styles.navIcon}>{"<"}</Text>
        </TouchableOpacity>
        <View style={styles.userInfo}>
          {targetUserData && targetUserData.photoUrl ? (
            <Image
              source={{ uri: targetUserData.photoUrl }}
              style={styles.userImage}
            />
          ) : (
            <Image
              source={"https://firebasestorage.googleapis.com/v0/b/fir-auth-fbaef.appspot.com/o/defaultImage.png?alt=media&token=8f2e90d4-7fc8-45f0-8696-dea85c2317fe"} 
            />
          )}
          <Text style={styles.username}>
            {targetUserData ? targetUserData.username : ""}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
  },
  navIcon: {
    color: "white",
    fontSize: 24,
    marginRight: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: "white",
    fontSize: 16,
  },
});

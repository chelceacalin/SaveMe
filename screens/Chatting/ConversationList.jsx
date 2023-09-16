import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { db } from "../../config/firebase";
import { ref, onValue } from "@firebase/database";
import { useAuthentication } from "../../hooks/useAuthentication";
import { Searchbar } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";



const auth = getAuth();
export default function ConversationList({ navigation }) {
  const [userData, setUserData] = useState([]);
  const { user } = useAuthentication();
  const [searchQuery, setSearchQuery] = useState("");

  const filterData = (query) => {
    if (!userData) return [];
    return userData.filter(
      (user) =>
        user.username?.toLowerCase().includes(query.toLowerCase()) ||
        user.email?.toLowerCase().includes(query.toLowerCase())
    );
  };
  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    readData();
  }, []);

  const readData = () => {
    onValue(ref(db, "/users"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersArray = Object.values(data);
        let currentUserData = null;
  
        // Find and remove the current user's data from the array
        const filteredUsers = usersArray.filter((user) => {
          if (user.id === auth.currentUser.uid) {
            currentUserData = user;
            return false; // Exclude the current user
          }
          return true; // Include other users
        });
  
        // Insert the current user's data at the beginning of the array
        if (currentUserData) {
          setUserData([currentUserData, ...filteredUsers]);
        } else {
          setUserData(filteredUsers);
        }
      }
    });
  };
  

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          const targetUserUid = item.id;
          const currentUserId = user.uid;
          navigation.navigate("conversation", {
            targetUserUid,
            currentUserId,
            photoUrl: item.photoUrl,
          });
        }}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.photoUrl }} style={styles.avatar} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.prop}> {item.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchbar}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <FlatList
        data={filterData(searchQuery)}
        keyExtractor={(item) => item.email}
        renderItem={renderItem}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B394F",
    height: "100%",
  },
  prop: {
    color: "white",
    fontSize: 18,
  },
  title: {
    backgroundColor: "gray",
    padding: 10,
    marginTop: 15,
    color: "white",
    fontSize: 24,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
    fontSize: 18,
    color: "white",
  },
  prop: {
    fontSize: 16,
    marginTop: 2,
    color: "white",
  },
  searchbar: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
  },
});

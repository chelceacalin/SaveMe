import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { db } from "../../config/firebase";
import { ref, onValue } from "@firebase/database";
import { useAuthentication } from "../../hooks/useAuthentication";
import { Searchbar } from "react-native-paper";

export default function ConversationList({ navigation }) {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { user } = useAuthentication();
  const [searchQuery, setSearchQuery] = useState("");

  const filterData = (query) => {
    const filtered = userData.filter(
      (user) =>
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    filterData(query);
  };

  useEffect(() => {
    readData();
  }, []);

  const readData = () => {
    onValue(ref(db, "/users"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersArray = Object.values(data);
        setUserData(usersArray);
      }
    });
  };

  const Item = ({ id, username, email, photoUrl }) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          const targetUserUid = id;
          const currentUserId = user.uid;
          navigation.navigate("conversation", { targetUserUid, currentUserId });
        }}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: photoUrl }} style={styles.avatar} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.prop}> {email}</Text>
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
        data={filteredData.length > 0 ? filteredData : userData}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => <Item {...item} />}
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

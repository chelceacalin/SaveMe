import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";

function HomeNavbar({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { navigation.openDrawer(); }} style={styles.drawer}>
        <Entypo name="menu" size={48} color="white" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Save Me</Text>
      </View>
      <View style={styles.chatContainer}>
        <TouchableOpacity style={styles.chat} onPress={() => { navigation.navigate('conversations')}}>
          <AntDesign name="wechat" size={48} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  chatContainer: {
    flex: 1, 
    alignItems: 'flex-end', 
  },
  title: {
    color: '#E3D6B5',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
    marginTop: 15,
    backgroundColor: '#1B495I',
  },
  drawer: {
    marginLeft: 16,
  },
  chat: {
    alignItems: 'flex-end',
  },
});

export default HomeNavbar;

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthentication } from "../../hooks/useAuthentication";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  getLocationPermission,
  getUserLocation,
} from "../../services/location.service";
import { sendSMS } from "../../services/sms.service";
import ConversationList from "../Chatting/ConversationList";
import HomeNavbar from "./Navbar/HomeNavbar";
import { AntDesign } from "@expo/vector-icons";

const auth = getAuth();

export default function HomeScreen({ navigation }) {
  const [loudButtonPressed, setLoudButtonPressed] = useState(false);
  const [silentButtonPressed, setSilentButtonPressed] = useState(false);

  const quotes = [
    "Believe in yourself and all that you are.",
    "You are stronger than you think.",
    "Every day is a fresh start.",
    "Success begins with a single step.",
    "Inhale courage, exhale fear.",
    "You are capable of amazing things.",
    "Stay positive, work hard, make it happen.",
    "Your time is now.",
    "Embrace the journey, not just the destination.",
    "Dream big, work hard.",
    "The only limit is you.",
    "Every moment is a fresh beginning.",
    "You are the author of your story.",
    "Chase your dreams with determination.",
    "Happiness is a choice.",
    "Focus on the good.",
    "You are enough, just as you are.",
    "Keep going, you're getting there.",
    "Hard times may have held you down, but they will not last forever.",
    "Do something today that your future self will thank you for.",
    "The best way to predict the future is to create it.",
    "Be the reason someone smiles today.",
    "Success is not the key to happiness; happiness is the key to success.",
    "You are never too old to set another goal or to dream a new dream.",
    "The only way to do great work is to love what you do."
  ]
  
  const generateRandomNumber = () => {
    const min = 0;
    const max = 24;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  

  useEffect(() => {
    getLocationPermission();
  }, []);

  useEffect(() => {
    if (loudButtonPressed || silentButtonPressed) {
      const interval = setInterval(() => {
        getUserLocation().then((data) => {
          sendSMS({ latitude: data.latitude, longitude: data.longitude });
        });
      }, 20000);
      return () => clearInterval(interval);
    }
  }, [loudButtonPressed, silentButtonPressed]);

  const { user } = useAuthentication();

  function onPressLoudButton() {
    setLoudButtonPressed(!loudButtonPressed);
    setSilentButtonPressed(false);
  }

  function onPressSilentButton() {
    setSilentButtonPressed(!silentButtonPressed);
    setLoudButtonPressed(false);
  }

  return (
    <View style={styles.container}>
      <HomeNavbar navigation={navigation}  />
      <View style={styles.content}>
        <Text style={{color:'white', fontSize:20, fontWeight:'italic', marginBottom:70, width:'80%', alignSelf:'center'}}>"{quotes[generateRandomNumber()]}"</Text>
        <TouchableOpacity
          style={[styles.button, styles.loudButton]}
          onPress={onPressLoudButton}
        >
          <Text style={styles.emergency}>Emergency</Text>
          <Text style={styles.emergencyType}>LOUD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.silentButton]}
          onPress={onPressSilentButton}
        >
          <Text style={styles.emergency}>Emergency</Text>
          <Text style={styles.emergencyType}>SILENT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b3a4f",
  },
  content: {
    flex: 1, 
    alignItems: "center",
    marginTop:100
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    margin: 20,
    padding: 10,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    width: "75%",
  },
  loudButton: {
    backgroundColor: "#b63132",
  },
  silentButton: {
    backgroundColor: "#12438f",
  },
  emergency: {
    color: "white",
    marginRight: 10,
    fontSize: 20,
  },
  emergencyType: {
    color: "#ffba1e",
    fontSize: 20,
  },
});

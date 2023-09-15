import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set, push } from "@firebase/database";
import { db } from "../../config/firebase";

const auth = getAuth();

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  async function login() {
    if (email === "" || password === "") {
      setValidationMessage("Required fields missing");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setValidationMessage("");
    } catch (error) {
      setValidationMessage(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SAVE ME</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Email</Text>
        <Input
          placeholder="Email"
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon={<Icon name="envelope" size={16} />}
        />
        
        <Text style={styles.label}>Password</Text>
        <Input
          placeholder="Password"
          containerStyle={styles.inputContainer}
          inputStyle={[styles.input, styles.blackText]}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          leftIcon={<Icon name="key" size={16} />}
        />
        <Text style={styles.error}>{validationMessage}</Text>
  
        <Button
          title="Sign In"
          buttonStyle={styles.signInButton} 
          titleStyle={styles.signInButtonTitle} 
          onPress={login}
        />
        <View style={styles.accountYet}>
          <Text style={styles.label}>
            Don't have an account yet ?
            <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
              <Text style={styles.signUpLink}>Sign up here!</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.lifeMatters}>EVERY LIFE MATTERS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B394F",
    alignItems: "center",
    justifyContent: "space-between", 
    paddingBottom: 20, 
  },
  header: {
    marginTop: 20,
  },
  content: {
    width: "80%", // Adjust this width as needed
    paddingHorizontal: 20,
  },
  title: {
    color: "#FFC107",
    fontSize: 24,
    marginBottom: 40,
    marginTop: 40,
    fontWeight: "bold",
  },
  signUpLink: {
    color: "#FF3D00",
    fontSize: 15,
    marginTop: 20,
    fontWeight: "bold",
    paddingLeft: 15,
  },
  lifeMatters: {
    color: "#FFC107",
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputContainer: {
    marginTop: 10,
    backgroundColor: "white",
    width: "100%", // Use 100% to fill the container width
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  input: {
    color: "black",
    marginBottom: 10,
    fontSize: 16,
  },
  blackText: {
    color: "black",
  },
  signInButton: {
    marginTop: 20,
    backgroundColor: "#FFC107", 
    borderRadius: 10,
    paddingVertical: 15,
    width: "80%", // Adjust this width as needed
    alignSelf: "center", // Center the button horizontally
  },
  signInButtonTitle: {
    color: "#1B394F", 
    fontSize: 18, 
    fontWeight: "bold",
  },
  error: {
    marginTop: 10,
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
  accountYet: {
    marginTop: 20,
    flexDirection: "row", // Display "Don't have an account yet?" and "Sign up here!" in a row
    justifyContent: "center", // Center the content horizontally
  },
});

export default SignInScreen;

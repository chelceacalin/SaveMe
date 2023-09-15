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
      setValidationMessage("required fields missing");
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
        
        <Text style={styles.labelPass}>Password</Text>
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
        <View>
          <Text style={[styles.label,styles.accountYet]}>
            {" "}
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
  accountYet:{
      marginLeft:'40%'
  },
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
    width: "100%",
    paddingHorizontal: 20,
  },
  footer: {
    alignItems: "center", 
  },
  title: {
    color: "#FFC107",
    fontSize: 24,
    marginBottom: 40,
    marginTop:40,
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
    marginLeft:'38%',
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
  labelPass: {
    marginLeft:'38%',
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 15,
  },
  inputContainer: {
    marginTop: 10,
    margin:'auto',
    backgroundColor: "white",
    width: "25%", 
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
    width:'150px',
    marginLeft:'45%'
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
});

export default SignInScreen;

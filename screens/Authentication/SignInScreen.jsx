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
  const [validationMessage, setvalidationMessage] = useState("");

  async function login() {
    if (email === "" || password === "") {
      setvalidationMessage("required fields missing");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setEmail("");
      setPassword("");
      setvalidationMessage("");
    } catch (error) {
      setvalidationMessage(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Input
          placeholder="Email"
          containerStyle={{
            marginTop: 10,
            backgroundColor: "white",
            width: "auto",
          }}
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon={<Icon name="envelope" size={16} />}
        />

        <Input
          placeholder="Password"
          containerStyle={{
            marginTop: 10,
            backgroundColor: "white",
            width: "auto",
          }}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          leftIcon={<Icon name="key" size={16} />}
        />
        {<Text style={styles.error}>{validationMessage}</Text>}

        <Button
          title="Sign in"
          buttonStyle={{ marginTop: 10 }}
          onPress={login}
        />
        <View>
          <Text style={{ marginTop: 5, fontSize: 17, marginRight: 5 }}>
            {" "}
            Don't have an account yet ?
            <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
              <Text style={styles.SignUpHere}>Sign up here!</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SignUpHere: {
    color: "blue",
    fontSize: 15,
    marginTop: 20,
    fontWeight: "bold",
    margin: "auto",
    paddingLeft:15
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    bottom: 50,
  },
  error: {
    marginTop: 10,
    color: "red",
  },
});

export default SignInScreen;

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function SignInScreen({ setToken }) {
  // Ustates
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  // Constante
  const navigation = useNavigation();

  //  OnPress actions
  const handleSubmit = async () => {
    if (email && password) {
      console.log("on passe à la suite");

      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // console.log(response.data);
        if (response.data.token) {
          const userToken = response.data.token;
          setToken(userToken);
          console.log(userToken);
          alert("You are connected");
        } else {
          alert("An error occurred");
        }
      } catch (error) {
        if (error.response.status === 401) {
          alert("Email or password incorrect");
        }
        console.log(error.response.data.error);
        console.log(error.response.status);

        setErrorMessage(error.response.data.error);
      }
    } else {
      setErrorMessage("Please fill all fields 🙏");
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView style={styles.container}>
        {/* ----- HEADER ----- */}
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/images/logo.png")}
            resizeMode="contain"
          />
          <Text style={styles.textLogo}>Sign in</Text>
        </View>

        {/* ----- INPUT ----- */}
        <View>
          <TextInput
            onChangeText={(text) => {
              setEmail(text);
            }}
            keyboardType={"email-address"}
            placeholder="email"
            value={email}
            style={styles.input}
          />

          <TextInput
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
            placeholder="password"
            value={password}
            style={styles.input}
          />

          {/* ----- ERROR-MESSAGE ----- */}
          <Text style={styles.errorMessage}>{errorMessage}</Text>

          {/* ----- BUTTONS ----- */}
          <TouchableHighlight style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableHighlight>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.buttonlink}>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

// ------ STYLE ------ //

const styles = StyleSheet.create({
  // --- MAIN --- //
  container: {
    paddingTop: 30,
    paddingRight: 30,
    paddingBottom: 30,
    paddingLeft: 30,
  },

  // --- HEADER --- //
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 140,
  },
  logo: {
    height: 100,
    width: 100,
  },
  textLogo: {
    marginTop: 35,
    fontSize: 26,
    fontWeight: "600",
    color: "#757575",
  },

  // --- INPUT ---//

  input: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "400",
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#FCBCC3",
  },

  // --- BUTTONS --- //
  button: {
    alignItems: "center",
  },
  errorMessage: {
    color: "#FB9DA0",
    marginTop: 180,
    textAlign: "center",
    fontWeight: "500",
  },
  buttonText: {
    marginTop: 16,
    paddingVertical: 15,
    paddingHorizontal: 75,
    borderWidth: 3,
    borderColor: "#F9595E",
    borderRadius: 30,
    color: "#818181",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  buttonlink: {
    color: "#818181",
    textAlign: "center",
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 40,
  },
});

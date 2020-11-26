import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PasswordInputText from "react-native-hide-show-password-input";
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

// Import Components

export default function SignUpScreen(setToken) {
  // Ustates
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  // Constante
  const navigation = useNavigation();

  //  OnPress actions
  const handleSubmit = async () => {
    if (email && username && description && password && confirmPassword) {
      console.log("on passe à la suite");
      if (password === confirmPassword) {
        console.log("on passe à la suite 2");

        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email,
              username,
              description,
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
            alert("You are connected");
          } else {
            alert("An error occurred");
          }
        } catch (error) {
          if (error.response.status === 400) {
            alert(error.response.data.error);
          }
          // console.log(error.response.data.error);
          // console.log(error.response.status);

          setErrorMessage(error.response.data.error);
        }
      } else {
        setErrorMessage("Password are not the same 🤲");
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
          <Text style={styles.textLogo}>Sign up</Text>
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
              setUsername(text);
            }}
            placeholder="username"
            value={username}
            style={styles.input}
          />

          <TextInput
            onChangeText={(text) => {
              setDescription(text);
            }}
            multiline={true}
            numberOfLines={4}
            maxLength={150}
            value={description}
            style={styles.inputDescribe}
            placeholder="Describe yourself in few words..."
          />

          <PasswordInputText
            onChangeText={(text) => {
              setPassword(text);
            }}
            lineWidth={1}
            iconSize={20}
            value={password}
            style={styles.inputPassword}
          />

          <PasswordInputText
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            lineWidth={1}
            iconSize={20}
            label="Confirm password"
            value={confirmPassword}
            style={styles.inputPassword}
          />

          {/* ----- ERROR-MESSAGE ----- */}

          <Text style={styles.errorMessage}>{errorMessage}</Text>

          {/* ----- BUTTONS ----- */}
          <TouchableHighlight style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableHighlight>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.buttonLink}>
              Already have an account? Sign in
            </Text>
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
    marginBottom: 30,
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
  // inputPassword: {
  //   marginTop: 30,
  //   fontSize: 18,
  //   fontWeight: "400",
  // },
  inputDescribe: {
    marginTop: 80,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "400",
    width: "100%",
    paddingBottom: 5,
    borderWidth: 2,
    borderBottomColor: "#FCBEC4",
    borderTopColor: "#FCBEC4",
    borderRightColor: "#FCBEC4",
    borderLeftColor: "#FCBEC4",
    height: 100,
    paddingLeft: 10,
  },

  // --- BUTTONS --- //
  button: {
    alignItems: "center",
  },
  errorMessage: {
    color: "#FB9DA0",
    textAlign: "center",
    fontWeight: "500",
    marginTop: 40,
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
  buttonLink: {
    color: "#818181",
    textAlign: "center",
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 40,
  },
});

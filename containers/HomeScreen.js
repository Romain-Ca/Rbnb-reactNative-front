import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

import axios from "axios";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  View,
} from "react-native";

// Import Components
import HomeContainers from "../components/HomeContainer";

export default function HomeScreen({ navigation }) {
  // UseStates
  const [rooms, setRooms] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  // Requête Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(response.data);
        setRooms(response.data);
        setisLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View style={[styles.vertical, styles.horizontal]}>
      <ActivityIndicator size="large" color="#EB5A62" />
    </View>
  ) : (
    // ----- MAIN -----
    <SafeAreaView>
      <ScrollView>
        {/* ----- HEADER ---- */}
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/images/logo.png")}
            resizeMode="contain"
          />
        </View>

        {/* ----- CONTAINER ----- */}
        <FlatList
          style={styles.container}
          data={rooms}
          renderItem={({ item }) => {
            // console.log(item);
            return <HomeContainers item={item} />;
          }}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// Faire le style de la HeaderBar

// ------------------------//
// ----- STYLESHEET ----- //

const styles = StyleSheet.create({
  // --- Activity-Indicator //
  vertical: {
    flex: 1,
    justifyContent: "center",
    marginTop: 100,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },

  // --- MAIN --- //
  container: {
    paddingTop: 5,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
  },

  // --- HEADER --- //
  header: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.4,
    borderBottomColor: "grey",
  },
  logo: {
    height: 35,
    width: 35,
    marginBottom: 10,
  },
});

import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import {
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";

// Constante Dimensions
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ProfileScreen() {
  // UseStates
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState([]);

  // Ask permission to get user location
  useEffect(() => {
    const askPermissionAndGetLocation = async () => {
      const { status } = await Location.requestPermissionsAsync();
      //   console.log(status);
      // If status is granted
      if (status === "granted") {
        // We can get the user current position
        const location = await Location.getCurrentPositionAsync();
        // console.log(location);
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      }
    };

    askPermissionAndGetLocation();
  }, []);

  // And make an axios request
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${latitude}&longitude=${longitude}`
        );
        console.log(response.data);
        setLocation(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
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
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsUserLocation={true}
        >
          {/* We map on location */}
          {location.map((item, index) => {
            return (
              <MapView.Marker
                coordinate={{
                  latitude: item.location[1],
                  longitude: item.location[0],
                }}
              />
            );
          })}
        </MapView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 10,
  },
  // Map
  map: {
    width: width,
    height: height,
  },
});

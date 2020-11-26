import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/core";
import axios from "axios";
import SwiperFlatList from "react-native-swiper-flatlist";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// Constante Dimensions
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function RoomScreen() {
  // Ustates
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  // Constante
  const { params } = useRoute();
  const navigation = useNavigation();
  const id = params.id;
  const handlePress = () => {
    if (isPressed) {
      setIsPressed(false);
    } else {
      setIsPressed(true);
    }
  };
  // console.log(id);
  // console.log(rooms.location[0]);

  // Requête Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        // console.log(rooms.item.photos);
        setRooms(response.data);
        setIsLoading(false);
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
        {/* ----- PICTURE ----- */}
        <View style={styles.container}>
          <View style={styles.picture}>
            <SwiperFlatList
              autoplay
              autoplayDelay={2}
              autoplayLoop
              index={2}
              showPagination
              data={rooms.photos}
              renderItem={({ item }) => {
                // console.log(item);
                return (
                  <Image
                    style={styles.picture1}
                    source={{ uri: item.url }}
                    resizeMode="contain"
                  />
                );
              }}
              keyExtractor={(item) => item._id}
            />

            <Image
              source={{
                uri: rooms.photos[0].url,
              }}
            />

            <Text style={styles.price}>{rooms.price} €</Text>
          </View>
          {/* ----- DESCRIBE ----- */}
          <View style={styles.describe}>
            {/* ----- COL1 ----- */}
            <View style={styles.col1}>
              <Text numberOfLines={1} style={styles.text}>
                {rooms.title}
              </Text>
              <View style={styles.rate}>
                <Entypo
                  style={rooms.ratingValue >= 1 ? styles.starGold : styles.star}
                  name="star"
                  size={24}
                  color="black"
                />
                <Entypo
                  style={rooms.ratingValue >= 2 ? styles.starGold : styles.star}
                  name="star"
                  size={24}
                  color="black"
                />
                <Entypo
                  style={rooms.ratingValue >= 3 ? styles.starGold : styles.star}
                  name="star"
                  size={24}
                  color="black"
                />
                <Entypo
                  style={rooms.ratingValue >= 4 ? styles.starGold : styles.star}
                  name="star"
                  size={24}
                  color="black"
                />
                <Entypo
                  style={rooms.ratingValue >= 5 ? styles.starGold : styles.star}
                  name="star"
                  size={24}
                  color="black"
                />
                <Text style={styles.review}>{rooms.reviews} reviews</Text>
              </View>
            </View>

            {/* ----- COL2 ----- */}
            <View style={styles.col2}>
              <Image
                source={{
                  uri: rooms.user.account.photo.url,
                }}
                resizeMode="contain"
                style={styles.avatar}
              />
            </View>
          </View>

          {/* ----- DESCRIPTION ----- */}

          <View marginBottom={30}>
            {isPressed === false ? (
              <>
                <Text numberOfLines={3}>{rooms.description}</Text>
                <TouchableOpacity onPress={handlePress}>
                  <Text style={styles.Button}>Show more</Text>
                  <AntDesign name="caretdown" size={12} color={"grey"} />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text numberOfLines={20}>{rooms.description}</Text>

                <TouchableOpacity onPress={handlePress}>
                  <Text style={styles.Button}>Show less</Text>
                  <AntDesign name="caretup" size={12} color={"grey"} />
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* ----- MAP ----- */}
          {/* Ici on veut faire apparaître une map centré sur Paris */}
          {/* Puis on récupère rooms.location pour afficher la position marker de l'appartement*/}
          <MapView
            // La MapView doit obligatoirement avoir des dimensions style=
            style={styles.map}
            initialRegion={{
              latitude: 48.856614,
              longitude: 2.3522219,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}
          >
            <MapView.Marker
              coordinate={{
                longitude: rooms.location[0],
                latitude: rooms.location[1],
              }}
            />
          </MapView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  // --- PICTURE --- //
  picture: {
    position: "relative",
    marginBottom: 20,
  },
  picture1: {
    height: 250,
    width: 300,
  },
  price: {
    position: "absolute",
    left: 0.5,
    bottom: 20,
    backgroundColor: "black",
    color: "white",
    fontSize: 22,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 30,
    paddingLeft: 30,
  },

  // --- DESCRIBE --- //
  describe: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  //Col1
  col1: {
    width: "70%",
  },
  text: {
    fontSize: 20,
  },
  rate: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  star: {
    marginRight: 5,
    color: "lightgrey",
  },
  starGold: {
    marginRight: 5,
    color: "gold",
  },
  review: {
    color: "#BBBBBB",
    fontWeight: "600",
  },
  //Col2
  col2: {
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  // Description

  Button: {
    color: "#A1A1A1",
    fontWeight: "500",
    marginTop: 10,
  },

  // Map
  map: {
    width: width,
    height: 500,
  },
});

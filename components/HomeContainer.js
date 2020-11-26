import React from "react";
import { useNavigation } from "@react-navigation/core";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

function HomeContainers({ item }) {
  const id = item._id;
  // console.log(id);
  const navigation = useNavigation();
  return (
    <>
      {/* ----- PICTURE ----- */}
      <TouchableOpacity
        onPress={({ item }) => {
          navigation.navigate("Room", {
            id: id,
          });
        }}
      >
        <View style={styles.picture}>
          <Image
            style={styles.picture1}
            source={{
              uri: item.photos[0].url,
            }}
            resizeMode="contain"
          />
          <Text style={styles.price}>{item.price} €</Text>
        </View>
      </TouchableOpacity>

      {/* ----- DESCRIBE ----- */}
      <View style={styles.describe}>
        {/* ----- COL1 ----- */}
        <View style={styles.col1}>
          <Text numberOfLines={1} style={styles.text}>
            {item.title}
          </Text>
          <View style={styles.rate}>
            <Entypo
              style={item.ratingValue >= 1 ? styles.starGold : styles.star}
              name="star"
              size={24}
              color="black"
            />
            <Entypo
              style={item.ratingValue >= 2 ? styles.starGold : styles.star}
              name="star"
              size={24}
              color="black"
            />
            <Entypo
              style={item.ratingValue >= 3 ? styles.starGold : styles.star}
              name="star"
              size={24}
              color="black"
            />
            <Entypo
              style={item.ratingValue >= 4 ? styles.starGold : styles.star}
              name="star"
              size={24}
              color="black"
            />
            <Entypo
              style={item.ratingValue >= 5 ? styles.starGold : styles.star}
              name="star"
              size={24}
              color="black"
            />
            <Text style={styles.review}>{item.reviews} reviews</Text>
          </View>
        </View>

        {/* ----- COL2 ----- */}
        <View style={styles.col2}>
          <Image
            source={{
              uri: item.user.account.photo.url,
            }}
            resizeMode="contain"
            style={styles.avatar}
          />
        </View>
      </View>
    </>
  );
}
export default HomeContainers;

// ----- STYLESHEET ----- //

const styles = StyleSheet.create({
  // --- PICTURE --- //
  picture: {
    position: "relative",
    marginBottom: 20,
  },
  picture1: {
    height: 250,
    width: "100%",
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
});

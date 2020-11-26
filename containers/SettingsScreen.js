import React from "react";
import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default function SettingsScreen({ setToken }) {
  return (
    <View>
      <Text>Hello Settings</Text>

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}

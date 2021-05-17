import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

const StartupScreen = (props) => {
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await SecureStore.getItemAsync("userData");
      if (!userData) {
        props.navigation.navigate("Authenticate");
        return;
      }
      const transformedData = JSON.parse(userData);
    };
    tryLogin();
  }, []);
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="#001b3a" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;

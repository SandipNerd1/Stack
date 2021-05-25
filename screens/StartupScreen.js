import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const StartupScreen = (props) => {

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

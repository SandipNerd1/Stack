import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const CustomButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onSubmit}>
      <View style={styles.buttonContainer}>{props.children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ff4848",
    width: 40,
    height: 40,
    borderRadius: 15,
    justifyContent: "center",
    elevation: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default CustomButton;

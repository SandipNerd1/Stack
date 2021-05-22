import React from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const AuthenticateInput = (props) => {
  return (
    <View style={styles.form}>
      <Text style={styles.label}>{props.title}</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name={props.iconName}
          style={{ width: "10%", textAlign: "center" }}
          size={17}
          color="#888"
        />
        <TextInput
          style={styles.input}
          {...props}
          placeholderTextColor="#ccc"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: "#cfd8dd",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
  },
  input: {
    width: "90%",
    paddingVertical: 7,
    paddingHorizontal: 3,
  },
  label: {
    marginVertical: 3,
    color: "#888",
    fontWeight: "bold",
  },
  form: {
    marginTop: SCREEN_HEIGHT / 60,
  },
});

export default AuthenticateInput;

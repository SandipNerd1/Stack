import React from "react";
import {
  Image,
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

const AuthenticateButton = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.onSocialButtonPress}>
      <View
        style={
          props.iconName === "google"
            ? styles.googlebuttonContainer
            : styles.facbookbuttonContainer
        }
      >
        <View style={styles.icon}>
          {props.iconName === "google" ? (
            <Image
              source={require("../../assets/logo/icons8-google-48.png")}
              style={styles.logo}
            />
          ) : (
            <FontAwesome5 name={props.iconName} size={20} color="white" />
          )}
        </View>

        <Text
          style={{
            width: "85%",
            textAlign: "center",
            color: props.iconName === "google" ? "#708999" : "white",
            paddingVertical: 13,
            fontFamily: "AvertaStd-Semibold",
          }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  googlebuttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#708999",
  },
  facbookbuttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: "#3b5998",
  },
  icon: {
    width: "15%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRightColor: "#708999",
    borderRightWidth: 1,
  },
  logo: {
    width: 25,
    height: 25,
  },
});

export default AuthenticateButton;

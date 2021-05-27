import React from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  Dimensions,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const RippleEffectButton = (props) => {
  return (
    <TouchableNativeFeedback
      disabled={props.disabled}
      onPress={props.onButtonPress}
    >
      <View style={styles.button}>
        <Text style={{ color: "white", fontFamily: "AvertaStd-Semibold" }}>
          {props.title}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff4848",
    marginVertical: SCREEN_HEIGHT / 30,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 5,
  },
});

export default RippleEffectButton;

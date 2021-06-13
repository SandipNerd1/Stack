import React from "react";
import { TouchableNativeFeedback } from "react-native";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const ResetPasswordScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text
        style={{
          fontSize: 25,
          fontFamily: "AvertaStd-Semibold",
          color: "#001b3a",
        }}
      >
        Reset Password
      </Text>
      <Text
        style={{
          marginVertical: 10,
          fontFamily: "AvertaStd-Regular",
          color: "#708999",
        }}
      >
        Enter the email associated with your account and we'll send an email
        witn instruction to reset your password
      </Text>
      <View style={styles.formContainer}>
        <Text style={{ fontFamily: "AvertaStd-Semibold", color: "#001b3a" }}>
          Email
        </Text>
        <TextInput style={styles.input} />
        <TouchableNativeFeedback>
          <View style={styles.buttonContainer}>
            <Text style={{ color: "white", fontFamily: "AvertaStd-Semibold" }}>
              Send instructions
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 50,
    paddingHorizontal: SCREEN_WIDTH / 20,
  },
  formContainer: {
    marginVertical: SCREEN_HEIGHT / 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#708999",
    paddingVertical: 5,
    paddingHorizontal: SCREEN_WIDTH / 30,
    marginVertical: SCREEN_HEIGHT / 60,
    borderRadius: 10,
  },
  buttonContainer: {
    backgroundColor: "#ff4848",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SCREEN_HEIGHT / 60,
    marginVertical: SCREEN_HEIGHT / 60,
    borderRadius: 10,
  },
});

export default ResetPasswordScreen;

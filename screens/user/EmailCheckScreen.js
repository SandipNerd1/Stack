import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
} from "react-native";
import * as Linking from 'expo-linking';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const EmailCheckScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.mailContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="email-newsletter"
            size={70}
            color="#ff4848"
          />
        </View>
        <Text style={styles.mailText}>Check your mail</Text>
        <Text style={styles.passwordText}>
          We have sent password recover instructions to your mail.
        </Text>
        <TouchableNativeFeedback onPress={() => Linking.openURL('mailto:PocketStack@outlook.com')}>
          <View style={styles.buttonContainer}>
            <Text style={{ color: "white", fontFamily: "AvertaStd-Semibold" }}>
              Open email app
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableOpacity onPress={() => props.navigation.navigate("Sign In")}>
          <View>
            <Text
              style={{
                color: "#708999",
                fontFamily: "AvertaStd-Semibold",
              }}
            >
              Skip, I'll confirm later
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          bottom: SCREEN_HEIGHT / 10,
        }}
      >
        <Text style={{ fontFamily: "AvertaStd-Semibold", color: "#708999" }}>
          Did not receive the email? Check your spam filter.
        </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Reset Password")}>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{ color: "#ff4848", fontFamily: "AvertaStd-Semibold" }}
            >
              Try with another email
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: SCREEN_WIDTH / 20,
  },
  mailContainer: {
    marginVertical: SCREEN_HEIGHT / 10,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#fdf4f4",
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  mailText: {
    fontFamily: "AvertaStd-Semibold",
    fontSize: 25,
    marginVertical: SCREEN_HEIGHT / 40,
    color: "#001b3a",
  },
  passwordText: {
    fontFamily: "AvertaStd-Semibold",
    color: "#708999",
    textAlign: "center",
    marginHorizontal: SCREEN_WIDTH / 20,
  },
  buttonContainer: {
    backgroundColor: "#ff4848",
    paddingVertical: 10,
    paddingHorizontal: SCREEN_WIDTH / 10,
    marginVertical: SCREEN_HEIGHT / 30,
    borderRadius: 10,
  },
});

export default EmailCheckScreen;

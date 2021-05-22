import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import RippleEffectButton from "../../components/UI/RippleEffectButton";
import AuthenticateInput from "../../components/UI/AuthenticateInput";
import AuthenticateButton from "../../components/UI/AuthenticateButton";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const NewSignInScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.headerText}>Sign In</Text>
      <View style={styles.formContainer}>
        <AuthenticateInput
          title="Email"
          iconName="email"
          placeholder="Enter your email"
        />

        <AuthenticateInput
          title="Password"
          iconName="lock"
          placeholder="Enter your password"
          textContentType="password"
        />
        <RippleEffectButton title="Sign in" />
        <TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              color: "#ff4848",
              fontWeight: "bold",
            }}
          >
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 30,
            marginBottom: 20,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "#888" }} />
          <View>
            <Text style={{ width: 50, textAlign: "center", color: "#888" }}>
              OR
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "#888" }} />
        </View>
        <AuthenticateButton title="Sign in with Google" iconName="google" />
        <AuthenticateButton title="Sign in with Facebook" iconName="facebook" />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SCREEN_HEIGHT / 20,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#888" }}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text
              style={{
                color: "#ff4848",
                fontWeight: "bold",
                marginHorizontal: SCREEN_WIDTH / 30,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: SCREEN_HEIGHT / 10,
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "#001b3a",
  },
  formContainer: {
    paddingHorizontal: SCREEN_WIDTH / 20,
  },
});

export default NewSignInScreen;

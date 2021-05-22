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

const NewSignUpScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.headerText}>Sign up</Text>
      <View style={styles.formContainer}>
        <AuthenticateInput
          title="Username"
          iconName="person"
          placeholder="Enter your username"
        />
        <AuthenticateInput
          title="Email"
          iconName="email"
          placeholder="Enter your email"
        />
        <AuthenticateInput
          title="Password"
          iconName="lock"
          placeholder="Enter your password"
        />
        <AuthenticateInput
          title="Confirm Password"
          iconName="lock-outline"
          placeholder="Confirm your password"
        />
        <RippleEffectButton title="Sign up" />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
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
            marginTop: 20,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#888" }}>Already have an account?</Text>
          <TouchableOpacity>
            <Text
              style={{
                color: "#ff4848",
                fontWeight: "bold",
                marginHorizontal: 10,
              }}
            >
              Sign In
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
    paddingTop: "15%",
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

export default NewSignUpScreen;

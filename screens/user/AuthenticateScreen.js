import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";

const AuthenticateScreen = (props) => {
  const [showSignIn, setShowSignIn] = useState(false);
  return (
    <View style={styles.screen}>
      <View style={styles.signUpForm}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Sign up start Learning</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput style={styles.input} placeholder="username" />
          <TextInput style={styles.input} placeholder="Email" />
          <TextInput style={styles.input} placeholder="password" />
          <TextInput style={styles.input} placeholder="Confirm password" />
        </View>
        <View style={styles.submitContainer}>
          <Text style={styles.signUpText}>Sign up</Text>
          <View
            style={{
              width: 55,
              height: 55,
              borderRadius: 30,
              overflow: "hidden",
            }}
          >
            <TouchableNativeFeedback>
              <View style={styles.buttonContainer}>
                <AntDesign name="right" color="white" size={20} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <TouchableOpacity
          style={styles.signInContainer}
          onPress={() => {
            setShowSignIn(!showSignIn);
          }}
        >
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showSignIn}
        animationType="slide"
        statusBarTranslucent={true}
        transparent={true}
      >
        <View style={{ flex: 1, backgroundColor: null }}>
          <View style={styles.signInFormContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                setShowSignIn(!showSignIn);
              }}
            >
              <View style={styles.cancelButton}>
                <Entypo name="cross" size={20} color="#949494" />
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.signInHeaderText}>Welcome Back</Text>
            <TextInput style={styles.input} placeholder="Email address" />
            <TextInput style={styles.input} placeholder="password" />
            <View style={styles.submitContainer}>
              <Text style={styles.signUpText}>Sign In</Text>
              <View
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 30,
                  overflow: "hidden",
                }}
              >
                <TouchableNativeFeedback>
                  <View style={styles.buttonContainer}>
                    <AntDesign name="right" color="white" size={20} />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
            <View style={styles.otherSignIn}>
              <View style={styles.otherSignInContainer}>
                <AntDesign name="google" size={30} color="#4885ed" />
              </View>
              <View style={styles.otherSignInContainer}>
                <Entypo name="facebook-with-circle" size={30} color="#4267b2" />
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <TouchableOpacity>
                <Text
                  style={{
                    color: "black",
                    textDecorationLine: "underline",
                    fontFamily: "nunito-bold",
                    fontSize: 16,
                  }}
                >
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 50,
    backgroundColor: "#152238",
  },
  signUpForm: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    paddingVertical: 20,
  },
  headerText: {
    fontFamily: "nunito-extrabold",
    fontSize: 35,
    color: "#001b3a",
  },
  formContainer: {},
  input: {
    paddingVertical: 5,
    borderBottomColor: "#e0e6e9",
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  submitContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  buttonContainer: {
    backgroundColor: "#ff4848",
    width: 55,
    height: 55,
    padding: 10,
    borderRadius: 30,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontFamily: "nunito-bold",
    fontSize: 20,
    color: "#001b3a",
  },
  signInContainer: {
    marginVertical: 20,
  },
  signInText: {
    fontFamily: "nunito-bold",
    textDecorationLine: "underline",
    fontSize: 17,
  },
  signInHeaderText: {
    fontFamily: "nunito-extrabold",
    fontSize: 50,
    color: "#001b3a",
    paddingVertical: 10,
  },
  signInFormContainer: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "white",
    padding: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  cancelButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e6e9",
    justifyContent: "center",
    alignItems: "center",
  },
  otherSignInContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
    borderColor: "#949494",
  },
  otherSignIn: {
    paddingHorizontal: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
  },
});

export default AuthenticateScreen;

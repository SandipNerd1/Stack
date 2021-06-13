import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const CreateNewPasswordScreen = ({ route }) => {
  const { uid, token } = route.params;

  return (
    <View style={styles.screen}>
      <Text style={styles.headerText}>Create new password</Text>
      <Text style={styles.text}>
        Your new password must be different from previously used password
      </Text>
      <View style={styles.formContainer}>
        <View style={styles.field}>
          <Text style={styles.formHeaderText}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            placeholderTextColor="#cfd8dd"
          />
          <Text style={styles.reminderText}>uid: {uid}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.formHeaderText}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            placeholderTextColor="#cfd8dd"
          />
          <Text style={styles.reminderText}>token: {token}</Text>
        </View>
      </View>
      <TouchableNativeFeedback>
        <View style={styles.buttonContainer}>
          <Text style={{ fontFamily: "AvertaStd-Semibold", color: "white" }}>
            Reset password
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: SCREEN_HEIGHT / 10,
    paddingHorizontal: SCREEN_WIDTH / 20,
  },
  headerText: {
    fontFamily: "AvertaStd-Semibold",
    fontSize: 25,
    color: "#001b3a",
  },
  text: {
    fontFamily: "AvertaStd-Semibold",
    color: "#708999",
    marginTop: SCREEN_HEIGHT / 60,
  },
  formContainer: {
    marginVertical: SCREEN_HEIGHT / 40,
  },
  field: {
    marginVertical: SCREEN_HEIGHT / 60,
  },
  input: {
    borderWidth: 1,
    borderColor: "#708999",
    paddingVertical: 5,
    paddingHorizontal: SCREEN_WIDTH / 30,
    borderRadius: 10,
    marginVertical: SCREEN_HEIGHT / 70,
  },
  formHeaderText: {
    fontFamily: "AvertaStd-Semibold",
    color: "#001b3a",
  },
  reminderText: {
    fontFamily: "AvertaStd-Regular",
    color: "#708999",
    fontSize: 13,
  },
  buttonContainer: {
    backgroundColor: "#ff4848",
    paddingVertical: SCREEN_HEIGHT / 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default CreateNewPasswordScreen;

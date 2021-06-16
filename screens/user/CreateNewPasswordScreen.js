import React, { useState } from "react";
import {
  Alert,
  ActivityIndicator,
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { passwordResetConfirm } from "../../store/actions/user";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const passwordResetConfirmValidationSchema = yup.object().shape({
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const CreateNewPasswordScreen = ({ route, navigation }) => {
  const { token } = route.params;
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.screen}>
      <Modal
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
        animationType="fade"
      >
        <View
          style={{
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#43516c" />
        </View>
      </Modal>
      <Text style={styles.headerText}>Create new password</Text>
      <Text style={styles.text}>
        Your new password must be different from previously used password
      </Text>
      <Formik
        validationSchema={passwordResetConfirmValidationSchema}
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async ({ password, confirmPassword }) => {
          try {
            setModalVisible(true);
            await dispatch(
              passwordResetConfirm({
                password: password,
                confirmPassword: confirmPassword,
                token: token,
              })
            );
            setModalVisible(false);
            Alert.alert("Password reset successful", "Try logging in with new password.");
            navigation.navigate("Sign In");
          } catch (error) {
            setModalVisible(false);
            Alert.alert('Password Reset Failed', 'Something went wrong! Try again later.');
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <>
            <View style={styles.formContainer}>
              <View style={styles.field}>
                <Text style={styles.formHeaderText}>Password</Text>
                <TextInput
                  name="password"
                  style={styles.input}
                  placeholder="Enter new password"
                  placeholderTextColor="#cfd8dd"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                />
                {(errors.password && touched.password) &&
                  <Text style={{ marginHorizontal: 5, fontFamily: 'AvertaStd-Regular', fontSize: 10, color: 'red' }}>{errors.password}</Text>
                }
                {/* <Text style={styles.reminderText}>uid: {uid}</Text> */}
              </View>
              <View style={styles.field}>
                <Text style={styles.formHeaderText}>Confirm Password</Text>
                <TextInput
                  name="confirmPassword"
                  style={styles.input}
                  placeholder="Confirm new password"
                  placeholderTextColor="#cfd8dd"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry
                />
                {(errors.confirmPassword && touched.confirmPassword) &&
                  <Text style={{ marginHorizontal: 5, fontFamily: 'AvertaStd-Regular', fontSize: 10, color: 'red' }}>{errors.confirmPassword}</Text>
                }
                {/* <Text style={styles.reminderText}>token: {token}</Text> */}
              </View>
            </View>
            <TouchableNativeFeedback onPress={handleSubmit} disabled={!isValid}>
              <View style={styles.buttonContainer}>
                <Text style={{ fontFamily: "AvertaStd-Semibold", color: "white" }}>
                  Reset password
                </Text>
              </View>
            </TouchableNativeFeedback>
          </>
        )}
      </Formik>
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
    fontFamily: "AvertaStd-Regular",
    borderWidth: 1,
    borderColor: "#708999",
    paddingVertical: 5,
    paddingHorizontal: SCREEN_WIDTH / 30,
    borderRadius: 10,
    marginVertical: SCREEN_HEIGHT / 70,
    marginBottom: 5,
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

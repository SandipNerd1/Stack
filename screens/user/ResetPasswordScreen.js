import React, { useState } from "react";
import { TouchableNativeFeedback } from "react-native";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";

import { passwordReset } from "../../store/actions/user";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const passwordResetValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is required"),
});

const ResetPasswordScreen = (props) => {
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
        with instructions to reset your password.
      </Text>
      <Formik
        validationSchema={passwordResetValidationSchema}
        initialValues={{
          email: "",
        }}
        onSubmit={async ({ email }) => {
          console.log(email)
          try {
            setModalVisible(true);
            await dispatch(passwordReset({ email: email }));
            setModalVisible(false);
            props.navigation.navigate("Email Check");
          } catch (error) {
            setModalVisible(false);
            // console.log(error.response.data);
            if (error.response.data.email) {
              Alert.alert('Password Reset Failed', error.response.data.email[0]);
            } else {
              Alert.alert('Password Reset Failed', 'Something went wrong! Try again later.');
            }
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <View style={styles.formContainer}>
            <Text style={{ fontFamily: "AvertaStd-Semibold", color: "#001b3a" }}>
              Email
            </Text>
            <TextInput
              name="email"
              placeholder="Enter your email-address"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {(errors.email && touched.email) &&
              <Text style={{ marginHorizontal: 5, fontFamily: 'AvertaStd-Regular', fontSize: 10, color: 'red' }}>{errors.email}</Text>
            }
            <TouchableNativeFeedback onPress={handleSubmit} disabled={!isValid}>
              <View style={styles.buttonContainer}>
                <Text style={{ color: "white", fontFamily: "AvertaStd-Semibold" }}>
                  Send instructions
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        )}
      </Formik>
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
    fontFamily: "AvertaStd-Regular",
    borderWidth: 1,
    borderColor: "#708999",
    paddingVertical: 5,
    paddingHorizontal: SCREEN_WIDTH / 30,
    marginVertical: SCREEN_HEIGHT / 60,
    marginBottom: 5,
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

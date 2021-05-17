import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from 'react-redux';
import { SocialIcon } from 'react-native-elements';
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Formik, Field } from 'formik';
import * as yup from 'yup';

import CustomInput from '../../components/UI/CustomInput';
import { login } from '../../store/actions/signin';
import { facebookSignUp, googleSignUp, register } from '../../store/actions/signup';


const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .required('Password is required'),
})

const signUpValidationSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/, "Please enter valid username")
    .required('Username is required'),
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
})


const AuthenticateScreen = (props) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#43516c" />
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <View style={styles.signUpForm}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Sign up start Learning</Text>
        </View>
        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={({ username, email, password, confirmPassword }) => {
            dispatch(register({
              'username': username,
              'email': email,
              'password': password,
              'confirmPassword': confirmPassword
            }))
          }}
        >
          {({ handleSubmit, isValid }) => (
            <>
              <Field
                component={CustomInput}
                name="username"
                placeholder="Username"
              />
              <Field
                component={CustomInput}
                name="email"
                placeholder="Email Address"
                keyboardType="email-address"
              />
              <Field
                component={CustomInput}
                name="password"
                placeholder="Password"
                secureTextEntry
              />
              <Field
                component={CustomInput}
                name="confirmPassword"
                placeholder="Confirm Password"
                secureTextEntry
              />
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
                  <TouchableNativeFeedback
                    disabled={!isValid}
                    onPress={handleSubmit}
                  >
                    <View style={styles.buttonContainer}>
                      <AntDesign name="right" color="white" size={20} />
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            </>
          )}
        </Formik>
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
            <Text style={styles.signInHeaderText}>
              Welcome Back
            </Text>
            <Formik
              validationSchema={signInValidationSchema}
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={async ({ email, password }) => {
                setLoading(true);
                try {
                  await dispatch(login({
                    'email': email,
                    'password': password,
                  }));
                } catch (error) {
                  Alert.alert("Login Failed", error.response.data.non_field_errors[0]);
                }
                setShowSignIn(false);
                setLoading(false);
              }}
            >
              {({ handleSubmit, isValid }) => (
                <>
                  <Field
                    component={CustomInput}
                    name="email"
                    placeholder="Email Address"
                    keyboardType="email-address"
                  />
                  <Field
                    component={CustomInput}
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                  />
                  <View style={styles.submitContainer}>
                    <Text style={styles.signUpText}>
                      Sign In
                    </Text>
                    <View
                      style={{
                        width: 55,
                        height: 55,
                        borderRadius: 30,
                        overflow: "hidden",
                      }}
                    >
                      <TouchableNativeFeedback
                        disabled={!isValid}
                        onPress={handleSubmit}
                      >
                        <View style={styles.buttonContainer}>
                          <AntDesign name="right" color="white" size={20} />
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                  </View>
                </>
              )}
            </Formik>
            <View style={styles.otherSignIn}>
              <View style={styles.otherSignInContainer}>
                <SocialIcon
                  type="google"
                  onPress={async () => {
                    setLoading(true);
                    try {
                      await dispatch(googleSignUp());
                    } catch (error) {
                      console.log(error);
                    }
                    // setShowSignIn(false);
                    setLoading(false);
                  }}
                  light
                />
              </View>
              <View style={styles.otherSignInContainer}>
                <SocialIcon
                  type="facebook"
                  onPress={() => {
                    dispatch(facebookSignUp());
                  }}
                  light
                />
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <TouchableOpacity>
                <Text
                  style={{
                    color: "black",
                    textDecorationLine: "underline",
                    fontFamily: "AvertaStd-Semibold",
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
    fontFamily: "AvertaStd-Semibold",
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
    fontFamily: "AvertaStd-Semibold",
    fontSize: 20,
    color: "#001b3a",
  },
  signInContainer: {
    marginVertical: 20,
  },
  signInText: {
    fontFamily: "AvertaStd-Semibold",
    textDecorationLine: "underline",
    fontSize: 17,
  },
  signInHeaderText: {
    fontFamily: "AvertaStd-Semibold",
    fontSize: 51,
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
    padding: 10,
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

import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { Formik, Field } from "formik";
import * as yup from "yup";

import {
  facebookSignUp,
  googleSignUp,
  register,
} from "../../store/actions/signup";

import RippleEffectButton from "../../components/UI/RippleEffectButton";
import AuthenticateInput from "../../components/UI/AuthenticateInput";
import AuthenticateButton from "../../components/UI/AuthenticateButton";
import StartupScreen from "../StartupScreen";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const signUpValidationSchema = yup.object().shape({
  username: yup
    .string()
    .matches(
      /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/,
      "Please enter valid username"
    )
    .required("Username is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
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

const NewSignUpScreen = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <StartupScreen />;
  }

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headerText}>Sign up</Text>
        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async ({ username, email, password, confirmPassword }) => {
            setLoading(true);
            try {
              await dispatch(
                register({
                  username: username,
                  email: email,
                  password: password,
                  confirmPassword: confirmPassword,
                })
              );
              props.navigation.navigate("Sign In");
            } catch (error) {
              // Alert.alert("Sign Up Failed", error.response.data.non_field_errors[0]);
              // console.log(error.response);
              if (error.response.data.email) {
                Alert.alert("Sign Up Failed", error.response.data.email[0]);
              } else if (error.response.data.username) {
                Alert.alert("Sign Up Failed", error.response.data.username[0]);
              }
            }
            setLoading(false);
          }}
        >
          {({ handleSubmit, isValid }) => (
            <View style={styles.formContainer}>
              <Field
                component={AuthenticateInput}
                name="username"
                title="Username"
                iconName="person"
                placeholder="Enter your username"
              />
              <Field
                component={AuthenticateInput}
                name="email"
                title="Email"
                iconName="email"
                placeholder="Enter your email"
                keyboardType="email-address"
              />
              <Field
                component={AuthenticateInput}
                name="password"
                title="Password"
                iconName="lock"
                placeholder="Enter your password"
                secureTextEntry
              />
              <Field
                component={AuthenticateInput}
                name="confirmPassword"
                title="Confirm Password"
                iconName="lock-outline"
                placeholder="Confirm your password"
                secureTextEntry
              />
              <RippleEffectButton
                title="Sign up"
                onButtonPress={handleSubmit}
                disabled={!isValid}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <View style={{ flex: 1, height: 1, backgroundColor: "#888" }} />
                <View>
                  <Text
                    style={{ width: 50, textAlign: "center", color: "#888" }}
                  >
                    OR
                  </Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: "#888" }} />
              </View>
              <AuthenticateButton
                title="Sign up with Google"
                iconName="google"
                onSocialButtonPress={async () => {
                  setLoading(true);
                  try {
                    await dispatch(googleSignUp());
                  } catch (error) {
                    Alert.alert("Google Login Failed");
                  }
                  setTimeout(() => {
                    setLoading(false);
                  }, 4000);
                }}
              />
              <AuthenticateButton
                title="Sign up with Facebook"
                iconName="facebook"
                onSocialButtonPress={async () => {
                  setLoading(true);
                  try {
                    await dispatch(facebookSignUp());
                  } catch (error) {
                    Alert.alert("Facebook Login Failed");
                  }
                  setTimeout(() => {
                    setLoading(false);
                  }, 5000);
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 20,
                  justifyContent: "center",
                  marginBottom: "15%",
                }}
              >
                <Text style={{ color: "#888" }}>Already have an account?</Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Sign In")}
                >
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
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerText: {
    paddingTop: "15%",
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

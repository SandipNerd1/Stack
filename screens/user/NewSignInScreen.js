import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

import { login } from '../../store/actions/signin';
import { facebookSignUp, googleSignUp } from '../../store/actions/signup';

import RippleEffectButton from "../../components/UI/RippleEffectButton";
import AuthenticateInput from "../../components/UI/AuthenticateInput";
import AuthenticateButton from "../../components/UI/AuthenticateButton";
import AuthenticateScreen from "./Authenticate";
import StartupScreen from '../StartupScreen';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .required('Password is required'),
})


const NewSignInScreen = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <StartupScreen />
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.headerText}>Sign In</Text>
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
          setLoading(false);
        }}
      >
        {({ handleSubmit, isValid }) => (
          <View style={styles.formContainer}>
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
              textContentType="password"
            />
            <RippleEffectButton title="Sign in" onButtonPress={handleSubmit} disabled={!isValid} />
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
            <AuthenticateButton
              title="Sign in with Google"
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
              title="Sign in with Facebook"
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
                marginTop: SCREEN_HEIGHT / 20,
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#888" }}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => props.navigation.navigate("Sign Up")}>
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
        )}
      </Formik>
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

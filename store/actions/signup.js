import { Alert } from "react-native";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

import {
  setLoginLocal,
  setAuthHeader,
  removeLoginLocal,
  removeAuthHeader,
  setSocialLoginLocal,
  config,
} from "../helpers/helper";
import { SET_LOGIN_STATE } from "./signin";
import axiosInstance from "../../api/axiosApi";

export const SET_SOCIAL_DATA = "SET_SOCIAL_DATA";

export const register =
  ({ username, email, password, confirmPassword }) =>
  async (dispatch) => {
    try {
      console.log("waiting");
      const response = await axiosInstance.post("/auth/registration/", {
        username: username,
        email: email,
        password1: password,
        password2: confirmPassword,
      });
      console.log(response.status);
      if (!(response.status === 201)) {
        throw new Error("Login status code not 200");
      }

      const resData = await response.data;
      console.log("Account created", resData);
      Alert.alert("Account created successfully", resData.detail);
    } catch (error) {
      throw error;
    }
  };

export const facebookSignUp = () => async (dispatch) => {
  try {
    await Facebook.initializeAsync({
      appId: "878171319396080",
    });
    const { type, token, expires, permissions, declinedPermissions } =
      await Facebook.logInWithReadPermissionsAsync({
        permissions: ["email", "public_profile"],
      });
    if (type === "success") {
      console.log("inside success", type);
      // create Facebook user in database
      async function createFBUser() {
        try {
          console.log("inside createFBUser", token);
          const response = await axiosInstance.post("/auth/social/facebook/", {
            access_token: token,
          });
          const resData = await response.data;
          console.log("resData: ", resData);

          const secureStorageData = { userToken: resData.key };
          setLoginLocal(secureStorageData);

          setAuthHeader(resData.key);

          dispatch({
            type: SET_LOGIN_STATE,
            userToken: resData.key,
          });
        } catch (error) {
          Alert.alert(
            "Facebook Login Failed",
            error.response.data.non_field_errors[0]
          );
        }
      }
      createFBUser();

      // Get the user's name using Facebook's Graph API
      fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("inside Facebook graph", data);
          const secureStorageSocialData = { socialData: data };
          setSocialLoginLocal(secureStorageSocialData);

          dispatch({
            type: SET_SOCIAL_DATA,
            socialData: data,
          });
        })
        .catch((e) => console.log(e));
    } else {
      alert(`Facebook Login Error: Cancelled`);
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};

export const autoSocialLogin = (secureStorageData) => (dispatch) => {
  dispatch({ type: SET_SOCIAL_DATA, socialData: secureStorageData });
};

export const googleSignUp = () => async (dispatch) => {
  try {
    const result = await Google.logInAsync(config);

    if (result.type === "success") {
      // console.log("inside success", result);
      async function createGoogleUser() {
        try {
          // console.log("inside createGoogleUser")
          const response = await axiosInstance.post("/auth/social/google/", {
            access_token: result.accessToken,
          });

          const resData = await response.data;
          // console.log("resData: ", resData)

          const secureStorageData = { userToken: resData.key };
          setLoginLocal(secureStorageData);

          setAuthHeader(resData.key);

          dispatch({
            type: SET_LOGIN_STATE,
            userToken: resData.key,
          });
        } catch (error) {
          Alert.alert(
            "Google Login Failed",
            error.response.data.non_field_errors[0]
          );
        }
      }
      createGoogleUser();

      // console.log("setting google user data");
      const secureStorageSocialData = { socialData: result.user };
      setSocialLoginLocal(secureStorageSocialData);

      dispatch({
        type: SET_SOCIAL_DATA,
        socialData: result.user,
      });
    } else {
      alert(`Google Login Error: Cancelled`);
    }
  } catch ({ message }) {
    alert(`Google Login Error: ${message}`);
  }
};

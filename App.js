import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import * as Linking from 'expo-linking';
import AppLoading from "expo-app-loading";
import ReduxThunk from "redux-thunk";
import { enableScreens } from "react-native-screens";

import questionReducer from "./store/reducers/question";
import userReducer from "./store/reducers/signin";
import RootStackNavigator from "./navigation/RootNavigator";
import StartupScreen from "./screens/StartupScreen";

enableScreens();

const rootReducer = combineReducers({
  questions: questionReducer,
  userStatus: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "AvertaStd-Semibold": require("./assets/fonts/AvertaStd-Semibold.otf"),
    "AvertaStd-Regular": require("./assets/fonts/AvertaStd-Regular.otf"),
  });
};

const prefix = Linking.createURL('/');

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  const linking = {
    prefixes: [prefix, 'https://pocketstack.herokuapp.com', 'pocket://'],
    config: {
      screens: {
        "Sign In": "auth/login",
        "Sign Up": "auth/registration",
        "Reset Password": "auth/password/reset",
        "Email Check": "auth/email/check",
        "New Password": "auth/password/reset/confirm/:token",
      },
    },
  };

  if (!isFontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer linking={linking} fallback={<StartupScreen />}>
        <RootStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

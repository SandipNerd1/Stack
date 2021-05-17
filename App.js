import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import ReduxThunk from "redux-thunk";
import { enableScreens } from "react-native-screens";

import questionReducer from "./store/reducers/question";
import userReducer from "./store/reducers/signin";
import RootStackNavigator from "./navigation/RootNavigator";
// import AppNavigator from "./navigation/AppNavigator";
// import TestScreen from "./screens/pocketstack/TestScreen";
import RichTextEditor from "./components/pocketstack/RichTextEditor";

enableScreens();

const rootReducer = combineReducers({
  questions: questionReducer,
  userStatus: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "nunito-extrabold": require("./assets/fonts/Nunito-ExtraBold.ttf"),
    "nunito-light": require("./assets/fonts/Nunito-Light.ttf"),
    "nunito-semibold": require("./assets/fonts/Nunito-SemiBold.ttf"),
    "AvertaStd-Semibold": require("./assets/fonts/AvertaStd-Semibold.otf"),
    "AvertaStd-Regular": require("./assets/fonts/AvertaStd-Regular.otf"),
  });
};

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

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
      <NavigationContainer>
        <RootStackNavigator />
        {/* <RichTextEditor /> */}
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

import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { BubblesLoader } from 'react-native-indicator';
import Spinner from 'react-native-loading-spinner-overlay';

const StartupScreen = (props) => {

  return (
    <View style={styles.screen}>
      <Spinner
        animation="fade"
        customIndicator={<BubblesLoader color="#ff4848" />}
        overlayColor="white"
        visible={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;

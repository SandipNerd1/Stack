import React from "react";
import {
    View,
    StyleSheet,
    TouchableNativeFeedback,
    Dimensions,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const AnimatedButton = (props) => {
    return (
        <TouchableNativeFeedback onPress={props.navigateTo}>
            <View style={styles.row}>{props.children}</View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        paddingHorizontal: SCREEN_WIDTH / 10,
        paddingVertical: SCREEN_HEIGHT / 40,
    },
});

export default AnimatedButton;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Html from "react-native-render-html";

import {
  FontAwesome,
  AntDesign,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const AnswerItem = (props) => {
  return (
    <View style={styles.card}>
      <View style={[styles.row, styles.space]}>
        <View style={styles.row}>
          <Text style={styles.owner}>{props.owner}</Text>
          <Text style={styles.date}>{props.date}</Text>
          {props.owner === props.current_owner && (
            <TouchableOpacity onPress={props.goToDetail}>
              <MaterialCommunityIcons
                name="pencil-outline"
                size={20}
                // color="#001b3a"
                color="#708999"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Html
        source={{ html: props.body }}
        tagsStyles={{
          p: {
            color: "#708999",
            paddingTop: 10,
            fontFamily: "AvertaStd-Regular",
          },
          div: {
            color: "#708999",
            fontFamily: "AvertaStd-Regular",
          },
          b: {
            color: "#708999",
            fontFamily: "AvertaStd-Semibold",
          },
          ol: {
            color: "#708999",
            fontFamily: "AvertaStd-Regular",
          },
          ul: {
            color: "#708999",
            fontFamily: "AvertaStd-Regular",
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: SCREEN_HEIGHT / 40,
    paddingHorizontal: SCREEN_WIDTH / 20,
    borderRadius: 10,
    // backgroundColor: "#f1f4f9",
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  space: {
    justifyContent: "space-between",
  },
  owner: {
    fontFamily: "AvertaStd-Semibold",
    fontSize: 15,
    color: "#001b3a",
  },
  date: {
    fontFamily: "AvertaStd-Regular",
    fontSize: 13,
    color: "#708999",
    marginHorizontal: SCREEN_WIDTH / 40,
  },
});

export default AnswerItem;

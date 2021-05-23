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
          {props.owner === "sandip" && (
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

        {/* <View style={styles.row}>
          <FontAwesome name="star" color="#001b3a" />
          <Text style={{ paddingHorizontal: 10, color: "#001b3a" }}>
            {props.score}
          </Text>
        </View> */}
      </View>
      {/* <View style={styles.row}>
        <Text style={styles.date}>{props.date}</Text>
        {props.owner === "sandip" && (
          <TouchableOpacity onPress={props.goToDetail}>
            <AntDesign name="edit" size={20} color="#001b3a" />
          </TouchableOpacity>
        )}
      </View> */}

      <Html
        source={{ html: props.body }}
        tagsStyles={{
          p: {
            color: "#708999",
            paddingTop: 10,
          },
          div: {
            color: "#708999",
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
    fontWeight: "bold",
    fontSize: 15,
    color: "#001b3a",
  },
  date: {
    fontSize: 13,
    color: "#708999",
    marginHorizontal: SCREEN_WIDTH / 40,
  },
});

export default AnswerItem;

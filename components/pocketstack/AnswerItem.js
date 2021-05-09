import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Html from "react-native-render-html";

import { FontAwesome } from "@expo/vector-icons";

const AnswerItem = (props) => {
  return (
    <View style={styles.card}>
      <View style={[styles.row, styles.space]}>
        <Text style={styles.owner}>{props.owner}</Text>
        <View style={styles.row}>
          <FontAwesome name="star" color="black" />
          <Text style={{ paddingHorizontal: 10 }}>{props.score}</Text>
        </View>
      </View>
      <Text style={styles.date}>{props.date}</Text>
      <Html
        source={{ html: props.body }}
        tagsStyles={{
          p: {
            color: "#888",
            paddingTop: 10,
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  space: {
    justifyContent: "space-between",
  },
  owner: {
    fontWeight: "bold",
    fontSize: 17,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
});

export default AnswerItem;

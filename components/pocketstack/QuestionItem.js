import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  ScrollView,
  Dimensions,
} from "react-native";

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const QuestionItem = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.viewDetail}>
      <View style={styles.card}>
        <View style={[styles.row, { paddingVertical: SCREEN_HEIGHT / 70 }]}>
          <Text style={styles.ownerText}>{props.owner}</Text>
          <Text
            style={{
              fontSize: 13,
              color: "#888",
              paddingHorizontal: SCREEN_WIDTH / 50,
            }}
          >
            on {props.date}
          </Text>
        </View>

        <Text style={styles.secondaryText}>{props.title}</Text>
        <View
          style={[
            styles.row,
            { justifyContent: "space-between", paddingTop: SCREEN_HEIGHT / 50 },
          ]}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text>{props.tags}</Text>
              <Text>java</Text>
              <Text>python</Text>
            </View>
          </ScrollView>

          <View style={styles.row}>
            <View style={styles.row}>
              <MaterialIcons name="question-answer" />
              <Text style={styles.text}>{props.answerCount}</Text>
            </View>
            <View style={[styles.row, { paddingLeft: SCREEN_WIDTH / 20 }]}>
              <FontAwesome name="star" color="black" />
              <Text style={styles.text}>
                {props.score === -1 ? "0" : props.score}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: SCREEN_HEIGHT / 80,
    paddingBottom: SCREEN_HEIGHT / 50,
    paddingHorizontal: SCREEN_WIDTH / 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  secondaryText: {
    color: "#708999",
    fontSize: 17,
  },
  ownerText: {
    fontWeight: "bold",
  },
  text: {
    paddingHorizontal: 6,
  },
});

export default QuestionItem;

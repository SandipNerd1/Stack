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
              fontFamily: "AvertaStd-Regular",
              fontSize: 13,
              color: "#708999",
              paddingHorizontal: SCREEN_WIDTH / 50,
            }}
          >
            on {props.date}
          </Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {props.title}
        </Text>

        <View
          style={[
            styles.row,
            { justifyContent: "space-between", paddingTop: SCREEN_HEIGHT / 50 },
          ]}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          >
            <View style={[styles.row]}>
              {props.tags.map((tag) => (
                <Text key={tag} style={[styles.tagText]}>
                  #{tag}
                </Text>
              ))}
            </View>
          </ScrollView>

          <View style={[styles.row]}>
            <View style={[styles.row, { paddingLeft: SCREEN_WIDTH / 10 }]}>
              <MaterialIcons name="question-answer" color="#001b3a" />
              <Text style={styles.text}>{props.answerCount}</Text>
            </View>
            <View style={[styles.row, { paddingLeft: SCREEN_WIDTH / 20 }]}>
              <FontAwesome name="star" color="#001b3a" />
              <Text style={styles.text}>{props.score}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: SCREEN_HEIGHT / 90,
    paddingBottom: SCREEN_HEIGHT / 70,
    paddingHorizontal: SCREEN_WIDTH / 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    // color: "#708999",
    color: "#001b3a",
    fontSize: 17,
    fontFamily: "AvertaStd-Regular",
  },
  ownerText: {
    fontFamily: "AvertaStd-Semibold",
    color: "#001b3a",
  },
  text: {
    paddingHorizontal: 6,
    fontFamily: "AvertaStd-Regular",
  },
  tagText: {
    marginRight: SCREEN_WIDTH / 30,
    color: "#3792cb",
    fontFamily: "AvertaStd-Regular",
  },
});

export default QuestionItem;

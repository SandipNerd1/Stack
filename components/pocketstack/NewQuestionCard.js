import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  ScrollView,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const NewQuestionCard = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.goToDetail}>
      <View style={styles.card}>
        <View style={{ ...styles.row, ...styles.space }}>
          <View style={styles.row}>
            <Text style={styles.owner}>{props.owner}</Text>
            {props.is_answered && (
              <Text
                style={{
                  backgroundColor: "#a6cd4e",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 10,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  marginHorizontal: 5,
                  borderRadius: 10,
                }}
              >
                answered
              </Text>
            )}
          </View>

          <Text style={styles.date}>{props.date}</Text>
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {props.title}
        </Text>
        <View style={styles.row}>
          <ScrollView horizontal>
            <Text style={styles.tag}>{props.tags}</Text>
            <Text style={styles.tag}>css</Text>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.row}>
              <View style={styles.row}>
                <MaterialIcons name="question-answer" size={15} />
                <Text style={styles.textSpace}>{props.answer_count}</Text>
              </View>
              <View style={{ ...styles.row, ...{ marginHorizontal: 10 } }}>
                <FontAwesome name="hand-pointer-o" size={15} />
                <Text style={styles.textSpace}>{props.score}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginTop: 5,
    marginHorizontal: 5,

    // borderColor: "#888",
    // borderWidth: 1,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  space: {
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "nunito-extrabold",
    fontSize: 17,
    paddingVertical: 5,
    color: "#171d20",
  },
  owner: {
    fontFamily: "nunito-bold",
    fontSize: 13,
    // color: "#1184e8",
    color: "#888",
  },
  date: {
    fontFamily: "nunito-regular",
    fontSize: 13,
    color: "#888",
  },
  tag: {
    fontFamily: "nunito-regular",
    // color: "#888",
    color: "#171d20",
    borderColor: "#888",
    borderWidth: 1,
    paddingHorizontal: 5,
    marginRight: 10,
  },
  textSpace: {
    fontFamily: "nunito-bold",
    paddingHorizontal: 10,
  },
});

export default NewQuestionCard;

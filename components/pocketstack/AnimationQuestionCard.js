import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const AnimationQuestionCard = (props) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          borderBottomColor: "#e0e6e9",
          borderBottomWidth: 1,
          paddingVertical: 10,
        }}
      >
        <Text style={styles.tags}>#{props.tags}</Text>
        <TouchableOpacity onPress={props.goToDetail}>
          <Text style={styles.title} numberOfLines={3}>
            {props.title}
          </Text>
        </TouchableOpacity>

        <View style={{ ...styles.row, ...styles.heightSpace }}>
          <View style={styles.row}>
            <View style={styles.row}>
              <MaterialIcons name="question-answer" color="#949494" size={13} />
              <Text style={styles.status}>{props.answer_count}</Text>
            </View>
            <View style={{ ...styles.row, ...{ marginHorizontal: 20 } }}>
              <MaterialIcons name="score" color="#949494" size={13} />
              <Text style={styles.status}>
                {props.score < 0 ? "0" : props.score}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.date}>{props.date}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  space: {
    justifyContent: "space-between",
  },
  heightSpace: {
    paddingTop: 20,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  tags: {
    fontFamily: "nunito-bold",
    color: "#3895d3",
    paddingVertical: 10,
  },
  title: {
    fontFamily: "nunito-bold",
    fontSize: 20,
    lineHeight: 50,
    color: "#001b3a",
    lineHeight: 30,
  },
  date: {
    fontFamily: "nunito-regular",
    color: "#949494",
  },
  status: {
    fontFamily: "nunito-bold",
    paddingHorizontal: 10,
    color: "#949494",
    fontSize: 13,
  },
});

export default AnimationQuestionCard;

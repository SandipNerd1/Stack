import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Foundation } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, getUserData } from "../../store/actions/user";
import { TouchableNativeFeedback } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const UserQuestionScreen = (props) => {
  const dispatch = useDispatch();
  const userProfileData = useSelector((state) => state.userStatus.profileData);

  const userId = userProfileData.id;

  const userQuestions = useSelector(
    (state) => state.userStatus.userData.questions
  );

  console.log(userQuestions);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserData(userId));
  }, [userId, getUserData, getUserProfile]);

  const renderUserQuestions = ({ item }) => {
    return (
      <View style={styles.screen}>
        <View style={styles.card}>
          <TouchableNativeFeedback
            onPress={() => {
              props.navigation.navigate("Detail", {
                questionId: item.id,
                title: item.title,
              });
            }}
          >
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                },
              ]}
            >
              <View style={styles.score}>
                <Text
                  style={{ color: "white", fontFamily: "AvertaStd-Semibold" }}
                >
                  {item.score}
                </Text>
              </View>
              <View
                style={{
                  width: "85%",
                  paddingVertical: SCREEN_HEIGHT / 40,
                  paddingHorizontal: SCREEN_WIDTH / 30,
                }}
              >
                <Text
                  style={{
                    fontFamily: "AvertaStd-Semibold",
                    color: "#001b3a",
                  }}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontFamily: "AvertaStd-Regular",
                    paddingTop: SCREEN_HEIGHT / 90,
                    color: "#001b3a",
                  }}
                >
                  {item.creation_date}
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  };

  if (userQuestions.length <= 0 || userQuestions.length === null) {
    return (
      <View
        style={[
          styles.screen,
          {
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 30,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 17,
            textAlign: "center",
            fontFamily: "AvertaStd-Semibold",
            color: "#708999",
          }}
        >
          No questions found! Maybe start adding some
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={userQuestions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserQuestions}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white", height: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  card: {
    backgroundColor: "white",
    borderBottomColor: "#708999",
    borderBottomWidth: 1,
  },
  score: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#07bc0d",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export const screenOptions = () => {
  return {
    headerStyle: {
      elevation: 0,
      borderBottomColor: "#708999",
      borderBottomWidth: 1,
    },
    headerTitle: "My Questions",
    headerTitleStyle: {
      fontSize: 20,
      fontFamily: "AvertaStd-Semibold",
    },
  };
};

export default UserQuestionScreen;

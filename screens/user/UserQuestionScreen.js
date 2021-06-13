import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Foundation } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, getUserData } from "../../store/actions/user";
import { TouchableNativeFeedback } from "react-native";

const UserQuestionScreen = (props) => {
  const dispatch = useDispatch();
  const userProfileData = useSelector((state) => state.userStatus.profileData);

  const userId = userProfileData.id;

  const userQuestions = useSelector(
    (state) => state.userStatus.userData.questions
  );

  console.log(userQuestions);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserData(userId));
  }, [userId, getUserData, getUserProfile]);

  const renderUserQuestions = ({ item }) => {
    return (
      <View style={styles.screen}>
        <TouchableNativeFeedback>
          <View
            style={[
              styles.card,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <View>
              <Text
                style={{ fontFamily: "AvertaStd-Semibold", color: "#001b3a" }}
              >
                React Native is used for developing mobile Apps with the help of
                javascript and it is based on the syntax of React and is highly
                recommended by developers{" "}
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  };

  if (userQuestions.length <= 0) {
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
    backgroundColor: "#f1f4f9",
  },
  card: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    elevation: 5,
  },
});

export const screenOptions = () => {
  return {
    headerStyle: {
      elevation: 0,
    },
    headerTitle: "Your Question",
    headerTitleStyle: {
      fontSize: 20,
      fontFamily: "AvertaStd-Semibold",
    },
  };
};

export default UserQuestionScreen;

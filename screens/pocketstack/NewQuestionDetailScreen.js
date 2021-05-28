import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  LogBox,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Html from "react-native-render-html";

import * as questionsActions from "../../store/actions/question";
import { getUserProfile } from "../../store/actions/user";

import AnswerItem from "../../components/pocketstack/AnswerItem";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

LogBox.ignoreAllLogs();

const NewQuestionDetailScreen = (props) => {
  const current_username = useSelector(
    (state) => state.userStatus.profileData.username
  );
  const { questionId, title } = props.route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const selectedQuestion = useSelector(
    (state) => state.questions.availableQuestionDetails
  );

  //function to fetch question detail from the server

  const loadQuestionDetail = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(questionsActions.fetchQuestionDetail(questionId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError, questionId]);

  useEffect(() => {
    dispatch(getUserProfile());
    loadQuestionDetail();
    props.navigation.setParams({ title: title });
  }, [dispatch, loadQuestionDetail]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "focus",
      loadQuestionDetail
    );

    return willFocusSub;
  }, [loadQuestionDetail]);

  //event handler function for upvoting a question

  const upvoteHandler = useCallback(async () => {
    setError(null);
    try {
      await dispatch(questionsActions.upvoteQuestion(questionId));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, setError]);

  // //event handler function for downvoting a question

  const downvoteHandler = useCallback(async () => {
    setError(null);
    try {
      await dispatch(questionsActions.downvoteQuestion(questionId));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, setError]);

  const renderAnswer = ({ item }) => {
    return (
      <AnswerItem
        id={item.id}
        body={item.body}
        owner={item.owner}
        score={item.score}
        date={item.creation_date}
        current_owner={current_username}
        goToDetail={() => {
          props.navigation.navigate("edit_Answer", {
            aid: item.id,
            body: item.body,
          });
        }}
      />
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.questionDetailContainer}>
          <Text style={styles.title}>{selectedQuestion.title}</Text>
          <View style={styles.row}>
            <Text>
              <Text style={styles.date}>{selectedQuestion.creation_date} </Text>
              <Text style={styles.owner}>by {selectedQuestion.owner}</Text>
            </Text>
          </View>

          {selectedQuestion.tags && (
            <Text>
              {selectedQuestion.tags.map((tag) => (
                <Text key={tag} style={styles.tag}>
                  #{tag}
                  {"   "}
                </Text>
              ))}
            </Text>
          )}
          <Html
            source={{ html: selectedQuestion.body }}
            tagsStyles={{
              p: {
                color: "#708999",
                paddingTop: SCREEN_HEIGHT / 50,
              },
              div: {
                color: "#708999",
                paddingTop: SCREEN_HEIGHT / 50,
                fontFamily: "AvertaStd-Regular",
              },
            }}
          />
        </View>

        <View style={styles.questionStatus}>
          <View
            style={{
              flexDirection: "row",
              // marginHorizontal: SCREEN_WIDTH / 40,
              backgroundColor: "white",
            }}
          >
            <TouchableOpacity onPress={upvoteHandler} style={styles.iconStyle}>
              <MaterialCommunityIcons
                color={selectedQuestion.user_upvoted ? "#07bc0d" : "#708999"}
                name="arrow-up-bold-circle"
                size={20}
              />
              <Text
                style={{
                  color: selectedQuestion.user_upvoted ? "#07bc0d" : "#708999",
                  paddingHorizontal: 5,
                  fontFamily: "AvertaStd-Regular",
                }}
              >
                upvote
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={downvoteHandler}
              style={[
                styles.iconStyle,
                {
                  paddingHorizontal: SCREEN_WIDTH / 20,
                },
              ]}
            >
              <MaterialCommunityIcons
                color={selectedQuestion.user_downvoted ? "#ff4848" : "#708999"}
                name="arrow-down-bold-circle"
                size={20}
              />
              <Text
                style={{
                  color: selectedQuestion.user_downvoted
                    ? "#ff4848"
                    : "#708999",
                  paddingHorizontal: 5,
                  fontFamily: "AvertaStd-Regular",
                }}
              >
                downvote
              </Text>
            </TouchableOpacity>
          </View>
          {selectedQuestion.owner === current_username && (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Edit Question", {
                  qid: questionId,
                  title: selectedQuestion.title,
                  body: selectedQuestion.body,
                })
              }
              style={styles.iconStyle}
            >
              <MaterialCommunityIcons
                name="pencil-outline"
                size={20}
                color="#708999"
              />
              <Text
                style={{
                  color: "#708999",
                  paddingHorizontal: 5,
                  fontFamily: "AvertaStd-Regular",
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderEmptyAnswers = () => {
    return (
      <View style={styles.center}>
        <Text
          style={{
            fontSize: 20,
            color: "#888",
            fontFamily: "AvertaStd-Regular",
          }}
        >
          No answer were found!{" "}
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    return <View style={{ height: 100, backgroundColor: "white" }} />;
  };

  // Conditional Rendering

  if (error) {
    return (
      <View style={styles.center}>
        <Text>An error occured!</Text>
        <Text>{error}</Text>
        <Button
          title="Try again"
          onPress={loadQuestionDetail}
          color="#43516c"
        />
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: "white" }]}>
        <ActivityIndicator size="large" color="#43516c" />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <FlatList
        data={selectedQuestion.answers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAnswer}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyAnswers}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white", height: "100%" }}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          props.navigation.navigate("Post answer", {
            qid: selectedQuestion.id,
          });
        }}
        style={styles.fab}
      >
        <Text style={{ color: "white", fontFamily: "AvertaStd-Semibold" }}>
          Post Answer
        </Text>
        {/* <FontAwesome5 name="pen" size={15} color="white" /> */}
      </TouchableOpacity>
    </View>
  );
};

export const screenOptions = (navData) => {
  const title = navData.route.params ? navData.route.params.title : null;
  return {
    headerTitle: "View Questions",
    headerStyle: {
      backgroundColor: "white",
      elevation: 0,
      borderBottomWidth: 1,
    },
    headerTitleAlign: "center",
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: { fontSize: 17, color: "#001b3a", fontFamily: "AvertaStd-Regular" },
  date: { fontSize: 13, color: "#708999", fontFamily: "AvertaStd-Regular" },
  owner: {
    fontSize: 13,
    color: "#001b3a",
    fontFamily: "AvertaStd-Semibold",
  },
  tag: {
    marginRight: 10,
    color: "#3792cb",
    fontFamily: "AvertaStd-Regular",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    flex: 1,
    position: "absolute",
    marginHorizontal: SCREEN_WIDTH / 20,
    padding: 10,
    width: "30%",
    // height: 45,
    alignItems: "center",
    justifyContent: "center",
    bottom: SCREEN_HEIGHT / 40,
    right: 0,
    backgroundColor: "#ff4848",
    borderRadius: 10,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: "white",
  },
  headerContainer: {
    // paddingVertical: 20,
    backgroundColor: "white",
    borderBottomWidth: SCREEN_WIDTH / 20,
    borderBottomColor: "#f1f4f9",
  },
  questionDetailContainer: {
    paddingHorizontal: SCREEN_WIDTH / 20,
    paddingTop: 20,
    backgroundColor: "white",
  },
  questionStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: null,
    paddingVertical: SCREEN_HEIGHT / 40,
    paddingHorizontal: SCREEN_WIDTH / 20,
  },
  iconStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewQuestionDetailScreen;

import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Dimensions,
  LogBox,
  Alert,
  Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Html from "react-native-render-html";

import * as questionsActions from "../../store/actions/question";
import * as answerActions from "../../store/actions/answer";
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
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const selectedQuestion = useSelector(
    (state) => state.questions.availableQuestionDetails
  );

  //function to fetch question detail from the server

  const loadQuestionDetail = useCallback(async () => {
    setIsLoading(true);
    setError(null);
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
      await dispatch(questionsActions.fetchQuestions());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, setError]);

  // //event handler function for downvoting a question

  const downvoteHandler = useCallback(async () => {
    setError(null);
    try {
      await dispatch(questionsActions.downvoteQuestion(questionId));
      await dispatch(questionsActions.fetchQuestions());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, setError]);

  const deleteQuestionHandler = useCallback(async () => {
    setError(null);
    try {
      Alert.alert("", "Are you sure you want to delete your question?", [
        {
          text: "yes",
          onPress: async () => {
            setModalVisible(true);
            await dispatch(questionsActions.deleteQuestion(questionId));
            await dispatch(questionsActions.fetchQuestions());
            props.navigation.goBack();
          },
        },
        {
          text: "no",
        },
      ]);
    } catch (err) {
      Alert.alert("", "An error occured!", [{ text: "okay" }]);
    }
  }, [dispatch, setError, questionId, setModalVisible]);

  const renderAnswer = ({ item }) => {
    return (
      <AnswerItem
        id={item.id}
        body={item.body}
        owner={item.owner}
        score={item.score}
        date={item.creation_date}
        current_owner={current_username}
        goToEditDetail={() => {
          props.navigation.navigate("edit_Answer", {
            aid: item.id,
            body: item.body,
          });
        }}
        deleteAnswer={async () => {
          setError(null);
          try {
            Alert.alert("", "Are you sure you want to delete your answer?", [
              {
                text: "yes",
                onPress: async () => {
                  setModalVisible(true);
                  await dispatch(answerActions.deleteAnswer(item.id));
                  await dispatch(
                    questionsActions.fetchQuestionDetail(questionId)
                  );
                  setModalVisible(false);
                },
              },
              { text: "no" },
            ]);
          } catch (err) {
            setError(err.message);
            Alert.alert("", "An error occured!", [{ text: "okay" }]);
          }
        }}
      />
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.questionDetailContainer}>
          <Text selectable={true} style={styles.title}>
            {selectedQuestion.title}
          </Text>
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
            defaultTextProps={{ selectable: true }}
            source={{ html: selectedQuestion.body }}
            tagsStyles={{
              p: {
                color: "#708999",
                paddingTop: SCREEN_HEIGHT / 50,
                fontFamily: "AvertaStd-Regular",
              },
              div: {
                color: "#708999",
                paddingTop: SCREEN_HEIGHT / 50,
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

        <View style={styles.questionStatus}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: null,
            }}
          >
            <TouchableOpacity
              onPress={upvoteHandler}
              style={[styles.iconStyle]}
            >
              <MaterialCommunityIcons
                color={selectedQuestion.user_upvoted ? "#07bc0d" : "#708999"}
                name={
                  selectedQuestion.user_upvoted
                    ? "arrow-up-bold-circle"
                    : "arrow-up-bold-circle-outline"
                }
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={downvoteHandler}
              style={[
                styles.iconStyle,
                { marginHorizontal: SCREEN_WIDTH / 20 },
              ]}
            >
              <MaterialCommunityIcons
                color={selectedQuestion.user_downvoted ? "#ff4848" : "#708999"}
                name={
                  selectedQuestion.user_downvoted
                    ? "arrow-down-bold-circle"
                    : "arrow-down-bold-circle-outline"
                }
                size={25}
              />
            </TouchableOpacity>
            {selectedQuestion.owner === current_username && (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Edit Question", {
                    qid: questionId,
                    title: selectedQuestion.title,
                    body: selectedQuestion.body,
                  })
                }
                style={[styles.iconStyle]}
              >
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={25}
                  color="#708999"
                />
              </TouchableOpacity>
            )}
          </View>
          {selectedQuestion.owner === current_username && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={deleteQuestionHandler}
                style={styles.iconStyle}
              >
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={25}
                  color="#708999"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{ backgroundColor: "#f1f4f9", height: SCREEN_HEIGHT / 20 }}
        />
      </View>
    );
  };

  const renderEmptyAnswers = () => {
    return (
      <View style={styles.center}>
        <Text
          style={{
            fontSize: 20,
            color: "#708999",
            fontFamily: "AvertaStd-Regular",
            marginTop: 100,
            textAlign: "center",
            paddingHorizontal: SCREEN_WIDTH / 20,
          }}
        >
          No answers were found!{" "}
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
        <Text
          style={{
            fontFamily: "AvertaStd-Semibold",
            color: "#708999",
            fontSize: 20,
            textAlign: "center",
            paddingHorizontal: SCREEN_WIDTH / 20,
          }}
        >
          Oops !!
        </Text>
        <Text
          style={{
            fontFamily: "AvertaStd-Semibold",
            color: "#708999",
            fontSize: 17,
            textAlign: "center",
            paddingHorizontal: SCREEN_WIDTH / 20,
            paddingBottom: SCREEN_HEIGHT / 50,
          }}
        >
          An error occured! failed to load questions detail :(
        </Text>
        <TouchableOpacity
          onPress={loadQuestionDetail}
          activeOpacity={0.7}
          style={{
            backgroundColor: "#43516c",
            paddingHorizontal: SCREEN_WIDTH / 20,
            paddingVertical: SCREEN_HEIGHT / 80,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "AvertaStd-Semibold",
              fontSize: 17,
            }}
          >
            Try again
          </Text>
        </TouchableOpacity>
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
        backgroundColor: "#f1f4f9",
      }}
    >
      <Modal
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
        animationType="fade"
      >
        <View
          style={{
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#43516c" />
        </View>
      </Modal>
      <FlatList
        data={selectedQuestion.answers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAnswer}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyAnswers}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white", height: "100%" }}
        removeClippedSubviews={false}
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
    marginVertical: 3,
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
    backgroundColor: "white",
  },
  questionDetailContainer: {
    paddingHorizontal: SCREEN_WIDTH / 20,
    paddingVertical: SCREEN_HEIGHT / 40,
    backgroundColor: "white",
  },
  questionStatus: {
    backgroundColor: "#f1f4f9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: null,
    paddingHorizontal: SCREEN_WIDTH / 15,
    paddingVertical: SCREEN_HEIGHT / 40,
  },
  iconStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewQuestionDetailScreen;

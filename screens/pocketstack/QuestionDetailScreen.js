import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AntDesign } from "@expo/vector-icons";

import * as questionsActions from "../../store/actions/question";
import HeaderButton from "../../components/UI/HeaderButton";

const QuestionDetailScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const { questionId } = props.route.params;
  console.log(questionId);

  const selectedQuestion = useSelector(
    (state) => state.questions.availableQuestionDetails
  );

  // console.log(selectedQuestion.user_upvoted);

  const [isUpvoted, setIsUpvoted] = useState(selectedQuestion.user_upvoted);

  // useEffect(() => {
  //   console.log("after state update", isUpvoted);
  //   setIsUpvoted(!isUpvoted);
  //   console.log(isUpvoted);
  // }, [setIsUpvoted]);

  const loadQuestionDetail = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(questionsActions.fetchQuestionDetail(questionId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadQuestionDetail();
  }, [dispatch, loadQuestionDetail]);

  useEffect(() => {
    const willFocus = props.navigation.addListener("focus", loadQuestionDetail);

    return willFocus;
  }, [loadQuestionDetail]);

  // console.log("set");
  // console.log(isUpvoted);

  const upvoteHandler = useCallback(async () => {
    setError(null);
    setIsUpvoted(!isUpvoted);
    try {
      await dispatch(questionsActions.upvoteQuestion(questionId));
    } catch (err) {
      console.log(error);
    }
  }, [dispatch, setError, setIsUpvoted]);

  const currentQuestionIsMarked = useSelector((state) =>
    state.questions.markedQuestions.some((ques) => ques.id === questionId)
  );
  const markQuestionHandler = useCallback(() => {
    dispatch(questionsActions.markQuestion(questionId));
  }, [dispatch, questionId]);

  useEffect(() => {
    props.navigation.setParams({ mark: markQuestionHandler });
  }, [markQuestionHandler]);

  useEffect(() => {
    props.navigation.setParams({ isMarked: currentQuestionIsMarked });
  }, [currentQuestionIsMarked]);

  console.log(isUpvoted);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#43516c" />
      </View>
    );
  }
  if (!isLoading) {
    return (
      <View style={styles.screen}>
        <View style={styles.questionDetail}>
          <Text style={styles.title}>{selectedQuestion.title}</Text>
          <Text style={styles.body}>{selectedQuestion.body}</Text>
          <Text style={{ color: "black" }}>{selectedQuestion.score}</Text>
          {selectedQuestion.user_upvoted ? (
            <Text>true</Text>
          ) : (
            <Text>false</Text>
          )}
          <View style={{ ...styles.row, ...styles.space }}>
            <View>
              <Text style={styles.tag}>{selectedQuestion.tags}</Text>
            </View>
            <View style={{ ...styles.row, ...styles.space }}>
              <TouchableOpacity onPress={upvoteHandler}>
                <AntDesign name={isUpvoted ? "like1" : "like2"} size={20} />
              </TouchableOpacity>

              <AntDesign
                name="dislike2"
                size={20}
                style={{ paddingHorizontal: 20 }}
              />
            </View>
          </View>
        </View>
        {selectedQuestion.answers ? (
          <View style={styles.noAnswer}>
            <Text style={{ color: "#888", fontSize: 15 }}>
              No Answers were found , Sorry!
            </Text>
          </View>
        ) : (
          <View>
            <Text>hello world!</Text>
          </View>
        )}
      </View>
    );
  }
};

export const screenOptions = (navData) => {
  const isMarked = navData.route.params ? navData.route.params.isMarked : null;
  const markFn = navData.route.params ? navData.route.params.mark : null;
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Mark"
          iconName={isMarked ? "star" : "star-outline"}
          onPress={markFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  space: {
    justifyContent: "space-between",
  },
  questionDetail: {
    padding: 10,
    backgroundColor: "white",
  },
  title: {
    color: "#171d20",
    fontSize: 17,
    fontWeight: "bold",
  },
  body: {
    color: "#888",
  },
  noAnswer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});

export default QuestionDetailScreen;

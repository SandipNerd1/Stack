import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import QuestionItem from "../../components/pocketstack/QuestionItem";
import * as questionsActions from "../../store/actions/question";
import CustomButton from "../../components/UI/CustomButton";
import FilterButton from "../../components/UI/FilterButton";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const HomeScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const [error, setError] = useState();
  const [isDateActive, setIsDateActive] = useState(false);
  const [isScoreActive, setIsScoreActive] = useState(false);
  const [isAnsweredActive, setIsAnsweredActive] = useState(false);

  const questions = useSelector((state) => state.questions.availableQuestions);

  const dispatch = useDispatch();

  const loadQuestions = useCallback(async () => {
    setError(null);
    setErrorLoading(true);
    setIsRefreshing(true);
    try {
      await dispatch(questionsActions.fetchQuestions());
      setIsScoreActive(false);
      setIsAnsweredActive(false);
      setIsDateActive(false);
    } catch (err) {
      setError(err.message);
    }
    setErrorLoading(false);
    setIsRefreshing(false);
  }, [
    dispatch,
    setErrorLoading,
    setError,
    setIsRefreshing,
    setIsAnsweredActive,
    setIsDateActive,
    setIsScoreActive,
  ]);

  // useEffect(() => {
  //   const willFocusSub = props.navigation.addListener("focus", loadQuestions);

  //   return willFocusSub;
  // }, [loadQuestions]);

  useEffect(() => {
    setIsLoading(true);
    loadQuestions().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadQuestions, setIsLoading]);

  // toggle filter function

  const setActiveFilterText = (activeText) => {
    if (activeText === "creation_date") {
      setIsDateActive(true);
      setIsAnsweredActive(false);
      setIsScoreActive(false);
    } else if (activeText === "score") {
      setIsScoreActive(true);
      setIsDateActive(false);
      setIsAnsweredActive(false);
    } else if (activeText === "is_answered") {
      setIsAnsweredActive(true);
      setIsDateActive(false);
      setIsScoreActive(false);
    }
  };

  const filterQuestions = useCallback(
    async (type) => {
      try {
        setIsLoading(true);
        setActiveFilterText(type);
        await dispatch(questionsActions.filterQuestionList(type));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch, setActiveFilterText]
  );

  const renderQuestions = ({ item }) => {
    return (
      <QuestionItem
        title={item.title}
        tags={item.tags}
        owner={item.owner}
        date={item.creation_date}
        answerCount={item.answer_count}
        score={item.score}
        viewDetail={() => {
          props.navigation.navigate("Detail", {
            questionId: item.id,
            title: item.title,
          });
        }}
      />
    );
  };

  const header = (
    <View style={styles.header}>
      <View style={styles.heading}>
        <Text style={styles.headerText}>Top Questions</Text>
        <CustomButton
          onSubmit={() => props.navigation.navigate("Post question")}
        >
          <AntDesign name="plus" color="white" size={25} />
        </CustomButton>
      </View>
      <View style={styles.filterContainer}>
        <FilterButton
          buttonText="Date"
          active={isDateActive}
          onFilterSubmit={filterQuestions.bind(this, "creation_date")}
        />
        <FilterButton
          buttonText="Score"
          active={isScoreActive}
          onFilterSubmit={filterQuestions.bind(this, "score")}
        />
        <FilterButton
          buttonText="Answered"
          active={isAnsweredActive}
          onFilterSubmit={filterQuestions.bind(this, "is_answered")}
        />
      </View>
    </View>
  );

  if (error) {
    return (
      <View style={styles.screen}>
        {header}
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
            An error occured! failed to load questions :(
          </Text>
          <TouchableOpacity
            onPress={loadQuestions}
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
          {/* <Button title="Try again" onPress={loadQuestions} color="#43516c" /> */}
        </View>
      </View>
    );
  }

  if (isLoading || errorLoading) {
    return (
      <View style={styles.screen}>
        {header}
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#43516c" />
        </View>
      </View>
    );
  }

  if (!isLoading && questions.length === 0) {
    return (
      <View style={styles.screen}>
        {header}
        <View style={styles.center}>
          <Text
            style={{
              fontFamily: "AvertaStd-Semibold",
              color: "#708999",
              textAlign: "center",
              paddingHorizontal: SCREEN_WIDTH / 50,
              fontSize: 17,
            }}
          >
            No questions found. You can start asking questions by tapping the
            plus icon on the top right corner
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {header}
      <FlatList
        onRefresh={loadQuestions}
        refreshing={isRefreshing}
        keyExtractor={(item) => item.id.toString()}
        data={questions}
        renderItem={renderQuestions}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View style={{ height: 200 }} />}
      />
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingTop: SCREEN_HEIGHT / 15,
    paddingHorizontal: SCREEN_WIDTH / 20,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontFamily: "AvertaStd-Semibold",
    color: "#001b3a",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SCREEN_HEIGHT / 30,
    marginBottom: SCREEN_HEIGHT / 70,
    backgroundColor: "#f1f4f9",
    paddingVertical: SCREEN_HEIGHT / 60,
    paddingHorizontal: SCREEN_WIDTH / 10,
    borderRadius: 20,
  },
});

export default HomeScreen;

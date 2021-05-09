import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Button,
  ActivityIndicator,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import * as questionsActions from "../../store/actions/question";
import AnimationQuestionCard from "../../components/pocketstack/AnimationQuestionCard";
import { TouchableOpacity } from "react-native-gesture-handler";

const NewHomeScreen = (props) => {
  const [scoreActive, isScoreActive] = useState(true);
  const [dateActive, isDateActive] = useState(false);
  const [answeredActive, isAnsweredActive] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const HEADER_MAX_HEIGHT = 240;
  const HEADER_MIN_HEIGHT = 84;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: "clamp",
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.9],
    extrapolate: "clamp",
  });
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: "clamp",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const questions = useSelector((state) => state.questions.availableQuestions);
  const dispatch = useDispatch();

  const renderSortedQuestions = useCallback(
    async (filterText) => {
      setError(null);
      setIsLoading(true);
      isScoreActive(true);
      try {
        await dispatch(questionsActions.filterQuestionList(filterText));
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    },
    [dispatch, setIsLoading, setError, isScoreActive]
  );

  useEffect(() => {
    renderSortedQuestions();
  }, [dispatch, renderSortedQuestions]);

  const loadQuestions = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(questionsActions.fetchQuestions());
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadQuestions();
  }, [dispatch, loadQuestions]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("focus", loadQuestions);

    return willFocusSub;
  }, [loadQuestions]);

  const renderQuestions = ({ item }) => {
    return (
      <AnimationQuestionCard
        title={item.title}
        tags={item.tags}
        answer_count={item.answer_count}
        score={item.score}
        date={item.creation_date}
        goToDetail={() => {
          props.navigation.navigate("Detail", {
            questionId: item.id,
          });
        }}
      />
    );
  };

  const renderEmptyList = () => {
    if (isLoading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#ff4848" />
        </View>
      );
    }
  };

  let result;
  let data;

  if (error) {
    data = null;
    result = (
      <View style={styles.center}>
        <Text>An error occured</Text>
        <Button title="try again" onPress={loadQuestions} />
      </View>
    );
  }
  if (isLoading) {
    result = (
      <View
        style={[
          styles.center,
          {
            position: "absolute",
            elevation: 20,
            paddingTop: HEADER_MAX_HEIGHT + 200,
          },
        ]}
      >
        <ActivityIndicator size="large" color="#ff4848" />
      </View>
    );
  }

  if (!isLoading && questions.length === 0) {
    data = [];
    result = (
      <View style={styles.center}>
        <Text>No questions found. Maybe start adding some!</Text>
      </View>
    );
  } else {
    data = questions;
    result = (
      <Animated.FlatList
        keyExtractor={(item) => item.id.toString()}
        data={questions}
        renderItem={renderQuestions}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        style={{ backgroundColor: "white" }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.saveArea}>
      {result}
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslateY }] },
        ]}
      >
        <TouchableWithoutFeedback onPress={() => setShowFilter(!showFilter)}>
          <Animated.View
            style={[
              styles.headerBackground,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslateY }],
              },
            ]}
          >
            <Text style={styles.trendingText}>Trending</Text>
            <Text style={styles.questionText}>Questions</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
      <Animated.View
        style={[
          styles.topBar,
          {
            transform: [{ translateY: titleTranslateY }],
          },
        ]}
      >
        <MaterialIcons
          name="sort"
          color="white"
          size={25}
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: 30,
            padding: 5,
          }}
          onPress={() => {
            setShowFilter(!showFilter);
          }}
        />
        <Text style={styles.title}>questions</Text>
      </Animated.View>
      {showFilter && (
        <Animated.View
          style={{
            position: "absolute",
            marginVertical: 35,
            backgroundColor: "white",
            paddingVertical: 10,
            zIndex: 10,
            elevation: 10,
          }}
        >
          <Text style={styles.filterText}>score</Text>
          <Text style={styles.filterText}>date</Text>
          <Text style={styles.filterText}>answered</Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerShown: false,
    headerStyle: {
      backgroundColor: "#ff4848",
      elevation: 0,
    },
  };
};

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
    // backgroundColor: "#ff4848",
    backgroundColor: "white",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#402583",
    backgroundColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    borderRadius: 10,
    marginHorizontal: 12,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ff4848",
    overflow: "hidden",
    height: 240,
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: 240,
    resizeMode: "cover",
    marginTop: 100,
    backgroundColor: "#ff4848",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  topBar: {
    marginTop: 35,
    height: 50,
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontFamily: "nunito-bold",
    paddingHorizontal: 70,
  },
  avatar: {
    height: 54,
    width: 54,
    resizeMode: "contain",
    borderRadius: 54 / 2,
  },
  fullNameText: {
    fontSize: 16,
    marginLeft: 24,
  },
  trendingText: {
    fontSize: 30,
    color: "white",
    fontFamily: "nunito-bold",
  },
  questionText: {
    fontSize: 40,
    color: "white",
    fontFamily: "nunito-bold",
    letterSpacing: 2,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 17,
    color: "#43516c",
  },
});

export default NewHomeScreen;

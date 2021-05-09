import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as questionsActions from "../../store/actions/question";
import AnimationQuestionCard from "../../components/pocketstack/AnimationQuestionCard";
import Header from "../../components/UI/Header";

const SampleHomeScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const questions = useSelector((state) => state.questions.availableQuestions);
  const dispatch = useDispatch();

  const loadQuestions = useCallback(async () => {
    setError(null);
    try {
      await dispatch(questionsActions.fetchQuestions());
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("focus", loadQuestions);

    return willFocusSub;
  }, [loadQuestions]);

  useEffect(() => {
    setIsLoading(true);
    loadQuestions().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadQuestions, setIsLoading]);

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
            title: item.title,
          });
        }}
      />
    );
  };

  const renderListEmpty = () => {
    return (
      <View style={{ flex: 1, paddingTop: 100 }}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#ff4848" />
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    return <Header {...props} />;
  };

  // if (error) {
  //   return (
  //     <View>
  //       <View style={styles.header}>
  //         <Text style={styles.trendingText}>Trending</Text>
  //         <Text style={styles.questionText}>Questions</Text>
  //       </View>
  //       <View style={styles.center}>
  //         <Text>An error occured</Text>
  //         <Button title="try again" onPress={loadQuestions} />
  //       </View>
  //     </View>
  //   );
  // }

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <View style={styles.header}>
  //         <Text style={styles.trendingText}>Trending</Text>
  //         <Text style={styles.questionText}>Questions</Text>
  //       </View>
  //       <Circle />
  //       <View style={styles.center}>
  //         <ActivityIndicator size="large" color="#ff4848" />
  //       </View>
  //     </View>
  //   );
  // }
  // if (!isLoading && questions.length === 0) {
  //   return (
  //     <View>
  //       <View style={styles.header}>
  //         <Text style={styles.trendingText}>Trending</Text>
  //         <Text style={styles.questionText}>Questions</Text>
  //       </View>
  //       <View style={styles.center}>
  //         <Text>No questions found. Maybe start adding some!</Text>
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        onRefresh={loadQuestions}
        refreshing={isRefreshing}
        bounces={false}
        keyExtractor={(item) => item.id.toString()}
        data={questions}
        renderItem={renderQuestions}
        ListEmptyComponent={renderListEmpty}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        style={{ height: "100%" }}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerShown: false,
    headerTitle: null,
  };
};

const styles = StyleSheet.create({});

export default SampleHomeScreen;

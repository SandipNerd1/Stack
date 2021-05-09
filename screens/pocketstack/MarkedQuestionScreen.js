import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import AnimationQuestionCard from "../../components/pocketstack/AnimationQuestionCard";

const MarkedQuestionScreen = (props) => {
  const markedQuestions = useSelector(
    (state) => state.questions.markedQuestions
  );

  const renderMarkedQuestions = (itemData) => {
    return (
      <AnimationQuestionCard
        title={itemData.item.title}
        // body={itemData.item.body}
        tags={itemData.item.tags}
        date={itemData.item.creation_date}
        owner={itemData.item.owner}
        answer_count={itemData.item.answer_count}
        score={itemData.item.score}
        is_answered={itemData.item.is_answered}
        goToDetail={() => {
          props.navigation.navigate("Detail", {
            questionId: itemData.item.id,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={markedQuestions}
        renderItem={renderMarkedQuestions}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitleAlign: "center",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default MarkedQuestionScreen;

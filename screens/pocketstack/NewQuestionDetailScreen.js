import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  TouchableNativeFeedback,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Html from "react-native-render-html";

import * as questionsActions from "../../store/actions/question";
import AnswerItem from "../../components/pocketstack/AnswerItem";
import HeaderButton from "../../components/UI/HeaderButton";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const NewQuestionDetailScreen = (props) => {
  const { questionId, title } = props.route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const selectedQuestion = useSelector(
    (state) => state.questions.availableQuestionDetails
  );
  const [isUpvoted, setIsUpvoted] = useState();
  const [isDownVoted, setIsDownVoted] = useState(
    selectedQuestion.user_downvoted
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

  useEffect(() => {
    setIsUpvoted(selectedQuestion.user_upvoted);
  }, [setIsUpvoted]);

  //event handler function for upvoting a question

  const upvoteHandler = useCallback(async () => {
    setError(null);
    setIsUpvoted(!isUpvoted);
    try {
      await dispatch(questionsActions.upvoteQuestion(questionId));
    } catch (err) {
      console.log(error);
    }
  }, [dispatch, setError, setIsUpvoted]);

  // //event handler function for downvoting a question

  // const downvoteHandler = useCallback(async () => {
  //   setError(null);
  //   setIsDownVoted(!isDownVoted);
  //   try {
  //     await dispatch(questionsActions.downvoteQuestion(questionId));
  //   } catch (err) {
  //     console.log(error);
  //   }
  // }, [dispatch, setError, setIsUpvoted]);

  const renderAnswer = ({ item }) => {
    return (
      <AnswerItem
        id={item.id}
        body={item.body}
        owner={item.owner}
        score={item.score}
        date={item.creation_date}
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
      <View
        style={{
          borderRadius: 10,
          paddingVertical: 20,
          backgroundColor: "white",
        }}
      >
        <View style={{ paddingHorizontal: SCREEN_WIDTH / 20 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", color: "#001b3a" }}>
            {selectedQuestion.title}
          </Text>
          <View style={styles.row}>
            <Text>
              <Text style={{ fontSize: 13 }}>
                {selectedQuestion.creation_date}{" "}
              </Text>
              <Text style={{ fontSize: 13 }}>by {selectedQuestion.owner}</Text>
            </Text>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Edit Question", {
                  qid: questionId,
                  title: selectedQuestion.title,
                  body: selectedQuestion.body,
                })
              }
              style={{ marginHorizontal: SCREEN_WIDTH / 40 }}
            >
              <AntDesign name="edit" size={20} color="#001b3a" />
            </TouchableOpacity>
          </View>

          <Html
            source={{ html: selectedQuestion.body }}
            tagsStyles={{
              p: {
                color: "#708999",
                paddingTop: SCREEN_HEIGHT / 50,
              },
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: SCREEN_HEIGHT / 40,
            paddingHorizontal: SCREEN_WIDTH / 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="thumbs-o-up" size={20} />
            <FontAwesome
              name="thumbs-o-down"
              size={20}
              style={{ marginHorizontal: SCREEN_WIDTH / 20 }}
            />
          </View>
        </View>
        {/* <View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Edit Question", {
                qid: questionId,
                title: selectedQuestion.title,
                body: selectedQuestion.body,
              })
            }
          >
            <Text>edit</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };

  const renderEmptyAnswers = () => {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 20, color: "#888" }}>
          No answer were found!{" "}
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    return <View style={{ height: 100 }} />;
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
        style={{ backgroundColor: "#f1f4f9" }}
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
        <Text style={{ color: "white" }}>Post Answer</Text>
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
      elevation: 3,
    },
    headerTitleAlign:'center'
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "nunito-bold",
    fontSize: 17,
    color: "black",
  },
  body: {
    fontFamily: "nunito-regular",
  },
  tag: {
    fontFamily: "nunito-regular",
    fontSize: 15,
    color: "#3895d3",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  judge: {
    paddingHorizontal: 10,
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
});

// export const screenOptions = (navData) => {
//   return {
//     headerShown: true,
//     headerStyle: {
//       backgroundColor: "#ff4848",
//     },
//     headerTitleAlign: "center",
//   };
// };

export default NewQuestionDetailScreen;

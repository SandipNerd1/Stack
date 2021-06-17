import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import QuestionItem from "../../components/pocketstack/QuestionItem";
import * as questionsActions from "../../store/actions/question";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const SearchScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setIsTouched] = useState(false);
  const [error, setError] = useState();
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  const searchResults = useSelector(
    (state) => state.questions.filteredQuestions
  );

  const renderSearchRequest = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(questionsActions.searchQuestion(searchText));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError, searchText]);

  useEffect(() => {
    renderSearchRequest();
  }, [dispatch, renderSearchRequest]);

  let result = (
    <View
      style={{
        paddingHorizontal: SCREEN_WIDTH / 20,
        paddingBottom: SCREEN_HEIGHT / 70,
      }}
    >
      <View style={styles.searchContainer}>
        <TextInput
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            setIsTouched(!touched);
          }}
          onBlur={() => setIsTouched(!touched)}
          placeholder="Search by title or body"
          placeholderTextColor="#708999"
          style={{
            width: "90%",
            height: SCREEN_HEIGHT / 17,
            fontFamily: "AvertaStd-Semibold",
            fontWeight: "normal",
          }}
        />
        <Ionicons
          name="search-outline"
          size={25}
          color="#ff4848"
          onPress={renderSearchRequest}
        />
      </View>
    </View>
  );

  const renderSearchedQuestions = ({ item }) => {
    return (
      <QuestionItem
        owner={item.owner}
        title={item.title}
        tags={item.tags}
        answerCount={item.answer_count}
        score={item.score}
        date={item.creation_date}
        viewDetail={() => {
          props.navigation.navigate("Detail", {
            questionId: item.id,
          });
        }}
      />
    );
  };

  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {result}
        <View style={styles.center}>
          <Text
            style={{
              fontFamily: "AvertaStd-Semibold",
              color: "#708999",
              fontSize: 20,
              textAlign: "center",
              paddingHorizontal: SCREEN_WIDTH / 20,
              paddingVertical: 20,
            }}
          >
            Oops!! an error occured
          </Text>
          <TouchableOpacity
            onPress={renderSearchRequest}
            activeOpacity={0.7}
            style={{
              backgroundColor: "#43516c",
              paddingHorizontal: SCREEN_WIDTH / 20,
              paddingVertical: SCREEN_HEIGHT / 80,
              borderRadius: 10,
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

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {result}
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#171d20" />
        </View>
      </View>
    );
  }
  if (searchText === "") {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {result}
        <View style={styles.center}>
          <Text style={styles.noResult}>
            Find solutions you are looking for
          </Text>
          <Text style={{ fontFamily: "AvertaStd-Regular", color: "#708999" }}>
            Search by title or body
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {result}
      {searchResults.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.noResult}>Couldn't find "{searchText}"</Text>
          <Text style={{ color: "#708999", fontFamily: "AvertaStd-Regular" }}>
            Try searching again with different keywords
          </Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={searchResults}
          renderItem={renderSearchedQuestions}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerTitleStyle: {
      fontSize: 30,
      fontFamily: "AvertaStd-Semibold",
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResult: {
    fontSize: 20,
    fontFamily: "AvertaStd-Semibold",
    color: "#001b3a",
    paddingHorizontal: SCREEN_WIDTH / 10,
    textAlign: "center",
  },
});

export default SearchScreen;

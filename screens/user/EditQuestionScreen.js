import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";

import * as questionsActions from "../../store/actions/question";

const EditQuestionScreen = (props) => {
  const { qid, title, body } = props.route.params;

  const [questionTitle, setQuestionTitle] = useState(title);
  const [questionBody, setQuestionBody] = useState(body);

  const dispatch = useDispatch();

  const postEditedQuestion = useCallback(async () => {
    console.log(questionTitle);
    await dispatch(
      questionsActions.editQuestion(qid, questionTitle, questionBody)
    );
  }, [dispatch, qid, questionTitle, questionBody]);

  useEffect(() => {
    postEditedQuestion();
  }, [dispatch, postEditedQuestion]);

  return (
    <View style={styles.editFormContainer}>
      <Text>Title</Text>
      <TextInput
        value={questionTitle}
        onChangeText={(text) => setQuestionTitle(text)}
        style={styles.input}
      />
      <Text>Body</Text>
      <TextInput
        value={questionBody}
        onChangeText={(text) => {
          setQuestionBody(text);
        }}
      />
      <Button title="post" onPress={postEditedQuestion} />
    </View>
  );
};

const styles = StyleSheet.create({
  editFormContainer: {
    margin: 20,
  },
  input: {
    padding: 3,
    borderWidth: 1,
  },
});

export default EditQuestionScreen;

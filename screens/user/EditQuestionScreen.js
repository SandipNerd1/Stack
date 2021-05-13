import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as questionsActions from "../../store/actions/question";
import TextEditor from "../../components/pocketstack/TextEditor";
import HeaderButton from "../../components/UI/HeaderButton";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const EditQuestionScreen = (props) => {
  const { qid, title, body } = props.route.params;
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [enablePushContent, setEnablePushContent] = useState(false);

  const [questionTitle, setQuestionTitle] = useState(title);
  const [questionBody, setQuestionBody] = useState(body);

  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setParams({ submit: postEditedQuestion });
  }, [postEditedQuestion]);

  const postEditedQuestion = useCallback(async () => {
    console.log(questionTitle);
    console.log(questionBody);
    await dispatch(
      questionsActions.editQuestion(qid, questionTitle, questionBody)
    );
  }, [dispatch, qid, questionTitle, questionBody]);

  // useEffect(() => {
  //   postEditedQuestion();
  // }, [dispatch, postEditedQuestion]);

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{ flex: 1, backgroundColor: "#f1f4f9" }}
      enabled={enablePushContent}
    >
      <View style={{ margin: SCREEN_WIDTH / 20 }}>
        <Text style={[styles.inputIdentifierText, { marginVertical: 10 }]}>
          Title
        </Text>
        <TextInput
          value={questionTitle}
          onChangeText={(text) => {
            console.log(text);
            setQuestionTitle(text);
          }}
          style={styles.input}
          onFocus={() => setEnablePushContent(false)}
        />
      </View>
      <Text
        style={[
          styles.inputIdentifierText,
          { marginHorizontal: SCREEN_WIDTH / 20 },
        ]}
      >
        Body
      </Text>
      <TextEditor
        initialHtml={questionBody}
        onHtmlChange={({ html }) => {
          console.log("html");
          setQuestionBody(html);
        }}
        onChangeText={({ oldContents }) => {
          console.log(oldContents);
        }}
        onFocus={() => setEnablePushContent(true)}
      />
      {/* <View style={styles.editorContainer}> */}
      {/* <View
        style={{
          borderWidth: 1,
          height: "70%",
          marginHorizontal: SCREEN_WIDTH / 20,
          borderRadius: 10,
          overflow: "hidden",
          marginVertical: SCREEN_HEIGHT / 40,
        }}
      >
        <QuillEditor
          style={styles.editor}
          ref={_editor}
          initialHtml={questionBody}
        />
        <QuillToolbar
          editor={_editor}
          theme="light"
          options={[
            ["bold", "italic", "underline", "strike"],
            [{ header: 1 }, { header: 2 }, { header: 3 }],
            [
              {
                color: [
                  "#000000",
                  "#e60000",
                  "#ff9900",
                  "yellow",
                  "#5eba7d",
                  "#f2720c",
                  "#379fef",
                ],
              },
            ],
          ]}
        />
      </View> */}

      {/* <Text>Body</Text>
      <TextInput
        value={questionBody}
        onChangeText={(text) => {
          setQuestionBody(text);
        }}
      /> */}
      {/* <Button title="post" onPress={postEditedQuestion} /> */}
    </KeyboardAvoidingView>
  );
};
export const screenOptions = (navData) => {
  const submitFn = navData.route.params ? navData.route.params.submit : null;
  return {
    headerTitleAlign: "center",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="post"
          buttonStyle={{ fontSize: 35 }}
          iconName="md-checkmark-sharp"
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  editFormContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dfe9f1",
    backgroundColor: "white",
    borderColor: "#dfe9f1",
  },
  inputBody: {
    marginVertical: SCREEN_HEIGHT / 60,
  },
  inputIdentifierText: {
    color: "#708999",
    fontWeight: "bold",
  },
  editor: {
    flex: 1,
    padding: 5,
    height: SCREEN_HEIGHT > 500 ? 200 : 100,
    borderWidth: 1,
    backgroundColor: "white",
  },
  editorContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#888",
    marginTop: SCREEN_HEIGHT / 40,
    overflow: "hidden",
    backgroundColor: "white",
    marginHorizontal: 20,
  },
});

export default EditQuestionScreen;

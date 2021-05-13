import React, { useState, useCallback, createRef } from "react";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Button,
} from "react-native";
// import type {
//   SelectionChangeData,
//   TextChangeData,
// } from 'react-native-cn-quill';
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import { useDispatch } from "react-redux";

import * as answerActions from "../../store/actions/answer";
import CustomButton from "../../components/UI/CustomButton";
import TextEditor from "../../components/pocketstack/TextEditor";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const CreateAnswerScreen = (props) => {
  const { qid } = props.route.params;
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();

  const onSubmitHandler = useCallback(async () => {
    if (answer === "") {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      console.log(answer);
      return;
    }
    console.log(answer);
    dispatch(answerActions.createAnswer(qid, answer));
    props.navigation.goBack();
  }, [dispatch, answer]);

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{ flex: 1, backgroundColor: "#f1f4f9" }}
      keyboardVerticalOffset={20}
    >
      <View
        style={{
          marginHorizontal: SCREEN_WIDTH / 20,
          marginVertical: SCREEN_HEIGHT / 50,
        }}
      >
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          Write your answers here!
        </Text>
      </View>
      <Text
        style={[
          styles.inputIdentifierText,
          {
            marginHorizontal: SCREEN_WIDTH / 10,
            marginTop: 10,
            fontWeight: "bold",
          },
        ]}
      >
        Body
      </Text>
      <TextEditor
        onHtmlChange={({ html }) => setAnswer(html)}
        style={[
          {
            height: 350,
          },
          styles.editorContainer,
        ]}
      />
      <Button title="submit" onPress={onSubmitHandler} />
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
          style={[styles.input, styles.editor]}
          ref={_editor}
          onHtmlChange={({ html }) => setAnswer(html)}
          quill={{
            // not required just for to show how to pass this props
            placeholder: "write your answer or your code here!",
            modules: {
              toolbar: false, // this is default value
            },
            theme: "bubble", // this is default value
          }}
          import3rdParties="local" // default value is 'local'
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    // marginHorizontal: 30,
    // marginVertical: 10,
    borderWidth: 1,
  },
  textbox: {
    height: 40,
    paddingHorizontal: 20,
  },
  editor: {
    flex: 1,
    padding: 0,
    backgroundColor: "white",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#ddd",
    padding: 10,
    margin: 3,
  },
  editorContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dfe9f1",
    marginTop: SCREEN_HEIGHT / 40,
    marginHorizontal: SCREEN_WIDTH / 20,
    overflow: "hidden",
    backgroundColor: "white",
  },
  inputIdentifierText: {
    color: "#708999",
    fontWeight: "bold",
  },
});

export default CreateAnswerScreen;

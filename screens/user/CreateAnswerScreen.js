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

const CreateAnswerScreen = (props) => {
  const { qid } = props.route.params;
  const _editor = createRef();
  const [disabled, setDisabled] = useState(false);
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();

  const handleEnable = () => {
    _editor.current?.enable(disabled);
    setDisabled(!disabled);
  };

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
    <SafeAreaView
      style={styles.root}
      onTouchStart={() => _editor.current?.blur()}
    >
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          Write your answers here!
        </Text>
      </View>
      <Text style={{ marginHorizontal: 30, fontWeight: "bold" }}>Body</Text>
      <View
        style={{
          borderWidth: 1,
          height: "60%",
          marginHorizontal: 20,
          borderRadius: 10,
          overflow: "hidden",
          marginVertical: 20,
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
      </View>
      {/* <View style={styles.buttons}>
        <TouchableOpacity onPress={handleEnable} style={styles.btn}>
          <Text>{disabled === true ? "Enable" : "Disable"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSubmitHandler}
          style={{ backgroundColor: "#ff4848", padding: 10 }}
        >
          <Text style={{ color: "white" }}>Submit</Text>
        </TouchableOpacity>
      </View> */}

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
    </SafeAreaView>
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
});

export default CreateAnswerScreen;

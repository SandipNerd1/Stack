import React, { useState, createRef, useRef } from "react";
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
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";

import CustomButton from "../UI/CustomButton";

const TextEditor = (props) => {
  const _editor = useRef();
  // const [disabled, setDisabled] = useState(false);

  return (
    <View>
      <Text>hi</Text>
      <QuillEditor
        style={[styles.input, styles.editor]}
        ref={_editor}
        onHtmlChange={({ html }) => setAnswer(html)}
        initialHtml="sdsdsdsdsd"
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
      <Text>jjh</Text>
      <View style={styles.buttons}>
        <CustomButton>
          <Text>submit</Text>
        </CustomButton>
      </View>

      {/* <QuillToolbar
        styles={{ marginHorizontal: 20 }}
        editor={_editor}
        {...props}
        theme="light"
        options={[
          ["bold", "italic", "underline", "strike"],
          [{ header: 2 }, { header: 3 }],
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
      /> */}
    </View>
  );
};

var styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },
  input: {
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: "grey",
  },
  textbox: {
    height: 40,
    paddingHorizontal: 20,
  },
  editor: {
    flex: 1,
    padding: 0,
    backgroundColor: "grey",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#ddd",
    padding: 10,
    margin: 3,
  },
});

export default TextEditor;

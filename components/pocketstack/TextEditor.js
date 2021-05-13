import React, { useRef } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const TextEditor = (props) => {
  const _editor = useRef();

  return (
    <View style={styles.editorContainer} {...props}>
      <QuillEditor
        style={[styles.input, styles.editor]}
        {...props}
        ref={_editor}
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
        styles={{
          toolset: { backgroundColor: "white", borderWidth: 0 },
        }}
        theme="light"
        {...props}
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
    </View>
  );
};

var styles = StyleSheet.create({
  input: {
    marginVertical: SCREEN_HEIGHT / 60,
  },
  editor: {
    flex: 1,
    padding: 5,
    // height: SCREEN_HEIGHT > 500 ? 200 : 100,
  },
  editorContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dfe9f1",
    marginVertical: SCREEN_HEIGHT / 40,
    marginHorizontal: SCREEN_WIDTH / 20,
    overflow: "hidden",
    backgroundColor: "white",
    height: SCREEN_HEIGHT > 500 ? 300 : 200,
    marginHorizontal: SCREEN_WIDTH / 20,
  },
});

export default TextEditor;

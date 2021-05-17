import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import {
  RichEditor,
  RichToolbar,
  actions,
  getContentCSS,
} from "react-native-pell-rich-editor";

const RichTextEditor = (props) => {
  const editor = useRef();
  const [isFocused, setIsFocused] = useState();
  return (
    <View>
      <RichEditor
        editorStyle={{
          backgroundColor: "#2e3847",
          color: "#fff",
          placeholderColor: "gray",
          contentCSSText: "font-size: 16px; min-height: 200px; height: 100%;",
        }} // default light style
        ref={editor}
        style={styles.rich}
        placeholder={"please input content"}
        //   initialContentHTML={initHTML}
        //   editorInitializedCallback={that.editorInitializedCallback}
        onChange={() => {
          console.log("changed");
        }}
        //   onHeightChange={that.handleHeightChange}
        //   onPaste={that.handlePaste}
        //   onKeyUp={that.handleKeyUp}
        //   onKeyDown={that.handleKeyDown}
        //   onMessage={that.handleMessage}
        // onFocus={that.handleFocus}
        // onBlur={that.handleBlur}
        pasteAsPlainText={true}
      />
      <RichToolbar
        style={styles.richBar}
        flatContainerStyle={styles.flatStyle}
        editor={editor}
        // disabled={disabled}
        selectedIconTint={"#2095F2"}
        disabledIconTint={"#bfbfbf"}
      // onPressAddImage={that.onPressAddImage}
      // onInsertLink={that.onInsertLink}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  richBar: {
    borderColor: "#efefef",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  flatStyle: {
    paddingHorizontal: 12,
  },
});

export default RichTextEditor;

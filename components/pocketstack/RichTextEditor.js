import React, { useState, useRef } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import {
  RichEditor,
  RichToolbar,
  actions,
  getContentCSS,
} from "react-native-pell-rich-editor";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const RichTextEditor = (props) => {
  const editor = useRef();
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: SCREEN_WIDTH / 20,
        marginVertical: SCREEN_HEIGHT / 40,
        borderRadius: 10,
        overflow: "hidden",
        height: 100,
      }}
    >
      <RichEditor
        editorStyle={{
          backgroundColor: "white",
          color: "#708999",
          placeholderColor: "gray",
          contentCSSText: "font-size: 16px; min-height: 200px; height: 100%;",
          height: 200,
        }} // default light style
        ref={editor}
        style={styles.rich}
        placeholder={"Enter your code here"}
        initialHeight={200}
        {...props}
        //   initialContentHTML={initHTML}
        //   editorInitializedCallback={that.editorInitializedCallback}
        // onChange={(h) => {
        //   console.log("changed");
        // }}
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
        selectedIconTint={"#ff4848"}
        disabledIconTint={"#708999"}
        iconTint={"#708999"}
        actions={[
          actions.keyboard,
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.undo,
          actions.redo,
          actions.setStrikethrough,
          actions.insertBulletsList,
          actions.insertOrderedList,
          // actions.heading1,
          // actions.heading4,
          // 'insertEmoji',
          // 'insertHTML',
          // 'fontSize',
        ]} // default defaultActions
      // onPressAddImage={that.onPressAddImage}
      // onInsertLink={that.onInsertLink}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rich: {
    // borderRadius: 20,
    flex: 1,
    height: 200,
  },
  richBar: {
    borderColor: "#708999",
    borderTopWidth: StyleSheet.hairlineWidth,
    // borderRadius: 10,
    backgroundColor: "white",
    color: "#708999",
  },
  flatStyle: {
    paddingHorizontal: 12,
  },
});

export default RichTextEditor;

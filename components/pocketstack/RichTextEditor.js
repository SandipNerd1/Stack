import React, { useState, useRef } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const RichTextEditor = (props) => {
  const editor = useRef();
  const scrollRef = useRef();

  const editorInitializedCallback = () => {
    scrollRef.current.scrollToEnd({ animated: true });
  };

  const handleCursorPosition = (scrollY) => {
    // Positioning scroll bar
    scrollRef.current.scrollTo({ y: scrollY - 30, animated: true });
  };

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: SCREEN_WIDTH / 20,
        marginVertical: SCREEN_HEIGHT / 40,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        scrollEventThrottle={20}
      >
        <RichEditor
          editorStyle={{
            backgroundColor: "white",
            color: "#708999",
            placeholderColor: "gray",
            contentCSSText: "font-size: 16px; min-height: 200px; height: 100%;",
          }} // default light style
          ref={editor}
          style={styles.rich}
          // placeholder={"Enter your code here"}
          initialContentHTML={`<p>Body must be at least 30 characters.</p>`}
          // editorInitializedCallback={editorInitializedCallback}
          handleCursorPosition={handleCursorPosition}
          useContainer={true}
          initialHeight={400}
          {...props}
          pasteAsPlainText={true}
        />
      </ScrollView>
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
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rich: {
    flex: 1,
    minHeight: 300,
  },
  richBar: {
    borderColor: "#708999",
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: "white",
    color: "#708999",
  },
  flatStyle: {
    paddingHorizontal: 12,
  },
});

export default RichTextEditor;

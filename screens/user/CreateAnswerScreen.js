import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  LogBox,
  Modal,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import * as answerActions from "../../store/actions/answer";
import HeaderButton from "../../components/UI/HeaderButton";
import RichTextEditor from "../../components/pocketstack/RichTextEditor";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const CreateAnswerScreen = (props) => {
  const { qid } = props.route.params;
  const [answer, setAnswer] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const onSubmitHandler = useCallback(async () => {
    if (answer === "") {
      Alert.alert("", "Wrong input! Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    try {
      setModalVisible(true);
      await dispatch(answerActions.createAnswer(qid, answer));
      setModalVisible(false);
      Alert.alert("", "Your answer was created successfully!", [
        { text: "Okay" },
        {
          text: "return",
          onPress: () => {
            props.navigation.goBack();
          },
        },
      ]);
    } catch (err) {
      setModalVisible(false);
      Alert.alert("", "An error occured!", [{ text: "return" }]);
    }
  }, [dispatch, qid, answer, setModalVisible]);

  useEffect(() => {
    props.navigation.setParams({ submit: onSubmitHandler });
  }, [onSubmitHandler]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f1f4f9",
      }}
    >
      <Modal
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
        animationType="fade"
      >
        <View
          style={{
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#43516c" />
        </View>
      </Modal>
      <Text
        style={[
          styles.inputIdentifierText,
          {
            marginHorizontal: SCREEN_WIDTH / 10,
            marginTop: 10,
          },
        ]}
      >
        Body
      </Text>
      <RichTextEditor
        onChange={(html) => {
          console.log(html);
          setAnswer(html);
        }}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  const { submit } = navData.route.params ? navData.route.params : null;
  return {
    headerTitleAlign: "center",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="post"
          buttonStyle={{ fontSize: 25 }}
          iconName="send"
          onPress={submit}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
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
    fontFamily: "AvertaStd-Semibold",
  },
  rich: {
    flex: 1,
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

export default CreateAnswerScreen;

import React, { useCallback, useEffect, useState, useReducer } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  LogBox,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as questionsActions from "../../store/actions/question";
import { getUserProfile, getUserData } from "../../store/actions/user";

import RichTextEditor from "../../components/pocketstack/RichTextEditor";
import HeaderButton from "../../components/UI/HeaderButton";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    console.log(updatedValues);
    return {
      inputValues: updatedValues,
    };
  }
};

const EditQuestionScreen = (props) => {
  const { qid, title, body } = props.route.params;
  const [enablePushContent, setEnablePushContent] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const userProfileData = useSelector((state) => state.userStatus.profileData);
  const userId = userProfileData.id;

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: title,
      body: body,
    },
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue) => {
      console.log(inputIdentifier);
      console.log(inputValue);
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    props.navigation.setParams({
      submit: postEditedQuestion,
      qid: qid,
      title: formState.inputValues.title,
      body: formState.inputValues.body,
    });
  }, [dispatch, postEditedQuestion, formState, qid]);

  const postEditedQuestion = useCallback(
    async (qid, title, body) => {
      if (title === "" || body === "") {
        Alert.alert("Wrong input!", "Please check the errors in the form.", [
          { text: "Okay" },
        ]);
        return;
      }
      try {
        setModalVisible(true);
        await dispatch(questionsActions.editQuestion(qid, title, body));
        await dispatch(getUserProfile());
        await dispatch(getUserData(userId));
        setModalVisible(false);
        Alert.alert("", "Question was edited successfully!", [
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
        Alert.alert("", "An error occured!", [{ text: "okay" }]);
        console.log(err);
      }
    },
    [dispatch, qid, formState, setModalVisible]
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f1f4f9" }}>
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
      <View style={{ margin: SCREEN_WIDTH / 20 }}>
        <Text style={[styles.inputIdentifierText, { marginVertical: 10 }]}>
          Title
        </Text>
        <TextInput
          defaultValue={formState.inputValues.title}
          onChangeText={(value) => {
            inputChangeHandler("title", value);
          }}
          style={styles.input}
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
      <RichTextEditor
        initialContentHTML={formState.inputValues.body}
        onChange={(html) => {
          inputChangeHandler("body", html);
        }}
      />
    </View>
  );
};
export const screenOptions = (navData) => {
  const { submit, qid, title, body } = navData.route.params
    ? navData.route.params
    : null;
  return {
    headerTitleAlign: "center",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="post"
          buttonStyle={{ fontSize: 25 }}
          iconName="send"
          onPress={() => {
            submit(qid, title, body);
          }}
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
    borderRadius: 10,
    borderColor: "#dfe9f1",
    backgroundColor: "white",
    color: "#708999",
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

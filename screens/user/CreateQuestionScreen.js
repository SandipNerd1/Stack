import React, { useRef, useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal,
  ActivityIndicator,
  LogBox,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Tags from "react-native-tags";

import * as questionsActions from "../../store/actions/question";
import HeaderButton from "../../components/UI/HeaderButton";
import RichTextEditor from "../../components/pocketstack/RichTextEditor";
import { getUserProfile, getUserData } from "../../store/actions/user";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const CreateQuestionScreen = (props) => {
  const _editor = useRef();
  const [disabled, setDisabled] = useState(false);
  const [title, setTitle] = useState("");

  const userProfileData = useSelector((state) => state.userStatus.profileData);

  const userId = userProfileData.id;

  const [questionBody, setQuestionBody] = useState("");
  const [tags, setTags] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const handleEnable = () => {
    _editor.current?.enable(disabled);
    setDisabled(!disabled);
  };

  const onSubmitHandler = useCallback(async () => {
    if (title === "" || questionBody.length <= 30 || tags.length <= 0) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    try {
      setModalVisible(true);
      await dispatch(
        questionsActions.createQuestion(title, questionBody, tags)
      );
      await dispatch(questionsActions.fetchQuestions());
      await dispatch(getUserProfile());
      await dispatch(getUserData(userId));
      setModalVisible(false);
      Alert.alert("", "Your question was created succesfully!", [
        {
          text: "Okay",
          onPress: () => {
            props.navigation.goBack();
          },
        },
      ]);
    } catch (err) {
      setModalVisible(false);
      Alert.alert("", "An error occured!", [{ text: "return" }]);
    }
  }, [dispatch, title, questionBody, tags, setModalVisible]);

  useEffect(() => {
    props.navigation.setParams({ submit: onSubmitHandler });
  }, [onSubmitHandler]);

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
      <View style={styles.formContainer}>
        <View style={{ marginHorizontal: SCREEN_WIDTH / 20 }}>
          <Text style={styles.inputIdentifierText}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
        </View>
        <View style={{ marginHorizontal: SCREEN_WIDTH / 20 }}>
          <Text style={styles.inputIdentifierText}>
            Tag (press space or comma to add tags)
          </Text>
          <Tags
            textInputProps={{
              placeholder: "example(java python)",
            }}
            tagContainerStyle={{ backgroundColor: "#ccc" }}
            onChangeTags={(tags) => {
              setTags(tags);
              console.log(tags);
            }}
            onTagPress={(index, tagLabel, event, deleted) =>
              console.log(
                index,
                tagLabel,
                event,
                deleted ? "deleted" : "not deleted"
              )
            }
            containerStyle={{ justifyContent: "center", marginBottom: 10 }}
            inputStyle={styles.tagInputStyle}
            maxNumberOfTags={5}
            createTagOnString={[" ", ",", "."]}
            renderTag={({
              tag,
              index,
              onPress,
              deleteTagOnPress,
              readonly,
            }) => (
              <TouchableOpacity
                key={`${tag}-${index}`}
                onPress={onPress}
                style={styles.tag}
              >
                <Text
                  style={{
                    color: "#708999",
                    fontFamily: "AvertaStd-Regular",
                  }}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
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
        onChange={(html) => {
          setQuestionBody(html);
        }}
      />
    </View>
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
          buttonStyle={{ fontSize: 25 }}
          iconName="send"
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: SCREEN_HEIGHT / 40,
  },
  input: {
    marginVertical: SCREEN_HEIGHT / 80,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "white",
    color: "#708999",
    fontFamily: "AvertaStd-Regular",
  },
  inputBody: {
    marginVertical: SCREEN_HEIGHT / 60,
  },
  tagInputStyle: {
    backgroundColor: "white",
    borderRadius: 10,
    color: "#708999",
    fontFamily: "AvertaStd-Regular",
  },
  tag: {
    marginHorizontal: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: "#dae5ee",
    borderRadius: 20,
  },
  editorContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#888",
    marginVertical: SCREEN_HEIGHT / 40,
    overflow: "hidden",
    backgroundColor: "white",
    height: "65%",
  },
  inputIdentifierText: {
    color: "#708999",
    fontFamily: "AvertaStd-Semibold",
  },
});

export default CreateQuestionScreen;

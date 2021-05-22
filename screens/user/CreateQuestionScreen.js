import React, {
  useRef,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  LogBox,
} from "react-native";
import { useDispatch } from "react-redux";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Tags from "react-native-tags";

import * as questionsActions from "../../store/actions/question";
import CustomButton from "../../components/UI/CustomButton";
import TextEditor from "../../components/pocketstack/TextEditor";
import HeaderButton from "../../components/UI/HeaderButton";
import RichTextEditor from "../../components/pocketstack/RichTextEditor";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const CreateQuestionScreen = (props) => {
  const _editor = useRef();
  const [disabled, setDisabled] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [enablePushContent, setEnablePushContent] = useState(false);
  const [title, setTitle] = useState("");

  const [questionBody, setQuestionBody] = useState("");
  const [tags, setTags] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const handleEnable = () => {
    _editor.current?.enable(disabled);
    setDisabled(!disabled);
  };

  const onSubmitHandler = useCallback(async () => {
    try {
      setModalVisible(true);
      await dispatch(
        questionsActions.createQuestion(title, questionBody, tags)
      );
      setModalVisible(false);
      Alert.alert("Post question", "Your question was submitted succesfully!", [
        {
          text: "Okay",
          onPress: () => {
            props.navigation.goBack();
          },
        },
      ]);
    } catch (err) {
      setModalVisible(false);
      Alert.alert("Error!", "An error occured while submitting the question!", [
        { text: "return" },
      ]);
    }
  }, [dispatch, title, questionBody, tags, setModalVisible]);

  useEffect(() => {
    props.navigation.setParams({ submit: onSubmitHandler });
  }, [onSubmitHandler]);

  return (
    <KeyboardAvoidingView
      // behavior="position"
      keyboardVerticalOffset={50}
      style={{ flex: 1, backgroundColor: "#f1f4f9" }}
      // enabled={enablePushContent}
    >
      <Modal
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
      >
        <View
          style={{
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      </Modal>
      <View style={styles.formContainer}>
        <View style={{ marginHorizontal: SCREEN_WIDTH / 20 }}>
          <Text style={styles.inputIdentifierText}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTitle(text)}
            value={title}
            onFocus={() => setEnablePushContent(false)}
          />
        </View>
        <View style={{ marginHorizontal: SCREEN_WIDTH / 20 }}>
          <Text style={styles.inputIdentifierText}>Tag</Text>
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
                <Text style={{ color: "#708999" }}>{tag}</Text>
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
          setAnswer(html);
        }}
      />
    </KeyboardAvoidingView>
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
    // marginHorizontal: SCREEN_WIDTH / 20,
    marginTop: SCREEN_HEIGHT / 40,
  },
  input: {
    marginVertical: SCREEN_HEIGHT / 80,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "white",
    color: "#708999",
  },
  inputBody: {
    marginVertical: SCREEN_HEIGHT / 60,
  },
  tagInputStyle: {
    backgroundColor: "white",
    borderRadius: 10,
    color: "#708999",
    // borderColor: "#dfe9f1",
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
    fontWeight: "bold",
  },
});

export default CreateQuestionScreen;

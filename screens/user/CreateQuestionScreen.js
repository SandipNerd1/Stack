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
} from "react-native";
import { useDispatch } from "react-redux";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Tags from "react-native-tags";

import * as questionsActions from "../../store/actions/question";
import CustomButton from "../../components/UI/CustomButton";
import HeaderButton from "../../components/UI/HeaderButton";

const CreateQuestionScreen = (props) => {
  const _editor = useRef();
  const [disabled, setDisabled] = useState(false);
  const [title, setTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();

  const handleEnable = () => {
    _editor.current?.enable(disabled);
    setDisabled(!disabled);
  };

  useEffect(() => {
    props.navigation.setParams({ submit: onSubmitHandler });
  }, [onSubmitHandler]);

  const onSubmitHandler = useCallback(() => {
    dispatch(questionsActions.createQuestion(title, questionBody, tags));
  });

  // const onSubmitHandler = useCallback(() => {
  //   if (!formState.formIsValid) {
  //     Alert.alert("Wrong input!", "Please check the errors in the form.", [
  //       { text: "Okay" },
  //     ]);
  //     return;
  //   }

  //   dispatch(
  //     questionsActions.createQuestion(
  //       formState.inputValues.title,
  //       formState.inputValues.body,
  //       formState.inputValues.tagList
  //     )
  //   );
  //   props.navigation.goBack();
  // }, [dispatch, formState]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      keyboardVerticalOffset={10}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 30, textAlign: "center" }}>
            Ask question relevant to the topic
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View>
            <Text>Title</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setTitle(text)}
              value={title}
            />
          </View>
          <View>
            <Text>Tag</Text>
            <Tags
              textInputProps={{
                placeholder: "example(java python)",
              }}
              tagContainerStyle={{ backgroundColor: "#ccc" }}
              onChangeTags={(tags) => setTags(tags)}
              onTagPress={(index, tagLabel, event, deleted) =>
                console.log(
                  index,
                  tagLabel,
                  event,
                  deleted ? "deleted" : "not deleted"
                )
              }
              containerStyle={{ justifyContent: "center" }}
              inputStyle={{
                backgroundColor: "white",
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#888",
              }}
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
                  style={{
                    marginHorizontal: 5,
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    backgroundColor: "#f1f4f9",
                    borderRadius: 20,
                  }}
                >
                  <Text>{tag}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View>
            <Text>Body</Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#888",
                marginTop: 20,
                overflow: "hidden",
                backgroundColor: "white",
              }}
            >
              <QuillEditor
                style={[styles.inputBody, styles.editor]}
                ref={_editor}
                onHtmlChange={({ html }) => setQuestionBody(html)}
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
          </View>
        </View>
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
        {/* <View style={styles.buttons}>
          <TouchableOpacity
            // onPress={onSubmitHandler}
            style={{ backgroundColor: "#ff4848", padding: 10 }}
          >
            <Text style={{ color: "white" }}>Submit</Text>
          </TouchableOpacity>
        </View> */}

        {/* <CustomButton>
          <Text>Submit</Text>
        </CustomButton> */}
      </ScrollView>
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
          buttonStyle={{ fontSize: 35 }}
          iconName="checkmark-circle"
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  formContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    marginVertical: 20,
    padding: 5,
    borderColor: "#888",
    borderRadius: 10,
    backgroundColor: "white",
  },
  inputBody: {
    marginVertical: 10,
  },
  editor: {
    flex: 1,
    padding: 5,
    height: 150,
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

export default CreateQuestionScreen;

import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import TextEditor from "../../components/pocketstack/TextEditor";

const TestScreen = (props) => {
  const _editor = useRef();
  const [answer, setAnswer] = useState();

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1, marginTop: 50 }}>
      <View style={{ height: 100 }}>
        <Text>sdkskdskd</Text>
      </View>
      <TextEditor onHtmlChange={({ html }) => console.log(html)} />
    </KeyboardAvoidingView>
  );
};

export default TestScreen;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";

import AnimatedButton from "../../components/UI/AnimatedButton";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const SampleUserProfileScreen = (props) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 40,
            paddingHorizontal: 30,
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
            }}
          >
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwSoQLn8t4J8qK3Hxf7HZoCt8o4bbPXbdypA&usqp=CAU",
              }}
              style={{ width: "100%", height: "100%", borderRadius: 75 }}
            />
          </View>
          <View style={{ width: "50%", marginHorizontal: 20 }}>
            <Text style={styles.userName}>SaitamaShi</Text>
            <Text style={styles.userDescription}>
              Frontend developer in languages like javascript,Html,css
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: SCREEN_WIDTH / 10 }}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeaderText}>Username</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeaderText}>First name</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeaderText}>Last name</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeaderText}>About me</Text>
            <TextInput style={styles.input} multiline />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeaderText}>Location</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeaderText}>Website Url</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 50,
  },
  inputContainer: {
    marginVertical: 10,
  },
  inputHeaderText: {
    fontFamily: "AvertaStd-Regular",
    color: "#708999",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#cfd8dd",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: "AvertaStd-Semibold",
    color: "#001b3a",
    fontSize: 16,
  },
  userName: {
    fontSize: 20,
    fontFamily: "AvertaStd-Semibold",
    color: "#001b3a",
  },
  userDescription: {
    fontFamily: "AvertaStd-Regular",
    color: "#708999",
    marginVertical: 5,
  },
});

export default SampleUserProfileScreen;

import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Animated } from "react-native-reanimated";

import Header from "../../components/UI/Header";

const data = [
  {
    title: "Sandip",
    body: "My name is Sandip singha",
    description:
      "hello this is sandip singha and in todays video we will be taking about the importance of how life sucks",
  },
  {
    title: "Subham",
    body: "My name is Subham singha",
    description:
      "hello this is sandip singha and in todays video we will be taking about the importance of how life sucks",
  },
  {
    title: "Kishor",
    body: "My name is Kishor singha",
    description:
      "hello this is sandip singha and in todays video we will be taking about the importance of how life sucks",
  },
  {
    title: "Nabin",
    body: "My name is Nabin singha",
    description:
      "hello this is sandip singha and in todays video we will be taking about the importance of how life sucks",
  },
  {
    title: "Bhamon",
    body: "My name is Nabin singha",
    description:
      "hello this is sandip singha and in todays video we will be taking about the importance of how life sucks",
  },
  {
    title: "SUWAR",
    body: "My name is Nabin singha",
    description:
      "hello this is sandip singha and in todays video we will be taking about the importance of how life sucks",
  },
  {
    title: "Fuddu",
    body: "My name is Nabin singha",
    description:
      "hello this is sandip singha and in todays video we will be taking about the importance of how life sucks",
  },
];

const TestScreen = (props) => {
  const scrollY = new Animated.Value(0);
  const headerY = Animated.interpolate(scrollY, {
    inputRange: [0, 70],
    outputRange: [0, -70],
  });
  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 70,
          backgroundColor: "grey",
          elevation: 1000,
          transform: [
            {
              translateY: headerY,
            },
          ],
        }}
      />
      <Animated.ScrollView
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ])}
      >
        {data.map((info) => (
          <View key={info.title} style={{ flex: 1, padding: 20 }}>
            <Text
              style={{ paddingVertical: 5, fontWeight: "bold", color: "black" }}
            >
              {info.title}
            </Text>
            <Text>{info.body}</Text>
            <Text>{info.description}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default TestScreen;

import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const Header = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#ff4848" }}>
      <View
        style={{
          // flexDirection: "row"
          paddingVertical: 40,
          paddingHorizontal: 20,
        }}
      >
        {/* <Text style={{ textAlign: "center" }}>questions</Text> */}
        {/* <Button
          title="plus"
          onPress={() => {
            props.navigation.navigate("create");
          }}
        /> */}
        {/* <AntDesign name="pluscircle" color="rgba(0,0,0,0.7)" size={35} /> */}
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>How can we help you?</Text>
      </View>
      <View style={styles.filterContainer}>
        {/* <Text
        style={{ paddingVertical: 20, fontWeight: "bold", fontSize: 20 }}
      >
        Top questions
      </Text> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 30,
            marginTop: -20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 5,
            elevation: 3,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 5,
              paddingHorizontal: 20,
              borderRadius: 20,
              backgroundColor: "#ff4848",
            }}
          >
            <MaterialIcons name="date-range" color="white" />
            <Text style={styles.active}>date</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 5,
              paddingHorizontal: 20,
              borderRadius: 20,
            }}
          >
            <MaterialIcons name="score" color="#888" />
            <Text style={styles.inactive}>score</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 5,
              paddingHorizontal: 20,
              borderRadius: 20,
            }}
          >
            <MaterialIcons name="question-answer" color="#888" />
            <Text style={styles.inactive}>answer</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    backgroundColor: "#ff4848",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  filterContainer: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
  },
  active: {
    color: "white",
    paddingHorizontal: 3,
    fontWeight: "bold",
  },
  inactive: {
    fontWeight: "bold",
    color: "#888",
    paddingHorizontal: 3,
    // borderRadius: 20,
    // borderWidth: 1,
  },
});

export default Header;

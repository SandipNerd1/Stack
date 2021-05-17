import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const FilterButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onFilterSubmit}>
      <View>
        <Text style={props.active ? styles.active : styles.inActive}>
          {props.buttonText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  active: {
    color: "#ff4848",
    fontWeight: "bold",
  },
  inActive: {
    color: "#708999",
  },
});

export default FilterButton;

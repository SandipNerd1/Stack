import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const FilterButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onFilterSubmit}>
      <View style={styles.filterButton}>
        <Text style={styles.filterText}>{props.buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    marginVertical: 10,
  },
  filterText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default FilterButton;

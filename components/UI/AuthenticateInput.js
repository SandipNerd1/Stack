import React from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const AuthenticateInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];


  return (
    <View style={styles.form}>
      <Text style={styles.label}>{props.title}</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name={props.iconName}
          style={{ width: "10%", textAlign: "center" }}
          size={17}
          color="#888"
        />
        <TextInput
          style={[styles.input, hasError && styles.errorInput]}
          value={value}
          onChangeText={(text) => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name)
            onBlur(name)
          }}
          {...inputProps}
          placeholderTextColor="#ccc"
        />
      </View>
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: "#cfd8dd",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
  },
  input: {
    width: "90%",
    paddingVertical: 7,
    paddingHorizontal: 3,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    marginVertical: 5,
    marginHorizontal: 5,
    fontSize: 10,
    color: 'red',
  },
  label: {
    marginVertical: 3,
    color: "#888",
    fontWeight: "bold",
  },
  form: {
    marginTop: SCREEN_HEIGHT / 60,
  },
});

export default AuthenticateInput;

import React from 'react'
import { Text, TextInput, StyleSheet } from 'react-native'


const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];
  
  return (
    <>
      <TextInput 
        style={[
          styles.textInput,
          hasError && styles.errorInput
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: 5,
    borderBottomColor: "#e0e6e9",
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderBottomColor: 'red',
  }
})

export default CustomInput

import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import StyledInput from "./StyledInput2";

export default function CardFieldInput({
  ref,
  label,
  value,
  onChangeText,
  onEndEditing,
  keyboardType,
  onFocus,
  ...props
}) {
  const [error, setError] = useState("");

  // const _onEndEditing = useCallback((text) => {
  //   onEndEditing && onEndEditing(text);
  // }, []);
  return (
    <StyledInput
      ref={ref}
      containerStyle={styles.input}
      inputStyle={{ fontFamily: "Mulish-Regular" }}
      keyboardType={keyboardType}
      returnKeyType="next"
      onSubmitEditing={() => {}}
      autoCompleteType="on"
      label={label}
      value={value}
      onChangeText={onChangeText}
      errorMessage={error}
      errorStyle={{ fontSize: 12, textAlign: "right" }}
      onFocus={onFocus}
      // onEndEditing={_onEndEditing}
      {...props}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: 56,
    marginTop: 20,
  },
});

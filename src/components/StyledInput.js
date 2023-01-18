import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";

const StyledInput = React.forwardRef((props, ref) => {
  const [Focused, setFocus] = useState(false);
  const [text, setText] = useState(props.value || "");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (props.reset) setText("");
  }, [props.reset]);
  if (props.value !== text) {
    setText(props.value);
    setTouched(true);
  }
  if (props.clearTextOnFocus && Focused && text.length) setText("");

  const updateText = (text) => {
    setText(text);
    props.onChangeText && props.onChangeText(text);
  };

  const _onEndEditting = (event) => {
    props.onEndEditing && props.onEndEditing(event.nativeEvent.text);
  };

  return (
    <Input
      ref={ref}
      containerStyle={props.containerStyle}
      inputContainerStyle={[
        styles.inputContainer,
        Focused
          ? { ...props.inputContainerStyle, ...props.focusedStyle }
          : props.inputContainerStyle,
      ]}
      inputStyle={[styles.inputText, props.inputStyle]}
      leftIcon={props.leftIcon}
      rightIcon={props.rightIcon}
      onChangeText={updateText}
      value={text}
      //onKeyPress={handleInput}
      errorMessage={!Focused ? props.errorMessage : ""}
      errorStyle={props.errorStyle}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor || "rgba(0,0,0,0.55)"}
      onFocus={() => {
        !touched && props.preffix
          ? updateText(props.preffix)
          : updateText(text);
        setFocus(true);
        setTouched(true);
        props.onFocus && props.onFocus();
      }}
      onBlur={() => {
        setFocus(false);
        props.onBlur && props.onBlur();
      }}
      blurOnSubmit={props.blurOnSubmit}
      keyboardType={props.keyboardType}
      returnKeyType={props.returnKeyType}
      onSubmitEditing={props.onSubmitEditing}
      autoFocus={false}
      caretHidden={props.caretHidden}
      secureTextEntry={props.secureTextEntry}
      clearTextOnFocus={props.clearTextOnFocus || false}
      onEndEditing={_onEndEditting}
      multiline={props.multiline}
      numberOfLines={props.numberOfLines}
      maxLength={props.maxLength}
      disabled={props.disabled}
      disabledInputStyle={props.disabledInputStyle}
      autoComplete="off"
      editable={props.editable}
    />
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "rgba(240,242,246,0.76)",
    height: 56,
    borderRadius: 10,
    paddingLeft: 18,
    borderBottomWidth: 0,
  },
  inputText: {
    fontFamily: "Mulish-Regular",
    color: "#000",
    fontSize: 14,
  },
});

export default StyledInput;

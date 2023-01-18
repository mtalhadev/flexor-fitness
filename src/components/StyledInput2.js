import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";

const StyledInput = React.forwardRef((props, ref) => {
  const [Focused, setFocus] = useState(false);
  const [text, setText] = useState(props.value);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (props.reset) setText("");
  }, [props.reset]);

  if (props.value !== text) {
    setText(props.value);
    setTouched(true);
  }
  if (props.clearTextOnFocus && Focused && text.length) setText("");

  //   const updateText = useCallback((text) => {
  //     setText(text);
  //     props.onChangeText && props.onChangeText(text);
  //   }, []);
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
      label={props.label}
      labelStyle={styles.label}
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

      // inputComponent={() => (
      //     <TextInputMask
      //         type={'custom'}
      //         options={{
      //             mask: props.mask
      //         }}
      //         value={text}
      //         onChangeText={text => {
      //             setText(text); props.onChangeText(text);
      //         }}
      //         style={props.inputStyle}

      //         />
      // )}
    />
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "transparent",
    width: "100%",
    height: 40,
    paddingLeft: 18,
  },
  inputText: {
    fontFamily: "Mulish-Bold",
    color: "#000",
    fontSize: 18,
  },
  label: {
    fontFamily: "Mulish-Regular",
    color: "#020306",
    fontSize: 14,
  },
});

export default StyledInput;

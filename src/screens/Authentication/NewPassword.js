import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import MulishText from "../../components/MulishText";
import PasswordInput from "../../components/PasswordInput";
import PrimaryButton from "../../components/PrimaryButton";
import Colors from "../../constants/Colors";
import { hp, wp } from "../../constants/Constants";
import { navigate } from "../../navigations/NavigationService";
import { resetPassword } from "../../redux/actions/AuthActions";
import { useIsLoading, useIstrainer } from "../../redux/reducers/AuthReducer";
import {
  validateResetPassword,
  validateSignup,
} from "../../services/AuthValidation";
import { _translate } from "../../localization";

function NewPassword({ insets, route }) {
  const userid = route?.params?.userid;
  const code = route?.params?.code;

  const isLoading = useIsLoading();

  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  });

  console.log({ formValues });

  const onSubmitValue = (key, value) => {
    console.log({ [key]: value });
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  const dispatch = useDispatch();

  const submitForm = () => {
    console.log("submitting form .....", formValues);

    if (validateResetPassword(formValues)) {
      dispatch(
        resetPassword({ userid, token: code, password: formValues.password })
      )
        .then(unwrapResult)
        .then((originalPromiseResult) => {
          if (originalPromiseResult == true) {
            navigate("Signin");
          }
        })
        .catch((rejectedValue) => {
          console.log("rejectedValue: ", rejectedValue);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      //keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{
          width: wp("100%"),
          height: hp("100%"),
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: hp("4%"),
          paddingTop: insets.top,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.textContainer}>
          <MulishText bold style={styles.heading}>
            {_translate("new")}{" "}
            <MulishText bold color={"#2B2C43"}>
              {_translate("password")}
            </MulishText>
          </MulishText>
          <MulishText style={styles.text}>
            {_translate("resetPasswordToRecover")}
            {"\n"}
            {_translate("loginAccount")}
          </MulishText>
        </View>

        <PasswordInput
          placeholder={_translate("newPassword")}
          containerStyle={{ height: 70, marginBottom: 10 }}
          inputContainerStyle={{ height: 70 }}
          onEndEditing={(text) => onSubmitValue("password", text)}
        />
        <PasswordInput
          placeholder={_translate("retypePassword")}
          containerStyle={{ height: 70, marginBottom: 60 }}
          inputContainerStyle={{ height: 70 }}
          onEndEditing={(text) => onSubmitValue("confirmPassword", text)}
        />
        <PrimaryButton
          title={_translate("confirm")}
          buttonStyle={{
            width: wp("85%"),
            height: 70,
            borderRadius: 10,
            marginBottom: hp("1%"),
          }}
          onPress={submitForm}
          loading={isLoading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  textContainer: {
    width: wp("85%"),
    height: hp("20%"),
    alignItems: "flex-start",
    justifyContent: "center",
    // backgroundColor: '#ddd',
  },
  heading: {
    color: Colors.primaryColor,
    fontSize: 26,
    marginBottom: 30,
  },
  text: {
    color: "rgba(43,44,67,.58)",
    fontSize: 16,
    marginBottom: 60,
    lineHeight: 24,
  },
  input: {
    width: wp("90%"),
    height: 56,
    marginTop: hp("2%"),
  },
  google: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default withSafeAreaInsets(NewPassword);

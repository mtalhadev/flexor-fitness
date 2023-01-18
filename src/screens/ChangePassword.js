import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { showAlert } from "react-native-customisable-alert";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import MulishText from "../components/MulishText";
import PasswordInput from "../components/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";
import RNToast from "../components/RNToast";
import Colors from "../constants/Colors";
import { hp, wp } from "../constants/Constants";
import { goBack, navigate } from "../navigations/NavigationService";
import { changePassword } from "../redux/actions/AuthActions";
import { useIsLoading } from "../redux/reducers/AuthReducer";
import { validateChangePassword } from "../services/AuthValidation";
import { _translate } from "../localization";
import NavigationHeader from "../components/NavigationHeader";
function ChangePassword({ insets, route }) {
  const isLoading = useIsLoading();

  const [formValues, setFormValues] = useState({
    password: "",
    newPassword: "",
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

    if (validateChangePassword(formValues)) {
      dispatch(changePassword(formValues))
        .then(unwrapResult)
        .then((originalPromiseResult) => {
          if (originalPromiseResult == true) {
            RNToast.showShort("Password Changed");
            goBack();
          }
        })
        .catch((rejectedValue) => {
          console.log("rejectedValue: ", rejectedValue);
          if (rejectedValue === "Invalid password")
            showAlert({
              title: `${_translate("somethingWentWrong")}`,
              message: "Incorrect old password",
              alertType: "error",
            });
          else
            showAlert({
              title: `${_translate("somethingWentWrong")}`,
              message: rejectedValue,
              alertType: "error",
            });
        });
    }
  };

  return (
    <KeyboardAvoidingView
      //keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={styles.container}
    >
      <NavigationHeader title={_translate("ChangePassword")} backArrow />
      <ScrollView
        contentContainerStyle={{
          width: wp("100%"),
          height: hp("100%"),
          alignItems: "center",
          // justifyContent: "center",
          paddingBottom: hp("4%"),
          paddingTop: insets.top,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.textContainer}>
          <MulishText bold style={styles.heading}>
            {`Change`}{" "}
            <MulishText bold color={"#2B2C43"}>
              {_translate("password")}
            </MulishText>
          </MulishText>
        </View>
        <PasswordInput
          placeholder={_translate("oldPassword")}
          containerStyle={{ height: 70, marginBottom: 10 }}
          inputContainerStyle={{ height: 70 }}
          onEndEditing={(text) => onSubmitValue("password", text)}
        />
        <PasswordInput
          placeholder={_translate("newPassword")}
          containerStyle={{ height: 70, marginBottom: 10 }}
          inputContainerStyle={{ height: 70 }}
          onEndEditing={(text) => onSubmitValue("newPassword", text)}
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

export default withSafeAreaInsets(ChangePassword);

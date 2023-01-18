import { unwrapResult } from "@reduxjs/toolkit";
import React, { createRef, useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { showAlert } from "react-native-customisable-alert";
import { useDispatch } from "react-redux";
import {
  useGetWalletLoading,
  useIsLoading,
  useWalletDetail,
} from "../../redux/reducers/PaymentReducer";
import CardFieldInput from "../../components/CardFieldInput";
import MulishText from "../../components/MulishText";
import NavigationHeader from "../../components/NavigationHeader";
import PrimaryButton from "../../components/PrimaryButton";
import Row from "../../components/Row";
import StyledDropdown from "../../components/StyledDropdown";
import StyledInput from "../../components/StyledInput";
import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { HEIGHT, hp, WIDTH, wp } from "../../constants/Constants";
import {
  CONTACT_TYPE,
  COUNTRIES,
  COUNTRIES_CODE,
  TYPE,
} from "../../constants/Data";
import { _translate } from "../../localization";
import {
  addPaymentDetails,
  changeWalletDetails,
} from "../../redux/actions/PaymentAction";
import { validateAddPayment } from "../../services/AddPaymentValidation";
import { goBack, navigate } from "../../navigations/NavigationService";
import RNToast from "../../components/RNToast";
import StyledDropdown2 from "../../components/StyledDropdown2";
const inititialState = {
  type: "",
  first_name: "",
  last_name: "",
  mother_name: "",
  mothers_name: "",
  phone_number: "",
  zip: "",
  contact_type: "",
  line_1: "",
  line_2: "",
  country: "",
  state: "",
  email: "",
};

const formFields = [
  "type",
  "phone_number",
  "email",
  "first_name",
  "last_name",
  "mother_name",
  "mothers_name",
  "contact_type",
  "line_1",
  "line_2",
  "state",
  "zip",
  "country",
];

export default function AddPaymentDetails() {
  const loading = useIsLoading();
  const getWalletLoading = useGetWalletLoading();
  const walletDetail = useWalletDetail();
  const dispatch = useDispatch();

  const scrollView = useRef();

  const [formValues, setFormValues] = useState(inititialState);

  useEffect(() => {
    console.log("resetting");
    setFormValues(inititialState);
  }, []);

  useEffect(() => {
    if (Object.keys(walletDetail).length != 0) {
      setFormValues({
        ...formValues,
        type: walletDetail.typeWallet,
        phone_number: walletDetail.contact.address.phone_number,
        email: walletDetail.contact.email,
        first_name: walletDetail.first_name,
        last_name: walletDetail.last_name,
        mothers_name: walletDetail.contact.mothers_name,
        mother_name: walletDetail.contact.mothers_name,
        contact_type: walletDetail.contact.contact_type,
        line_1: walletDetail.contact.address.line_1,
        line_2: walletDetail.contact.address.line_2,
        state: walletDetail.contact.address.state,
        zip: walletDetail.contact.address.zip,
        country: walletDetail.contact.address.country,
      });
    } else {
      setFormValues(inititialState);
    }
  }, [walletDetail]);

  console.log("formvalues global", formValues);
  const inputRef = {
    type: createRef(),
    phone_number: createRef(),
    email: createRef(),
    first_name: createRef(),
    last_name: createRef(),
    mother_name: createRef(),
    mothers_name: createRef(),
    contact_type: createRef(),
    line_1: createRef(),
    line_2: createRef(),
    state: createRef(),
    zip: createRef(),
    country: createRef(),
  };

  const onAddPayment = () => {
    console.log("formValues in add payment", formValues);
    let formValuesTemp = { ...formValues };
    console.log("formValuesTemp validating", formValuesTemp);
    console.log("formFields validating", formFields);
    if (validateAddPayment(formValuesTemp, formFields)) {
      let submitingValues = {
        type: formValuesTemp.type,
        contact: {
          first_name: formValuesTemp.first_name,
          last_name: formValuesTemp.last_name,
          phone_number: formValuesTemp.phone_number,
          mother_name: formValuesTemp.mother_name,
          contact_type: formValuesTemp.contact_type,
          email: formValuesTemp.email,
          address: {
            line_1: formValuesTemp.line_1,
            line_2: formValuesTemp.line_2,
            state: formValuesTemp.state,
            zip: formValuesTemp.zip,
            country: formValuesTemp.country,
          },
        },
      };
      console.log("submiting values in add payment", submitingValues);

      if (Object.keys(walletDetail).length == 0) {
        dispatch(addPaymentDetails(submitingValues))
          .then(unwrapResult)
          .then((originalPromiseResult) => {
            console.log("originalPromiseResult", originalPromiseResult);
            const result = originalPromiseResult;
            console.log("result", result);
            console.log("raypdVerificationUrl", result.raypdVerificationUrl);
            if (result) {
              navigate("WalletVerificationScreen", {
                url: result.raypdVerificationUrl,
              });
            }
            // }
          })
          .catch((rejectedValue) => {
            console.log("rejectedValue: ", rejectedValue);
            showAlert({
              title: `${_translate("Something went wrong!")}`,
              message: rejectedValue,
              alertType: "error",
            });
          });
      } else {
        dispatch(
          changeWalletDetails({
            wallet_id: walletDetail.ewallet,
            values: submitingValues,
          })
        )
          .then(unwrapResult)
          .then((originalPromiseResult) => {
            if (originalPromiseResult == true) {
              RNToast.showShort("Wallet Successfully Updated");
              goBack();
            }
          })
          .catch((rejectedValue) => {
            console.log("rejectedValue: ", rejectedValue);
            showAlert({
              title: `${_translate("Something went wrong!")}`,
              message: rejectedValue,
              alertType: "error",
            });
          });
      }
    }
  };

  console.log("wallet detail global", walletDetail);
  const onSubmitValue = (key, value) => {
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={styles.container}
    >
      <NavigationHeader title={_translate("AddPaymentInfo")} backArrow />
      {getWalletLoading ? (
        <View
          style={{
            height: HEIGHT,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator
            size="large"
            color={Colors.primaryColor}
            style={{ marginHorizontal: wp("40%") }}
          />
        </View>
      ) : (
        <ScrollView ref={scrollView} bounces={false}>
          <View style={styles.scroll}>
            <View style={{ marginBottom: 40 }}>
              <StyledDropdown
                placeholder={_translate("Type")}
                listTitle={"Type"}
                items={TYPE}
                initialItems={[formValues["type"]]}
                onSelectItem={(text) => {
                  onSubmitValue("type", text);
                  if (text == "company") {
                    onSubmitValue("contact_type", "business");
                  } else if (text == "person") {
                    onSubmitValue("contact_type", "personal");
                  }
                }}
              />
            </View>

            <MulishText semiBold style={styles.heading}>
              {_translate("Contact")}
            </MulishText>

            <StyledInput
              ref={inputRef["phone_number"]}
              containerStyle={CommonStyles.input}
              placeholder={_translate("Phone Number")}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={(text) => onSubmitValue("phone_number", text)}
              onSubmitEditing={() => inputRef.email.current.focus()}
              value={formValues.phone_number}
            />

            <StyledInput
              ref={inputRef["email"]}
              containerStyle={CommonStyles.input}
              placeholder={_translate("Email")}
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={(text) => onSubmitValue("email", text)}
              onSubmitEditing={() => inputRef.first_name.current.focus()}
              value={formValues.email}
            />

            <StyledInput
              ref={inputRef["first_name"]}
              containerStyle={CommonStyles.input}
              placeholder={_translate("First Name")}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={(text) => onSubmitValue("first_name", text)}
              onSubmitEditing={() => inputRef.last_name.current.focus()}
              value={formValues.first_name}
            />

            <StyledInput
              ref={inputRef["last_name"]}
              containerStyle={CommonStyles.input}
              placeholder={_translate("Last Name")}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={(text) => onSubmitValue("last_name", text)}
              onSubmitEditing={() => inputRef.mothers_name.current.focus()}
              value={formValues.last_name}
            />

            <StyledInput
              ref={inputRef["mothers_name"]}
              containerStyle={CommonStyles.input}
              placeholder={_translate("MotherName")}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={(text) => onSubmitValue("mother_name", text)}
              value={
                formValues.mothers_name
                  ? formValues.mothers_name
                  : formValues.mother_name
              }
            />

            <StyledInput
              ref={inputRef["contact_type"]}
              containerStyle={CommonStyles.input}
              placeholder={_translate("Contact Type")}
              keyboardType="default"
              returnKeyType="next"
              // onChangeText={(text) => onSubmitValue("contact_type", text)}
              editable={false}
              value={formValues.contact_type}
            />

            {/* <StyledDropdown
              placeholder={_translate("Contact Type")}
              initialItems={[formValues["contact_type"]]}
              // initialItems={formValues["type"]=="Company"?"business":"personal"}
              listTitle={"Contact Type"}
              editable={formValues["type"]?true:true}
              items={CONTACT_TYPE}
              onSelectItem={(text) => {
                console.log("formValues[type]", formValues["type"]);
                onSubmitValue("contact_type", text);
              }}
            /> */}
          </View>
          <View style={styles.formContainer}>
            <MulishText semiBold style={styles.heading}>
              {_translate("Address")}
            </MulishText>

            <View style={styles.whiteBackground}>
              <View style={{ height: 200 }}>
                <CardFieldInput
                  ref={inputRef["line_1"]}
                  label={_translate("Line 1")}
                  keyboardType="default"
                  onChangeText={(text) => onSubmitValue("line_1", text)}
                  // onSubmitEditing={() => inputRef.line_2.current.focus()}
                  value={formValues.line_1}
                />
                <CardFieldInput
                  ref={inputRef["line_2"]}
                  label={_translate("Line 2")}
                  keyboardType="default"
                  onChangeText={(text) => onSubmitValue("line_2", text)}
                  // onSubmitEditing={() => inputRef.state.current.focus()}
                  value={formValues.line_2}
                />
                <Row
                  style={{ width: wp("90%"), justifyContent: "space-between" }}
                >
                  <View style={{ width: wp("45%") }}>
                    <CardFieldInput
                      ref={inputRef["state"]}
                      label={_translate("State")}
                      keyboardType="default"
                      onChangeText={(text) => onSubmitValue("state", text)}
                      // onSubmitEditing={() => inputRef.zip.current.focus()}
                      value={formValues.state}
                    />
                  </View>
                  <View style={{ width: wp("45%") }}>
                    <CardFieldInput
                      ref={inputRef["zip"]}
                      label={_translate("Zip")}
                      keyboardType="number-pad"
                      maxLength={5}
                      onChangeText={(text) => onSubmitValue("zip", text)}
                      value={formValues.zip}
                    />
                  </View>
                </Row>
                {/* <CardFieldInput
                  ref={inputRef["country"]}
                  label={_translate("Country")}
                  keyboardType="default"
                  onChangeText={(text) => onSubmitValue("country", text)}
                  value={formValues.country}
                /> */}
                <StyledDropdown2
                  // placeholder={_translate("Country")}
                  initialItems={[formValues["country"]]}
                  listTitle={"Country"}
                  items={COUNTRIES_CODE}
                  onSelectItem={(text) => {
                    console.log("text", text);
                    onSubmitValue("country", text);
                  }}
                />
              </View>
            </View>

            <PrimaryButton
              title={
                Object.keys(walletDetail).length != 0
                  ? _translate("UpdatePaymentDetails")
                  : _translate("AddPaymentDetails")
              }
              buttonStyle={{ width: wp("80%"), height: 62, borderRadius: 10 }}
              containerStyle={{ marginTop: hp("3%") }}
              onPress={() => {
                console.log("on press", formValues);
                onAddPayment();
              }}
              loading={loading}
            />
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },

  formContainer: {
    width: WIDTH,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: wp("10%"),
    marginBottom: hp("3%"),
  },

  heading: {
    color: "#3D374F",
    fontSize: wp("6%"),
    textAlign: "center",
    marginHorizontal: wp("10%"),
    marginTop: -hp("3%"),
  },

  scroll: {
    width: WIDTH,
    height: 560,
    marginBottom: 40,
    alignItems: "center",
  },

  whiteBackground: {
    width: wp("100%"),
    height: 320,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: hp("5%"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

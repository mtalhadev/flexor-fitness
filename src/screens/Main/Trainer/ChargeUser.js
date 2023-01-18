import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { showAlert } from "react-native-customisable-alert";
import { Avatar } from "react-native-elements";
import images from "../../../assets/images";
import MulishText from "../../../components/MulishText";
import NavigationHeader from "../../../components/NavigationHeader";
import PrimaryButton from "../../../components/PrimaryButton";
import StyledInput from "../../../components/StyledInput";
import Colors from "../../../constants/Colors";
import CommonStyles from "../../../constants/CommonStyles";
import { hp, wp } from "../../../constants/Constants";
import { useUser } from "../../../redux/reducers/AuthReducer";
import { chargeClientApi } from "../../../services/FetchApiService";
import { useToken } from "../../../utilities/hooks";
import { _translate } from "../../../localization";
export default function ChargeUser({ navigation, route }) {
  const user = useUser();
  const token = useToken();
  const client = route.params.item;
  const [state, setState] = useState({
    amount: 0,
    paymentFor: "",
  });

  const chargeRequestHandler = () => {
    if (!state.amount) {
      alert(`${_translate("pleaseAddAmount")}`);
      return;
    }
    if (!state.paymentFor) {
      alert(`${_translate("pleaseAddReason")}`);
      return;
    }
    const data = {
      title: state.paymentFor,
      amount: state.amount,
      client: client._id,
    };
    chargeClientApi(data, token.Token, (res) => {
      if (res.success) {
        showAlert({
          title: `${_translate("success")}`,
          message: res.message,
          alertType: "success",

          onPress: () => {
            navigation.goBack();
          },
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <NavigationHeader
        title={`${_translate("charge")} ${client.name}`}
        backArrow={true}
        navigation={navigation}
      />
      <Avatar source={{ uri: client.image }} size={70} rounded />

      <MulishText
        bold
        color="rgba(0,0,0,.53)"
        fontSize={14}
        style={{ marginTop: 8, marginBottom: 20 }}
      >
        {client.email}
      </MulishText>
      <MulishText
        color="rgba(0,0,0,.53)"
        fontSize={14}
        style={{ width: wp("90%"), lineHeight: 24 }}
      >
        {_translate(
          "EnterTheAmountYouWantToChargeTheClient"
        )}
      </MulishText>

      <View style={{ marginTop: 33 }}>
        <MulishText
          bold
          color="rgba(0,0,0,.55)"
          fontSize={17}
          style={{ width: wp("90%") }}
        >
          {_translate("amount")}
        </MulishText>
        <StyledInput
          containerStyle={[CommonStyles.input, { paddingLeft: 0 }]}
          inputContainerStyle={{ width: wp("90%"), marginLeft: 0 }}
          placeholder={_translate("enterAmount")}
          keyboardType="decimal-pad"
          returnKeyType="done"
          onChangeText={(text) => {
            setState({ ...state, amount: text });
          }}
          autoCompleteType="off"
          value={state.amount}
          // onChangeText={onChangeText}
          // errorMessage={error}
          // errorStyle={{ fontSize: 12, textAlign: 'right' }}
          // onFocus={() => { setError('') }}
          // onEndEditing={_onEndEditing}
        />
        <View style={{ marginTop: hp("2%") }}>
          <MulishText
            bold
            color="rgba(0,0,0,.55)"
            fontSize={17}
            style={{ width: wp("90%") }}
          >
            {_translate("whatThisPaymentIsFor")}
          </MulishText>
          <StyledInput
            containerStyle={[CommonStyles.input, { paddingLeft: 0 }]}
            inputContainerStyle={{ width: wp("90%"), marginLeft: 0 }}
            placeholder={_translate("enterDetail")}
            returnKeyType="done"
            onChangeText={(text) => {
              setState({ ...state, paymentFor: text });
            }}
            autoCompleteType="off"
            value={state.paymentFor}
          />
        </View>
        <PrimaryButton
          title={_translate("sendChargeRequest")}
          buttonStyle={{
            width: wp("90%"),
            height: 56,
            borderRadius: 10,
            marginTop: 56,
          }}
          onPress={chargeRequestHandler}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
});

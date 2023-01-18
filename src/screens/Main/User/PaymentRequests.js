import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { showAlert } from "react-native-customisable-alert";
import images from "../../../assets/images";
import ClientRequestCard from "../../../components/ClientRequestCard";
import MulishText from "../../../components/MulishText";
import NavigationHeader from "../../../components/NavigationHeader";
import PaymentRequestCard from "../../../components/PaymentRequestCard";
import PrimaryButton from "../../../components/PrimaryButton";
import SecondaryButton from "../../../components/SecondaryButton";
import Colors from "../../../constants/Colors";
import { AUTH_TOKEN, hp, wp } from "../../../constants/Constants";
import { navigate } from "../../../navigations/NavigationService";
import { _translate } from '../../../localization';

import {
  allPaymentSend,
  getPaymentRequest,
  paymentSend,
} from "../../../services/FetchApiService";
import LocalStorage from "../../../services/LocalStorage";
import { useToken } from "../../../utilities/hooks";

export default function PaymentRequests({ navigation }) {
  // const {Token} = useToken();
  const [chargeRequest, setChargeRequest] = useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getPaymentRequestHandler();
    });
    return unsubscribe;
  }, [navigation]);

  const getPaymentRequestHandler = async () => {
    const token = await LocalStorage.getData(AUTH_TOKEN);
    console.log(token, "IS TOKEN?");
    getPaymentRequest(token, (res) => {
      if (res.success) {
        // alert(res.charges.length,"<----")
        setChargeRequest(res.charges);
      } else {
        setChargeRequest([]);
      }
    });
  };

  const paymentSendHandler = async (item, accept) => {
    const token = await LocalStorage.getData(AUTH_TOKEN);
    paymentSend(accept, item._id, token, (res) => {
      console.log(res);
      if (res.success) {
        showAlert({
          title: "success",
          message: res.message,
          alertType: "success",
        });
        getPaymentRequestHandler();
      }
    });
  };

  const allPaymentSendHandler = (accept) => {
    allPaymentSend(accept, Token, (res) => {
      if (res.success) {
        showAlert({
          title: "success",
          message: res.message,
          alertType: "success",
        });
        getPaymentRequestHandler();
      }
    });
  };

  // alert(requests?.length)

  return (
    <View style={styles.container}>
      <NavigationHeader title={_translate("paymentRequests")} backArrow={true} />

      {chargeRequest !== false ? (
        <FlatList
          data={chargeRequest}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <PaymentRequestCard
              item={item}
              paymentSendHandler={paymentSendHandler}
            />
          )}
          style={{ width: "100%", paddingHorizontal: wp("5%") }}
          ListHeaderComponent={() => (
            <MulishText
              color="rgba(0,0,0,.53)"
              fontSize={14}
              style={{ width: wp("90%"), lineHeight: 24 }}
            >
              {_translate("followingAreThePaymentRequests")}
            </MulishText>
          )}
          ListFooterComponent={() =>
            chargeRequest.length > 0 ? (
              <>
                <PrimaryButton
                  title={"Pay All"}
                  buttonStyle={{
                    width: wp("90%"),
                    height: 56,
                    borderRadius: 10,
                    marginTop: 50,
                    backgroundColor: "#AFAFAF",
                  }}
                  onPress={() => {
                    allPaymentSendHandler(true);
                  }}
                />
                <PrimaryButton
                  title={_translate("declineAllRequests")}
                  buttonStyle={{
                    width: wp("90%"),
                    height: 56,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                  onPress={() => {
                    allPaymentSendHandler(false);
                  }}
                />
              </>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "75%",
                }}
              >
                <MulishText color={'#999'}>{_translate("thereAreNoRequestsYet")}</MulishText>
              </View>
            )
          }
        />
      ) : (
        <ActivityIndicator color={Colors.secondaryColor} />
      )}
      <SecondaryButton
        title={_translate("seePaymentHistory")}
        containerStyle={{
          width: wp("80%"),
          marginTop: 50,
          marginBottom: 30,
        }}
        buttonStyle={{
          height: 30,
          borderWidth: 0,
          borderRadius: 30,
          paddingVertical: 0,
        }}
        titleStyle={{ color: "#000", fontSize: 14 }}
        onPress={() => {
          navigate("PaymentHistory");
        }}
      />

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

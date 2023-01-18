import { useIsFocused } from "@react-navigation/native";
import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { showAlert } from "react-native-customisable-alert";
import { useDispatch } from "react-redux";
import MulishText from "../../components/MulishText";
import NavigationHeader from "../../components/NavigationHeader";
import OfferCard from "../../components/OfferCard";
import Colors from "../../constants/Colors";
import { rf, wp, hp } from "../../constants/Constants";
import { fetchOffers, purchaseOffer } from "../../redux/actions/OfferActions";
import { useIsLoading, useOffers } from "../../redux/reducers/OffersReducer";
import { useDispatchEffect } from "../../utilities/hooks";
import { _translate } from "../../localization";
import RNToast from "../../components/RNToast";
import { navigate } from "../../navigations/NavigationService";

export default function Offers() {
  const dispatch = useDispatch();
  const offers = useOffers();
  const loading = useIsLoading();

  const isFocused = useIsFocused();

  const onRefresh = useDispatchEffect(fetchOffers, null, isFocused);

  const onPurchaseRequest = (id) => {
    dispatch(purchaseOffer({ offerId: id }))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        const raypdRedirectUrl = originalPromiseResult;
        if (raypdRedirectUrl) {
          navigate("Checkout", { url: raypdRedirectUrl });
        }
      })
      .catch((rejectedValue) => {
        console.log("rejectedValue: ", rejectedValue);
        showAlert({
          title: "Error",
          message: JSON.stringify(rejectedValue),
          alertType: "error",
        });
      });
  };

  return (
    <View style={styles.container}>
      <NavigationHeader title={_translate("offers")} backArrow={true} />

      <MulishText
        color="rgba(0,0,0,.53)"
        fontSize={14}
        style={{ width: wp("90%"), lineHeight: 24, marginVertical: 20 }}
      >
        {_translate("OffersThatYouCanUse")}
      </MulishText>

      {loading ? (
        <ActivityIndicator color={Colors.primaryColor} />
      ) : (
        <FlatList
          data={offers}
          renderItem={({ item, index }) => (
            <OfferCard
              {...item}
              onGetOffer={() => onPurchaseRequest(item._id)}
            />
          )}
          keyExtractor={(item, i) => item._id}
          style={{ width: "100%", padding: 5 }}
          contentContainerStyle={{ alignItems: "center" }}
          ListEmptyComponent={() => (
            <View
              style={{
                height: hp("70%"),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MulishText fontSize={rf(2.0)} color="#999" style={styles.text}>
                {_translate(`noOffersYet`)}
              </MulishText>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
        />
      )}
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
  text: {
    textAlign: "center",
    marginHorizontal: wp("5%"),
  },
});

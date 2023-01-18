import { useRoute } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import RNToast from "../components/RNToast";
import Colors from "../constants/Colors";
import { hp } from "../constants/Constants";
import { goBack } from "../navigations/NavigationService";

const CHECKOUT_COMPLETE_URL =
  "https://flexor.is/api/trainer/verifywallet/";
const CHECKOUT_FAILED_URL = "https://flexor.is/failed";

export default function WalletVerificationScreen() {
  const route = useRoute();
  const url = route.params.url;
  return (
    <WebView
      source={{ uri: url || "https://flexor-18650.web.app/" }}
      style={{
        marginTop: 20,
        width: "100%",
        flex: 1,
        height: hp("100%"),
        backgroundColor: "#FAFAFA",
      }}
      startInLoadingState={true}
      renderLoading={() => (
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      )}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn("WebView error: ", nativeEvent);
      }}
      onNavigationStateChange={(navState) => {
        const url = navState.url;
        console.log("navState.url: ", url);
        // if (url.includes(CHECKOUT_COMPLETE_URL_OFFER)) {
        //   setTimeout(() => {
        //     goBack();
        //   }, 3000);
        // }
        if(url.includes(CHECKOUT_COMPLETE_URL) || url.includes(CHECKOUT_FAILED_URL)){
          setTimeout(() => {
            RNToast.showShort("Wallet Verified");
            goBack();
          }, 2000);
        }
      }}
    />
  );
}

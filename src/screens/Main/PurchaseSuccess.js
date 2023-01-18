import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import images from "../../assets/images";
import MulishText from "../../components/MulishText";
import SecondaryButton from "../../components/SecondaryButton";
import Colors from "../../constants/Colors";
import { hp, wp } from "../../constants/Constants";
import { navigate, pop, reset } from "../../navigations/NavigationService";
import { useMembership, useMemberships } from "../../redux/reducers/ProfileReducer";
import { _translate } from "../../localization";

export default function PurchaseSuccess() {
  const navigation = useNavigation();
  const navState = navigation.getParent().getState();
  const membership = useMembership(); 
  const maxClients = membership?.maxClients === "1" ? `1 Client` : 
                     membership?.maxClients === "50" ? `2 - 50 Clients`: 'Unlimited Clients'; 

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: hp("10%"),
        }}
      >
        <Image
          source={images.illustration}
          style={[styles.image, { marginBottom: hp("5%") }]}
        />

        <MulishText
          bold
          fontSize={hp("3%")}
          color={"#1E3354"}
          style={{ textAlign: "center", width: wp("70%"), marginBottom: 10 }}
        >
          {_translate("yourMembershipHasBeenPurchased")}
        </MulishText>
        <MulishText
          fontSize={hp("2%")}
          color={"#1E3354"}
          style={{ textAlign: "center", width: wp("75%") }}
        >
          {`${_translate("thankYouForTheGoingWith")} ${membership?.title} ${_translate("membershipYouCanTrainWith")} ${maxClients}.`}
        </MulishText>
      </View>

      <SecondaryButton
        title={_translate("backToHome")}
        buttonStyle={{ width: wp("50%"), height: 62, borderRadius: 10 }}
        containerStyle={{ marginBottom: 20 }}
        onPress={() => {
          navState.routeNames.includes("BottomTabs") ? reset("BottomTabs") : navigation.navigate("Main");
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.background,
  },
  image: {
    width: wp("80%"),
    height: hp("40%"),
    resizeMode: "contain",
  },
});

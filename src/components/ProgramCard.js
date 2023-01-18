/* eslint-disable react-native/no-raw-text */
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Chip, Image } from "react-native-elements";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import { rf, wp } from "../constants/Constants";
import { navigate } from "../navigations/NavigationService";
import { setProgramDetails } from "../redux/reducers/ClientReducer";
import PoppinsText from "./PoppinsText";
import Row from "./Row";
import { _translate } from "../localization"

export default function ProgramCard(props) {
  const { _id, title, subtitle, daily, price, image } = props;

  const dispatch = useDispatch();

  return (
    <Pressable
      onPress={() => {
        dispatch(setProgramDetails(props));
        navigate("ProgramDetails");
      }}
    >
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />

        <View
          style={{
            width: "100%",
            height: wp("25%"),
            paddingHorizontal: wp("2%"),
            justifyContent: "space-evenly",
          }}
        >
          <PoppinsText semiBold fontSize={rf(1.9)} color={"#2E2A2A"}>
            {title}
          </PoppinsText>
          <PoppinsText fontSize={rf(1.6)} color={"#7D7D7D"}>
            {subtitle}
          </PoppinsText>
          <Row style={{ width: wp("36%"), alignItems: "center" }}>
            <Chip
              title={daily ? `${daily} ${_translate("minDaily")}` : `${_translate("noDailyLimit")}`}
              titleStyle={{
                color: "#FFF",
                fontSize: rf(1.1),
                fontFamily: "Poppins-Regular",
              }}
              buttonStyle={styles.chip}
            />
            <PoppinsText semiBold fontSize={rf(1.8)} color={"#2E2A2A"} style={styles.price} textProps={{ adjustsFontSizeToFit: true, numberOfLines: 1 }}>
              {`${price}$`}
            </PoppinsText>
          </Row>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: wp("40%"),
    height: wp("55%"),
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    marginHorizontal: wp("2%"),
    marginBottom: 16,
    elevation: 8,
  },
  image: {
    width: wp("40%"),
    height: wp("30%"),
    resizeMode: "cover",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  chip: {
    backgroundColor: Colors.primaryColor,
    width: wp("22%"),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    paddingTop: 3,
    marginTop: 1,
    marginBottom: 1,
  },
  price: {
    width: wp('12%'),
    lineHeight: 16,
    textAlign: "center",
    marginRight: 0,
  }
});

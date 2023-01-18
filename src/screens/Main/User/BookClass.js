import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import images from "../../../assets/images";
import MulishText from "../../../components/MulishText";
import NavigationHeader from "../../../components/NavigationHeader";
import PrimaryButton from "../../../components/PrimaryButton";
import StyledInput from "../../../components/StyledInput";
import Colors from "../../../constants/Colors";
import CommonStyles from "../../../constants/CommonStyles";
import { hp, wp } from "../../../constants/Constants";
import Icon from "../../../constants/Icon";
import { _translate } from "../../../localization";

import { Picker } from "@react-native-picker/picker";
import { navigate } from "../../../navigations/NavigationService";

export default function BookClass() {
  const [selectedClass, setSelectedClass] = useState("Personal Training");
  return (
    <View style={styles.container}>
      <NavigationHeader title={_translate("Book Class")} backArrow={true} />

      <MulishText
        color="rgba(0,0,0,.53)"
        fontSize={14}
        style={{ width: wp("90%"), lineHeight: 24 }}
      >
        {_translate(
          "selectBookForOnlineClass"
        )}
      </MulishText>

      <View style={{ marginTop: 33 }}>
        <MulishText
          bold
          color="rgba(0,0,0,.55)"
          fontSize={17}
          style={{ width: wp("90%") }}
        >
          {_translate("selectTraining")}
        </MulishText>

        <Picker
          prompt={_translate("selectTraining")}
          selectedValue={selectedClass}
          onValueChange={(itemValue, itemIndex) => setSelectedClass(itemValue)}
          dropdownIconColor="#3C444C"
          mode="dropdown"
        >
          <Picker.Item
            label="Personal Training"
            value={_translate("personalTraining")}
            fontFamily="Mulish-Regular"
          />
          <Picker.Item
            label="Online Class"
            value={_translate("onlineClass")}
            fontFamily="Mulish-Regular"
          />
        </Picker>

        <PrimaryButton
          title={_translate("book")}
          buttonStyle={{
            width: wp("90%"),
            height: 56,
            borderRadius: 10,
            marginTop: 56,
          }}
          onPress={() => {
            navigate("BookingSchedule");
          }}
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

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
import Share from "react-native-share";
import { useUser } from "../../../redux/reducers/AuthReducer";
import { _translate } from "../../../localization";
export default function AddClient({ navigation }) {
  const user = useUser();
  const referralCode = user?.referralCode;

  const [loading, setLoading] = useState(false);
  const share = async (msg) => {
    setLoading(true);
    try {
      const shareResponse = await Share.open({
        message: `${_translate("referalCode")} ${referralCode}`,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <NavigationHeader title={_translate("addClient")} backArrow={true} />

      <MulishText
        color="rgba(0,0,0,.53)"
        fontSize={14}
        style={{ width: wp("90%"), lineHeight: 24 }}
      >
        {_translate("shareRequestToClient")}
      </MulishText>

      <View style={{ marginTop: 33 }}>
        <MulishText
          bold
          color="rgba(0,0,0,.55)"
          fontSize={17}
          style={{ width: wp("90%") }}
        >
          {`Referal Code`}
        </MulishText>
        <StyledInput
          containerStyle={[CommonStyles.input, { paddingLeft: 0 }]}
          inputContainerStyle={{ width: wp("90%"), marginLeft: 0 }}
          disabled={true}
          value={referralCode}
        />
        <PrimaryButton
          title={"Share"}
          buttonStyle={{
            width: wp("90%"),
            height: 56,
            borderRadius: 10,
            marginTop: 56,
          }}
          onPress={() => {
            share();
          }}
          loading={loading}
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

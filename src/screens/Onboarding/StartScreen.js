/* eslint-disable react-native/no-raw-text */
import React, { useEffect } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import { useDispatch } from "react-redux";
import images from "../../assets/images";
import MulishText from "../../components/MulishText";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import Colors from "../../constants/Colors";
import { hp, IS_TRAINER, rf, wp } from "../../constants/Constants";
import { navigate } from "../../navigations/NavigationService";
import { setIsTrainer } from "../../redux/reducers/AuthReducer";
import LocalStorage from "../../services/LocalStorage";
import { _translate } from "../../localization";

export default function StartScreen() {
  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
  }, []);

  const dispatch = useDispatch();

  const handlePress = (isTrainer) => {
    dispatch(setIsTrainer(isTrainer));
    LocalStorage.storeData(IS_TRAINER, isTrainer);
    navigate("Signin");
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.container}>
        <Image source={images.logo} style={styles.logo} />

        <MulishText style={styles.text} bold>
          {_translate("letsGetTheTrainingsFromTrainers")}
        </MulishText>

        <View style={styles.btnContainer}>
          <SecondaryButton
            title={_translate("loginAsTrainer")}
            titleStyle={{ fontSize: rf(2.5) }}
            buttonStyle={{
              width: wp("80%"),
              height: hp("8%"),
              borderRadius: hp("8%"),
            }}
            onPress={() => handlePress(true)}
          />

          <PrimaryButton
            title={_translate("loginAsuser")}
            titleStyle={{ fontSize: rf(2.5) }}
            buttonStyle={{
              width: wp("80%"),
              height: hp("8%"),
              borderRadius: hp("8%"),
            }}
            onPress={() => handlePress(false)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.background,
  },
  logo: {
    width: wp("80%"),
    height: hp("40%"),
    resizeMode: "contain",
    // marginTop: hp('8%')
  },

  text: {
    color: "#000000",
    fontSize: rf(3.5),
    textAlign: "center",
    marginHorizontal: wp("12%"),
    marginBottom: hp("20%"),
  },
  btnContainer: {
    width: wp("100%"),
    height: hp("18%"),
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("10%"),
  },
  inactiveDot: {
    width: 14,
    height: 7,
    backgroundColor: "#C4C4C4",
    borderRadius: 7,
    marginHorizontal: 1,
  },
});

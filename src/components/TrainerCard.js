import React from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { Chip } from "react-native-elements";
import { wp } from "../constants/Constants";
import { navigate } from "../navigations/NavigationService";
import PoppinsText from "./PoppinsText";

export default function TrainerCard(item) {
  const { image, name } = item;
  return (
    <Pressable
      onPress={() => {
        navigate("TrainerProfile", { trainer: item });
      }}
    >
      <ImageBackground
        source={{ uri: `${image}` }}
        style={styles.container}
        resizeMode='contain'
        imageStyle={{ borderRadius: 12 }}
      >
        <Chip
          title={name}
          titleStyle={{
            color: "#000000",
            fontSize: wp("3%"),
            fontFamily: "Mulish-Regular",
            textTransform: "capitalize",
          }}
          buttonStyle={styles.chip}
        />
      </ImageBackground>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: 12,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "flex-end",
    marginHorizontal: 10,
    marginBottom: 16,
  },
  chip: {
    width: wp("25%"),
    height: 20,
    backgroundColor: "#FFF",
    borderRadius: 30,
    marginBottom: 8,
    padding: 0,
  },
});

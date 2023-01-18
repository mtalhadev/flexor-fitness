import { StyleSheet } from "react-native";
import { hp, wp } from "./Constants";

const CommonStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: wp("90%"),
    height: 56,
    marginTop: hp("2%"),
  },
  input2: {
    width: wp("94%"),
    height: 130,
  },
  input3: {
    width: wp("85%"),
    height: 56,
    marginTop: hp("2%"),
  },
});

export default CommonStyles;

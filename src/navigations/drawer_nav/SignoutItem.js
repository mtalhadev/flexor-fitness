import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "../../constants/Icon";
import PoppinsText from "../../components/PoppinsText";
import CommonStyles from "../../constants/CommonStyles";
import { styles } from "./DrawerContent";
import { navigate, reset } from "../NavigationService";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/actions/AuthActions";
import { _translate } from "../../localization";

export const SignoutItem = ({ color }) => {
  const dispatch = useDispatch();

  const signout = () => {
    reset("StartScreen");
    setTimeout(() => {
      dispatch(signOut());
    }, 2000);
  };

  return (
    <TouchableOpacity onPress={signout}>
      <View
        style={[
          CommonStyles.row,
          styles.footerItem,
          { justifyContent: "flex-start" },
        ]}
      >
        <PoppinsText semiBold fontSize={15} color={color}>
          {_translate("Sign-out")}
        </PoppinsText>
        <Icon.Ionicon name="arrow-forward" size={20} color={color} />
      </View>
    </TouchableOpacity>
  );
};

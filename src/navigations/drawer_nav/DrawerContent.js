/* eslint-disable react-native/no-raw-text */
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import { _translate } from "../../localization";

import Colors from "../../constants/Colors";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import Icon from "../../constants/Icon";
import { useIstrainer, useUser } from "../../redux/reducers/AuthReducer";
import Gift from "../../assets/svg/Gift";
import Payment from "../../assets/svg/Payment";
import Language from "../../assets/svg/Language";
import Settings from "../../screens/Main/Settings";
import Share from "../../assets/svg/Share";
import AtmCard from "../../assets/svg/AtmCard";
import { Avatar, Divider, ListItem, Switch } from "react-native-elements";
import images from "../../assets/images";
import withResize from "../../utilities/resizedSvg";
import { navigate } from "../NavigationService";
import { SignoutItem } from "./SignoutItem";
import { useProfile } from "../../redux/reducers/ProfileReducer";
import SocketManager from "../../socketManager";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/actions/ProfileActions";
import { unwrapResult } from "@reduxjs/toolkit";
import { showAlert } from "react-native-customisable-alert";
import RNToast from "../../components/RNToast";
import { hp, rf } from "../../constants/Constants";

export default function DrawerContent(props) {
  const isTrainer = useIstrainer();
  const PaymentIcon = withResize(Payment, 0.9);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: Colors.primaryColor,
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 1 }}>
        <DrawerHeader {...props} />

        {/* {isTrainer ? (
        <StyledDrawerItem
          label={_translate("Membership")}
          icon={(iconProps) => <AtmCard style={{ width: 25 }} />}
          onPress={() => {
            navigate("Membership");
          }}
        />
      ) : ( */}
        <StyledDrawerItem
          label="My Workout"
          icon={(iconProps) => (
            <Icon.Ionicon name="person" {...iconProps} style={{ width: 25 }} />
          )}
          onPress={() => {
            navigate("MyProfile");
          }}
        />
        {/* )} */}

        <ItemDivider />

        <StyledDrawerItem
          label={_translate("offers")}
          icon={(iconProps) => <Gift style={{ width: 25 }} />}
          onPress={() => {
            navigate("Offers");
          }}
        />

        <ItemDivider />

        <StyledDrawerItem
          label={_translate("Payments")}
          icon={(iconProps) => <PaymentIcon width={31} height={31} />}
          onPress={() => {
            navigate("PaymentHistory");
          }}
        />

        <ItemDivider />

        <StyledDrawerItem
          label={_translate("Rate Us")}
          icon={(iconProps) => (
            <Icon.Feather name="star" {...iconProps} style={{ width: 25 }} />
          )}
          onPress={() => {
            Linking.openURL(
              "https://play.google.com/store/apps/details?id=com.getweys.flexor"
            );
          }}
        />

        <ItemDivider />

        <StyledDrawerItem
          label={_translate("About Us")}
          icon={(iconProps) => <Share style={{ width: 25 }} />}
          onPress={() =>
            navigate("Privacy", { url: "https://flexor-18650.web.app/" })
          }
        />

        <ItemDivider />

        <StyledDrawerItem
          label={_translate("Language")}
          icon={(iconProps) => <Language style={{ width: 25 }} />}
          onPress={() => {
            navigate("ChangeLanguage");
          }}
        />
        <ItemDivider />

        <StyledDrawerItem
          label={_translate("Settings")}
          icon={(iconProps) => (
            <Icon.Feather
              name="settings"
              {...iconProps}
              style={{ width: 25 }}
            />
          )}
          onPress={() => {
            navigate("Settings");
          }}
        />
      </View>

      <DrawerFooter {...props} isTrainer={isTrainer} />
    </DrawerContentScrollView>
  );
}

const StyledDrawerItem = ({ label, icon, onPress }) => (
  <DrawerItem
    label={label}
    icon={icon}
    onPress={onPress}
    activeTintColor="#FFF"
    inactiveTintColor="#FFF"
    activeBackgroundColor={Colors.primaryColor}
    inactiveBackgroundColor={Colors.primaryColor}
    labelStyle={{
      fontFamily: "Poppins-Regular",
      color: "#FFF",
      fontSize: rf(2),
    }}
    style={styles.headerItemContainer}
  />
);

const ItemDivider = () => <Divider color={"#F4F4F8"} style={styles.divider} />;

function DrawerHeader(props) {
  const user = useProfile();
  useEffect(() => {
    if (user) {
      SocketManager.instance.emitUserConnection(user._id);
    }
    SocketManager.instance.listenUserConnection((user) => {
      // console.log(user, "======")
    });
  }, []);

  return (
    <ImageBackground
      source={images.drawerHeaderBkgd}
      style={styles.headerContainer}
    >
      <ListItem
        containerStyle={styles.headerItem}
        onPress={() => {
          navigate("EditProfile");
        }}
        Component={TouchableOpacity}
      >
        <Avatar source={{ uri: user?.image }} size={70} rounded />
        <ListItem.Content>
          <ListItem.Title style={styles.headerTitle}>
            {user?.name}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.headerSubTitle}>
            {user?.email}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </ImageBackground>
  );
}
function DrawerFooter(props) {
  const profile = useProfile();
  const dispatch = useDispatch();

  const _onValueChange = (newSwitchValue, reset) => {
    dispatch(updateProfile({ notification: newSwitchValue }))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        if (originalPromiseResult?._id)
          RNToast.showShort(
            `Notification ${originalPromiseResult?.notification ? "ON" : "OFF"}`
          );
        else {
          reset(!newSwitchValue);
        }
      })
      .catch((rejectedValue) => {
        console.log("rejectedValue: ", rejectedValue);
        showAlert({
          title: "Error",
          message: rejectedValue,
          alertType: "error",
        });
        reset(!newSwitchValue);
      });
  };
  return (
    <View style={styles.footerContainer}>
      {/* <SwitchItem
        label={props.isTrainer ? "Be visible to app" : "Trainer see your Log"}
        value={true}
        onValueChange={(val) => {}}
      /> */}
      <SwitchItem
        label={_translate("notifications")}
        value={profile.notification}
        onValueChange={_onValueChange}
      />
      <SignoutItem color="#FFF" />
    </View>
  );
}

const SwitchItem = ({ label, value, onValueChange }) => {
  const [switchState, setSwitchState] = useState(value);
  const _onValueChange = () => {
    setSwitchState(!switchState);
    onValueChange(!switchState, (val) => setSwitchState(val));
  };

  return (
    <ListItem containerStyle={styles.footerItem}>
      <ListItem.Content style={{ height: 30, alignItems: "flex-start" }}>
        <ListItem.Title style={styles.label}>{label}</ListItem.Title>
      </ListItem.Content>
      <Switch
        color={Colors.primaryColor}
        style={{}}
        value={switchState}
        onValueChange={_onValueChange}
        trackColor={{ true: "rgba(255,255,255,0.9)" }}
        ios_backgroundColor="#FFF"
      />
    </ListItem>
  );
};
export const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: hp("20%"),
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  headerItem: {
    width: "100%",
    height: hp("20%"),
    backgroundColor: "rgba(0,0,0,.8)",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
  },
  headerSubTitle: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Poppins-Regular",
  },
  headerItemContainer: {
    height: hp("7%"),
    justifyContent: "center",
    padding: 0,
  },
  divider: {
    width: 132,
    height: 0.3,
    marginLeft: "25%",
    marginBottom: 4,
  },
  label: {
    color: "#FFF",
    fontSize: 13,
    fontFamily: "Poppins-Regular",
  },
  footerContainer: {
    width: "100%",
    height: 60,
    justifyContent: "flex-end",
    padding: 20,
  },

  footerItem: {
    backgroundColor: "transparent",
    width: "100%",
    height: 30,
    padding: 0,
  },
});

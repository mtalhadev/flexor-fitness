import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Icon, ListItem, Switch } from "react-native-elements";
import images from "../../assets/images";
import NavigationHeader from "../../components/NavigationHeader";
import PrimaryButton from "../../components/PrimaryButton";
import RobotoText from "../../components/RobotoText";
import Colors from "../../constants/Colors";
import { wp } from "../../constants/Constants";
import { SignoutItem } from "../../navigations/drawer_nav/SignoutItem";
import Share from "react-native-share";
import { navigate } from "../../navigations/NavigationService";
import { useProfile } from "../../redux/reducers/ProfileReducer";
import { updateProfile } from "../../redux/actions/ProfileActions";
import { unwrapResult } from "@reduxjs/toolkit";
import { showAlert } from "react-native-customisable-alert";
import { useDispatch } from "react-redux";
import RNToast from "../../components/RNToast";
import { _translate } from "../../localization";
import { getWalletDetail } from "../../redux/actions/PaymentAction";
import { useIstrainer } from "../../redux/reducers/AuthReducer";

export default function Settings() {
  const profile = useProfile();
  const dispatch = useDispatch();
  const isTrainer = useIstrainer();
  const [notifSwitch, setNotifSwitch] = useState(profile.notification);

  const _onValueChange = () => {
    const newSwitchValue = !notifSwitch;
    setNotifSwitch(newSwitchValue);
    dispatch(updateProfile({ notification: newSwitchValue }))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        if (originalPromiseResult?._id)
          RNToast.showShort(
            `Notification ${originalPromiseResult?.notification ? "ON" : "OFF"}`
          );
        else {
          setNotifSwitch(!newSwitchValue);
        }
      })
      .catch((rejectedValue) => {
        console.log("rejectedValue: ", rejectedValue);
        showAlert({
          title: "Error",
          message: rejectedValue,
          alertType: "error",
        });
        setNotifSwitch(!newSwitchValue);
      });
  };
  const share = async (msg) => {
    try {
      const shareResponse = await Share.open({
        message: `${_translate("HeyYouHaveBeenInvited")}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <NavigationHeader title={_translate("Settings")} backArrow />

      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <ProfileHeader />
        <View
          style={{
            backgroundColor: "#FFF",
            padding: 10,
            width: wp("90%"),
            borderRadius: 10,
            justifyContent: "center",
          }}
        >
          <RobotoText color="#333" fontSize={16}>
            {_translate("Profile")}
          </RobotoText>
          <SettingItem
            title={_translate("InviteFriends")}
            icon={
              <Icon
                name={"person-outline"}
                type="ionicon"
                color={Colors.primaryColor}
                size={20}
              />
            }
            onPress={() => {
              share();
            }}
          />
          <SettingItem
            title={_translate("notifications")}
            icon={
              <Icon
                name={"notifications-outline"}
                type="ionicon"
                color={Colors.primaryColor}
                size={20}
              />
            }
            switchProps={{
              color: Colors.primaryColor,
              style: {},
              value: notifSwitch,
              onValueChange: _onValueChange,
              trackColor: { true: Colors.primaryColor, false: "#999" },
              ios_backgroundColor: Colors.primaryColor,
            }}
          />
          <SettingItem
            title={_translate("Privacy")}
            icon={
              <Icon
                name={"lock-outline"}
                type="material"
                color={Colors.primaryColor}
                size={20}
              />
            }
            onPress={() => navigate("Privacy")}
          />
          {isTrainer && (
            <SettingItem
              title={_translate("AddPaymentDetails")}
              icon={
                <Icon
                  name={"wysiwyg"}
                  type="material"
                  color={Colors.primaryColor}
                  size={20}
                />
              }
              onPress={() => {
                navigate("Add Payment Details");
                dispatch(getWalletDetail());
              }}
            />
          )}
        </View>
        <View
          style={{
            backgroundColor: "#FFF",
            padding: 10,
            width: wp("90%"),
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <RobotoText color="#333" fontSize={16}>{`Security`}</RobotoText>
          <SettingItem
            title={_translate("ChangePassword")}
            icon={
              <Icon
                name={"lock-outline"}
                type="material"
                color={Colors.primaryColor}
                size={20}
              />
            }
            onPress={() => {
              navigate("Change Password");
            }}
          />
          {/* <SettingItem title="Two Factor Authentication" icon={ <Icon name={'shield'} type='foundation' color={Colors.primaryColor} size={22} />} /> */}
        </View>
      </View>
      <View
        style={{
          flex: 0.4,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 50,
        }}
      >
        <SignoutItem color={Colors.primaryColor} />
      </View>
    </View>
  );
}

const ProfileHeader = () => {
  const profile = useProfile();
  return (
    <ListItem
      containerStyle={{
        backgroundColor: "#FFF",
        padding: 10,
        width: wp("90%"),
        height: 72,
        borderRadius: 10,
        marginVertical: 20,
      }}
    >
      <Avatar source={{ uri: profile.image }} size={48} rounded />
      <ListItem.Content style={{ marginLeft: -5, marginTop: 10 }}>
        <ListItem.Title>
          <RobotoText fontSize={17}>{profile.name}</RobotoText>
        </ListItem.Title>
        <ListItem.Subtitle>
          <RobotoText color="#999" fontSize={12}>
            {profile.email}
          </RobotoText>
        </ListItem.Subtitle>
      </ListItem.Content>
      <PrimaryButton
        title={"Edit"}
        buttonStyle={{
          width: 75,
          height: 28,
          borderRadius: 30,
          paddingVertical: 0,
        }}
        titleStyle={{ color: "#FFF", fontSize: 10 }}
        onPress={() => {
          navigate("EditProfile");
        }}
      />
    </ListItem>
  );
};
const SettingItem = ({ icon, title, switchProps, onPress }) => (
  <ListItem
    containerStyle={{
      backgroundColor: "#FFF",
      padding: 0,
      width: wp("90%") - 20,
      height: 46,
      marginHorizontal: 10,
    }}
    onPress={onPress}
    Component={TouchableOpacity}
  >
    {icon}
    <ListItem.Content style={{}}>
      <ListItem.Title>
        <RobotoText fontSize={14} color="#666">
          {title}
        </RobotoText>
      </ListItem.Title>
    </ListItem.Content>
    {switchProps ? <Switch {...switchProps} /> : <ListItem.Chevron />}
  </ListItem>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FAFAFA",
  },
});

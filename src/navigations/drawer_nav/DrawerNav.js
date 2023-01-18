import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { wp } from "../../constants/Constants";
import DrawerContent from "./DrawerContent";
import Colors from "../../constants/Colors";
import BottomTabs from "../bottom_nav/BottomTabs";
import Membership from "../../screens/Main/Trainer/Membership";
import PaymentHistory from "../../screens/Main/Trainer/PaymentHistory";
import Offers from "../../screens/Main/Offers";
import Settings from "../../screens/Main/Settings";
import RateTrainer from "../../screens/Main/User/RateTrainer";
import PaymentRequests from "../../screens/Main/User/PaymentRequests";
import TrainerProfile from "../../screens/Main/User/TrainerProfile";
import BookClass from "../../screens/Main/User/BookClass";
import BookingSchedule from "../../screens/Main/User/BookingSchedule";
import CardsList from "../../screens/Main/CardsList";
import AddCard from "../../screens/Main/AddCard";
import ChangePassword from "../../screens/ChangePassword";
import { useDispatch } from "react-redux";
import { fetchMyProfile } from "../../redux/actions/ProfileActions";
import EditProfile from "../../screens/EditProfile";
import MyProfile from "../../screens/Main/User/MyProfile";
import MyProgramDetails from "../../screens/Main/User/MyProgramDetails";
import { _translate } from "../../localization";

import CategoryList from "../../screens/Main/User/CategoryList";
import VideoPlayerScreen from "../../screens/Main/User/VideoPlayerScreen";
import MyClassDetails from "../../screens/Main/User/MyClassDetails";
import PrivacyPolicy from "../../screens/PrivacyPolicy";
import MembershipStack from "../bottom_nav/MembershipStack";
import ChangeLanguage from "../../screens/ChangeLanguage";
import CheckoutScreen from "../../screens/CheckoutScreen";
import AddPaymentDetails from "../../screens/Main/AddPaymentDetails";

import TrainerPaymentHistory from "../../screens/Main/Trainer/PaymentHistory";
import ClientPaymentHistory from "../../screens/Main/User/PaymentHistory";
import ClientMyProfile from "../../screens/Main/User/MyProfile";
import TrainerMyProfile from "../../screens/Main/Trainer/MyProfile";
import { useIstrainer } from "../../redux/reducers/AuthReducer";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  const dispatch = useDispatch();
  const isTrainer = useIstrainer();

  useEffect(() => {
    dispatch(fetchMyProfile());
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        overlayColor: "rgba(0, 0, 0, 0.5)",
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors.primaryColor,
          width: wp("70%"),
          borderTopRightRadius: 20,
        },
        drawerItemStyle: {
          backgroundColor: "#333",
          width: "100%",
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
      backBehavior={"initialRoute"}
    >
      <Drawer.Screen name={"BottomTabs"} component={BottomTabs} />
      <Drawer.Screen name={"TrainerProfile"} component={TrainerProfile} />
      <Drawer.Screen name={"BookTrainingClass"} component={BookClass} />
      <Drawer.Screen name={"BookingSchedule"} component={BookingSchedule} />
      <Drawer.Screen name={"CardsList"} component={CardsList} />
      <Drawer.Screen name={"AddCard"} component={AddCard} />

      <Drawer.Screen name={"Settings"} component={Settings} />
      <Drawer.Screen name={"EditProfile"} component={EditProfile} />
      <Drawer.Screen
        name={"MyProfile"}
        component={isTrainer ? TrainerMyProfile : ClientMyProfile}
      />
      <Drawer.Screen name={"MyProgramDetails"} component={MyProgramDetails} />
      <Drawer.Screen name={"MyClassDetails"} component={MyClassDetails} />
      <Drawer.Screen name={"Membership"} component={MembershipStack} />
      <Drawer.Screen
        name={"PaymentHistory"}
        component={isTrainer ? TrainerPaymentHistory : ClientPaymentHistory}
      />
      <Drawer.Screen name={"PaymentRequests"} component={PaymentRequests} />
      <Drawer.Screen name={"Offers"} component={Offers} />
      <Drawer.Screen name={"RateTrainer"} component={RateTrainer} />
      <Drawer.Screen name={"ChangePassword"} component={ChangePassword} />
      <Drawer.Screen name={"Privacy"} component={PrivacyPolicy} />

      <Drawer.Screen name={"CategoryList"} component={CategoryList} />
      <Drawer.Screen name={"ChangeLanguage"} component={ChangeLanguage} />
      <Drawer.Screen name={"AddPaymentDetails"} component={AddPaymentDetails} />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ForgetPassword from "../screens/Authentication/ForgetPassword";
import NewPassword from "../screens/Authentication/NewPassword";
import SigninScreen from "../screens/Authentication/SigninScreen";
import SignupScreen from "../screens/Authentication/SignupScreen";
import VerifyEmail from "../screens/Authentication/VerifyEmail";
import Categories from "../screens/Main/Trainer/Categories";
import VideoPlayerScreen from "../screens/Main/User/VideoPlayerScreen";
import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";
import StartScreen from "../screens/Onboarding/StartScreen";
import { useToken, useVersionCheck } from "../utilities/hooks";
import MembershipStack from "./bottom_nav/MembershipStack";
import DrawerNav from "./drawer_nav/DrawerNav";
import { isReadyRef, navigationRef } from "./NavigationService";
import { _translate } from "../localization";
import CheckoutScreen from "../screens/CheckoutScreen";
import WalletVerificationScreen from "../screens/WalletVerificationScreen";
import CategoryList from "../screens/Main/User/CategoryList";

const Stack = createStackNavigator();

const Navigation = () => {
  useVersionCheck();

  const { Token, checking } = useToken();

  if (checking) return null;

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      <Stack.Navigator
        initialRouteName={Token == null ? "OnboardingScreen" : "Main"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"OnboardingScreen"} component={OnboardingScreen} />
        <Stack.Screen name={"StartScreen"} component={StartScreen} />
        <Stack.Screen name={"Signin"} component={SigninScreen} />
        <Stack.Screen name={"Signup"} component={SignupScreen} />
        <Stack.Screen name={"ForgetPassword"} component={ForgetPassword} />
        <Stack.Screen name={"VerifyEmail"} component={VerifyEmail} />
        <Stack.Screen name={"Categories"} component={Categories} />

        <Stack.Screen name={"Main"} component={DrawerNav} />
        <Stack.Screen
          name={"VideoPlayerScreen"}
          component={VideoPlayerScreen}
        />
        <Stack.Screen name={"NewPassword"} component={NewPassword} />
        <Stack.Screen name={"Membership"} component={MembershipStack} />
        <Stack.Screen name={"Checkout"} component={CheckoutScreen} />
        <Stack.Screen
          name={"WalletVerificationScreen"}
          component={WalletVerificationScreen}
        />

        <Stack.Screen name={"CategoryList"} component={CategoryList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;

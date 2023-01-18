import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import CardDetails from "../../screens/Main/CardDetails";
import PurchaseSuccess from "../../screens/Main/PurchaseSuccess";
import Membership from "../../screens/Main/Trainer/Membership";
import { _translate } from "../../localization";

const Stack = createStackNavigator();

export default function MembershipStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"MembershipDetails"} component={Membership} />
      <Stack.Screen name={"CardDetails"} component={CardDetails} />
      <Stack.Screen name={"PurchaseSuccess"} component={PurchaseSuccess} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

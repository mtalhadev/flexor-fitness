import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import Conversations from "../../screens/Chat/Conversations";
import CreateGroup from "../../screens/Chat/CreateGroup";
import GroupChat from "../../screens/Chat/GroupChat";
import PrivateChat from "../../screens/Chat/PrivateChat";
import { _translate } from "../../localization";

const Stack = createStackNavigator();

export default function ChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"conversations"} component={Conversations} />
      <Stack.Screen name={"PrivateChat"} component={PrivateChat} />
      <Stack.Screen name={"GroupChat"} component={GroupChat} />
      <Stack.Screen name={"CreateGroup"} component={CreateGroup} />
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

import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useIstrainer } from "../../redux/reducers/AuthReducer";
import ClassesSchedule from "../../screens/Main/User/ClassesSchedule";
import UserHomeScreen from "../../screens/Main/User/HomeScreen";
import TrainerScheduleScreen from "../../screens/Main/Trainer/ScheduleScreen";
import SetReminder from "../../screens/Main/Trainer/SetReminder";
import SetTrainingTime from "../../screens/Main/Trainer/SetTrainingTime";
import OnlineClassesList from "../../screens/Main/User/OnlineClassesList";
import TrainersList from "../../screens/Main/User/TrainersList";
import { _translate } from "../../localization";

const Stack = createStackNavigator();

export default function ScheduleStack() {
  const isTrainer = useIstrainer();

  if (isTrainer)
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={"ScheduleScreen"}
          component={TrainerScheduleScreen}
        />
        <Stack.Screen name={"SetReminder"} component={SetReminder} />
        <Stack.Screen name={"SetTrainingTime"} component={SetTrainingTime} />
      </Stack.Navigator>
    );
  else
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"ClassesSchedule"} component={ClassesSchedule} />
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

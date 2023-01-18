import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import AddWorkout from "../../screens/Main/User/AddWorkout";
import CreateWorkout from "../../screens/Main/User/CreateWorkout";
import CreateWorkout2 from "../../screens/Main/User/CreateWorkout2";
import WorkoutDetails from "../../screens/Main/User/WorkoutDetails";
import { _translate } from "../../localization";

const Stack = createStackNavigator();

export default function WorkoutStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"AddWorkout"} component={AddWorkout} />
      <Stack.Screen name={"CreateWorkout"} component={CreateWorkout} />
      <Stack.Screen name={"CreateWorkout2"} component={CreateWorkout2} />
      <Stack.Screen name={"WorkoutDetails"} component={WorkoutDetails} />
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

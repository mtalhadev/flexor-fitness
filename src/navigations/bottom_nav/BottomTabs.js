import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useIstrainer } from "../../redux/reducers/AuthReducer";
import Icon from "../../constants/Icon";
import { Image } from "react-native-elements";
import images from "../../assets/images";
import Colors from "../../constants/Colors";
import HomeStack from "./HomeStack";
import ScheduleStack from "./ScheduleStack";
import ChatStack from "./ChatStack";
import WorkoutStack from "./WorkoutStack";
import { _translate } from "../../localization";
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const isTrainer = useIstrainer();

  useEffect(() => {
    StatusBar.setTranslucent(false);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home")
            return <Icon.Feather name="home" size={size} color={color} />;
          else if (route.name === "Schedule")
            return <Icon.Feather name="calendar" size={size} color={color} />;
          else if (route.name === "Chat")
            return <Image source={images.messenger} style={styles.icon} />;
          else if (route.name === "Gym")
            return (
              <Image
                source={focused ? images.gym_active : images.gym}
                style={styles.icon}
              />
            );
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: "#AFAFAF",
        iconStyle: { fontSize: 22 },
        showLabel: false,
        keyboardHidesTabBar: true,
      }}
      backBehavior="history"
    >
      <Tab.Screen name={"Home"} component={HomeStack} />
      {/* {!isTrainer && <Tab.Screen name="Gym" component={WorkoutStack} /> } */}
      <Tab.Screen name={"Schedule"} component={ScheduleStack} />
      <Tab.Screen name={"Chat"} component={ChatStack} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});

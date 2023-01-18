import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useIstrainer } from "../../redux/reducers/AuthReducer";
import UserHomeScreen from "../../screens/Main/User/HomeScreen";
import TrainerHomeScreen from "../../screens/Main/Trainer/HomeScreen";
import OnlineClassesList from "../../screens/Main/User/OnlineClassesList";
import TrainersList from "../../screens/Main/User/TrainersList";
import HistoryScreen from "../../screens/Main/Trainer/HistoryScreen";
import ChargeUser from "../../screens/Main/Trainer/ChargeUser";
import AddClient from "../../screens/Main/Trainer/AddClient";
import ClientRequests from "../../screens/Main/Trainer/ClientRequests";
import ExerciseDetails from "../../screens/Main/User/ExerciseDetails";
import ExerciseDetails2 from "../../screens/Main/User/ExerciseDetails2";
import AllPrograms from "../../screens/Main/User/AllPrograms";
import AllClasses from "../../screens/Main/User/AllClasses";
import ProgramDetails from "../../screens/Main/User/ProgramDetails";
import ProgramDetails2 from "../../screens/Main/User/ProgramDetails2";
import { _translate } from "../../localization";

const Stack = createStackNavigator();

export default function HomeStack() {
  const isTrainer = useIstrainer();

  const transitionConfig = {
    gestureEnabled: false,
    transitionSpec: {
      open: { animation: "timing", config: { duration: 300 } },
      close: { animation: "timing", config: { duration: 300 } },
    },
    cardStyleInterpolator: ({ current: { progress } }) => ({
      cardStyle: { opacity: progress },
    }),
  };

  if (isTrainer)
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"HomeScreen"} component={TrainerHomeScreen} />
        <Stack.Screen name={"AddClient"} component={AddClient} />
        <Stack.Screen name={"ClientRequests"} component={ClientRequests} />
        <Stack.Screen name={"History"} component={HistoryScreen} />
        <Stack.Screen name={"ChargeUser"} component={ChargeUser} />
      </Stack.Navigator>
    );
  else
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"HomeScreen"} component={UserHomeScreen} />
        <Stack.Screen
          name={"AllPrograms"}
          component={AllPrograms}
          options={transitionConfig}
        />
        <Stack.Screen
          name={"AllClasses"}
          component={AllClasses}
          options={transitionConfig}
        />
        <Stack.Screen
          name={"TrainersList"}
          component={TrainersList}
          options={transitionConfig}
        />
        <Stack.Screen name="OnlineClasses" component={OnlineClassesList} />
        <Stack.Screen name="ExerciseDetails2" component={ExerciseDetails2} />
        <Stack.Screen name="ExerciseDetails" component={ExerciseDetails} />
        <Stack.Screen name="ProgramDetails" component={ProgramDetails} />
        <Stack.Screen name="ProgramDetails2" component={ProgramDetails2} />
      </Stack.Navigator>
    );
}

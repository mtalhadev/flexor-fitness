import * as React from "react";
export const navigationRef = React.createRef();
export const isReadyRef = React.createRef();
import { CommonActions, StackActions } from "@react-navigation/native";

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
export function goBack() {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.goBack();
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
export function push(name, params) {
  const pushAction = StackActions.push(name, params);

  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.dispatch(pushAction);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
export function pop() {
  const popAction = StackActions.pop(1);
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.dispatch(popAction);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function getCurrentRoute() {
  let route = navigationRef.current?.getCurrentRoute();
  // while(route.routes) {
  //  route = route.routes[route.index]
  // }
  return route;
}

export function reset(name, param) {
  const resetAction = CommonActions.reset({
    index: 1,
    routes: [
      {
        name: name,
        params: param && param,
      },
    ],
  });
  navigationRef.current?.dispatch(resetAction);
}

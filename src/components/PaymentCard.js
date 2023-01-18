/* eslint-disable react-native/no-raw-text */
import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import Colors from "../constants/Colors";
import { rf, wp } from "../constants/Constants";
import RobotoText from "./RobotoText";
import moment from "moment";
import MulishText from "./MulishText";
import { _translate } from "../localization";
import { useIstrainer } from "../redux/reducers/AuthReducer";

export default function PaymentCard({
  programId,
  type,
  trainerId,
  offerId,
  createdAt,
  amount,
  trainer,
}) {
  const isTrainer = useIstrainer();

  let message, programName;
  if (programId && trainerId && type === "subscription") {
    message = _translate("You have subscribed all classes of");
    programName = trainerId.name;
  } else if (programId) {
    message = _translate("You have purchased this program");
    programName = programId.title;
  } else if (offerId) {
    message = _translate("You have purchased this offer");
    programName = offerId.title;
  }

  if (!message && !programName) return null;

  if (isTrainer)
    return (
      <ListItem containerStyle={styles.container}>
        <ListItem.Content style={{ marginLeft: 1, marginTop: 10 }}>
          <ListItem.Title style={{ height: 50, lineHeight: 18 }}>
            <MulishText
              fontSize={rf(1.5)}
              color={"#000"}
            >{`You charged client ${client?.name || ""} \n`}</MulishText>
          </ListItem.Title>
          <ListItem.Subtitle>
            <RobotoText color="#00000055" fontSize={9}>
              {moment(new Date(createdAt)).format("ddd, hh:mm a")}
            </RobotoText>
          </ListItem.Subtitle>
        </ListItem.Content>
        <RobotoText color="#000000" fontSize={25}>
          ${amount}
        </RobotoText>
      </ListItem>
    );
  else
    return (
      <ListItem containerStyle={styles.container}>
        <ListItem.Content style={{ marginLeft: 0, marginTop: 0 }}>
          <ListItem.Title style={{ height: 55, lineHeight: 20 }}>
            <MulishText
              fontSize={rf(2)}
              color={"#333"}
            >{`${message} \n`}</MulishText>
            <MulishText fontSize={rf(2.2)} color={Colors.primaryColor} bold>
              {programName}
            </MulishText>
          </ListItem.Title>
          <ListItem.Subtitle>
            <RobotoText color="#00000055" fontSize={9}>
              {moment(new Date(createdAt)).format("ddd, hh:mm a")}
            </RobotoText>
          </ListItem.Subtitle>
        </ListItem.Content>
        <RobotoText color="#000000" fontSize={20}>
          ${amount}
        </RobotoText>
      </ListItem>
    );
}
const styles = StyleSheet.create({
  container: {
    width: wp("90%"),
    height: 100,
    backgroundColor: "#FAFAFA",
    borderRadius: 9,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 6,
  },
});

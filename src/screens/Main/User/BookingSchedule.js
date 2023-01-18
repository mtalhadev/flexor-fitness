import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, CheckBox, ListItem } from "react-native-elements";
import { useDispatch } from "react-redux";
import images from "../../../assets/images";
import IconText from "../../../components/IconText";
import MulishText from "../../../components/MulishText";
import NavigationHeader from "../../../components/NavigationHeader";
import PrimaryButton from "../../../components/PrimaryButton";
import RNCalendar from "../../../components/RNCalendar";
import RNToast from "../../../components/RNToast";
import Row from "../../../components/Row";
import Colors from "../../../constants/Colors";
import CommonStyles from "../../../constants/CommonStyles";
import { wp, hp, WEEDAYNAMES } from "../../../constants/Constants";
import Icon from "../../../constants/Icon";
import { goBack, navigate } from "../../../navigations/NavigationService";
import {
  bookTrainingSlot,
  fetchTrainerSchedule,
} from "../../../redux/actions/ClientActions";
import { useTrainerSchedule } from "../../../redux/reducers/ClientReducer";
import ApiErrorHandler from "../../../services/ApiErrorHandler";
import { useDispatchEffect } from "../../../utilities/hooks";
import { _translate } from "../../../localization";

const STATUS = ["available", "unavailable", "selected"];

export default function BookingSchedule({ route }) {
  const trainerId = route?.params?.trainerId;

  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedSlot, setSelectedSlot] = useState(null);

  const schedule = useTrainerSchedule();

  const onRefresh = useDispatchEffect(
    fetchTrainerSchedule,
    trainerId,
    schedule.length == 0
  );

  const selectedDay = WEEDAYNAMES[selectedDate.day()];

  const daySchedule = schedule.length
    ? schedule.find((item) => item.day === selectedDay)
    : null;
  const slots = daySchedule ? daySchedule.slots : [];

  const dispatch = useDispatch();

  const onCheckout = () => {
    if (!trainerId) return;
    dispatch(bookTrainingSlot({ trainerId, slot: selectedSlot }))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        if (originalPromiseResult) {
          RNToast.showShort("Slot Booked Successfully! ✅");
        }
      })
      .catch((rejectedValue) => ApiErrorHandler(rejectedValue));
  };

  return (
    <View style={styles.container}>
      <NavigationHeader title={_translate("schedule")} backArrow={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollView}
      >
        <RNCalendar
          onSelectDate={(date) =>
            setSelectedDate(moment(date.dateString, "YYYY-MM-DD", true))
          }
        />

        <View style={{ width: wp("90%") }}>
          <MulishText
            bold
            color="#000"
            fontSize={17}
            style={styles.heading}
          >{`Time`}</MulishText>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ height: 240, paddingLeft: 10 }}
          >
            {slots.map((slot) => (
              <TimeSlot
                {...slot}
                selected={slot._id == selectedSlot}
                onSelect={(id) => setSelectedSlot(id)}
              />
            ))}
          </ScrollView>
          <Row style={{ marginTop: 15 }}>
            <IconText
              icon={
                <Icon.Entypo name={"dot-single"} size={30} color={"#00A66C"} />
              }
              text={
                <MulishText fontSize={14} color="#40054F">
                  {_translate("available")}
                </MulishText>
              }
            />
            <IconText
              icon={
                <Icon.Entypo name={"dot-single"} size={30} color={"#7E7B7B"} />
              }
              text={
                <MulishText fontSize={14} color="#40054F">
                  {_translate("unavailable")}
                </MulishText>
              }
            />
            <IconText
              icon={
                <Icon.Entypo
                  name={"dot-single"}
                  size={30}
                  color={Colors.primaryColor}
                />
              }
              text={
                <MulishText fontSize={14} color="#40054F">
                  {_translate("selected")}
                </MulishText>
              }
            />
          </Row>

          <Row style={{ marginVertical: 30 }}>
            <View
              style={{
                width: wp("45%"),
                height: 50,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconText
                icon={
                  <Icon.FontAwesome
                    name={"calendar"}
                    size={13}
                    color={"#000"}
                  />
                }
                text={
                  <MulishText fontSize={14} color="#000">
                    {"  Date"}
                  </MulishText>
                }
              />
              <MulishText bold fontSize={16} color="#000">
                {"December 23"}
              </MulishText>
            </View>
            <View
              style={{ width: 1, height: 48, backgroundColor: "#F1EBF2" }}
            />
            <View
              style={{
                width: wp("45%"),
                height: 50,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconText
                icon={
                  <Icon.Material
                    name={"access-time"}
                    size={14}
                    color={"#000"}
                  />
                }
                text={
                  <MulishText fontSize={14} color="#000">
                    {_translate("openTime")}
                  </MulishText>
                }
              />
              <MulishText bold fontSize={16} color="#000">
                {"2:00 pm to 8:00 pm"}
              </MulishText>
            </View>
          </Row>

          <Row>
            <CheckBox
              center
              title="Online Class($16)"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={false}
              containerStyle={{
                width: wp("40%"),
                backgroundColor: "#FFF",
                borderWidth: 0,
                padding: 0,
              }}
            />
            <CheckBox
              center
              title="Personal Class($20)"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={false}
              containerStyle={{
                width: wp("40%"),
                backgroundColor: "#FFF",
                borderWidth: 0,
              }}
            />
          </Row>
        </View>
        <PrimaryButton
          title={"Checkout"}
          containerStyle={{ alignItems: "center", justifyContent: "center" }}
          buttonStyle={{
            width: wp("85%"),
            height: 56,
            borderRadius: 10,
            marginTop: 30,
            marginBottom: 20,
          }}
          onPress={onCheckout}
        />
      </ScrollView>
    </View>
  );
}

const TimeSlot = ({ _id, from, available, selected, onSelect }) => {
  let textColor, backColor, borderColor;
  if (available) {
    textColor = "#5FD236";
    backColor = "#FFF";
    borderColor = "#5FD236";
  } else {
    textColor = "#B7A797";
    backColor = "#E9E2DB";
    borderColor = "#E9E2DB";
  }
  if (selected) {
    textColor = "#FFF";
    backColor = Colors.primaryColor;
    borderColor = Colors.primaryColor;
  }

  return (
    <TouchableOpacity onPress={() => onSelect(_id)}>
      <View
        style={[
          styles.timebox,
          {
            backgroundColor: backColor,
            borderWidth: 1,
            borderColor,
            borderRadius: 10,
          },
        ]}
      >
        <MulishText fontSize={12} color={textColor}>
          {from}
        </MulishText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  scrollView: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heading: {
    marginVertical: 15,
  },
  avatar: {
    width: 47,
    height: 47,
    borderRadius: 47,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
  },
  input: {
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 8,
    backgroundColor: "#FFF",
    elevation: 5,
  },
  timebox: {
    width: 74,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

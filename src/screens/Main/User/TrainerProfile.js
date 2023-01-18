/* eslint-disable react-native/no-raw-text */
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { _translate } from "../../../localization";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Button, ListItem } from "react-native-elements";
import { useDispatch } from "react-redux";
import MyProgramCard from "../../../components/MyProgramCard";
import NavigationHeader from "../../../components/NavigationHeader2";
import PoppinsText from "../../../components/PoppinsText";
import Row from "../../../components/Row";
import UndoSnackbar from "../../../components/UndoSnackbar";
import Colors from "../../../constants/Colors";
import { hp, rf, WIDTH, wp } from "../../../constants/Constants";
import Icon from "../../../constants/Icon";
import { navigate } from "../../../navigations/NavigationService";
import {
  fetchTrainerClasses,
  fetchTrainerPrograms,
  fetchTrainerReviews,
  toggleSendRequest,
} from "../../../redux/actions/ClientActions";
import {
  useIsLoading,
  useTrainerClasses,
  useTrainerPrograms,
  useTrainerReviews,
} from "../../../redux/reducers/ClientReducer";
import ApiErrorHandler from "../../../services/ApiErrorHandler";
import { useDispatchEffect } from "../../../utilities/hooks";
import { titleCase } from "../../../utilities/utils";
import { TouchableOpacity } from "react-native";
import ReviewCard from "../../../components/ReviewCard";
import ProgramCard from "../../../components/ProgramCard";
import ClassCard from "../../../components/ClassCard";

export default function TrainerProfile({ route }) {
  const profile = route?.params?.trainer;
  const programs = useTrainerPrograms();
  const classes = useTrainerClasses();
  const reviews = useTrainerReviews();
  const isLoading = useIsLoading();

  console.log("trainer profile: ", profile);

  useDispatchEffect(fetchTrainerPrograms, profile?._id, profile?._id);
  useDispatchEffect(fetchTrainerClasses, profile?._id, profile?._id);
  useDispatchEffect(fetchTrainerReviews, profile?._id, profile?._id);

  useEffect(() => {
    StatusBar.setTranslucent(true);
    return () => {
      StatusBar.setTranslucent(false);
      UndoSnackbar.dismiss();
    };
  }, []);

  const chatHandler = () => {
    navigate("Chat", {
      screen: "PrivateChat",
      params: {
        otherUser: profile,
      },
    });
  };

  let overallRating = reviews.length
    ? reviews.map((rev) => rev.rating).reduce((r, e) => r + e, 0) /
      reviews.length
    : null;

  const isReviewGiven =
    reviews.find((rev) => rev.createdBy?._id === profile._id) !== null;

  return (
    <ScrollView
      contentContainerStyle={{
        width: wp("100%"),
        alignItems: "center",
        justifyContent: "flex-start",
        paddingBottom: hp("4%"),
        backgroundColor: Colors.background,
      }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={{ uri: profile?.image }}
        style={styles.background}
        imageStyle={styles.image}
      >
        <NavigationHeader title={""} statusBarColor={"transparent"} />
      </ImageBackground>

      <View style={styles.whiteBackground}>
        <View style={styles.handle} />

        <ListItem
          containerStyle={{
            width: "100%",
            height: 80,
            borderRadius: 17,
            backgroundColor: "transparent",
            marginTop: 50,
          }}
        >
          <ListItem.Content>
            <ListItem.Title>
              <PoppinsText semiBold style={styles.heading}>
                {titleCase(profile?.name)}
              </PoppinsText>
            </ListItem.Title>
            <PoppinsText
              style={profile?.bio?.length ? styles.text : styles.text3}
              textProps={{}}
            >
              {profile?.bio || "No Bio"}
            </PoppinsText>
            <ListItem.Subtitle></ListItem.Subtitle>
          </ListItem.Content>
          <Icon.Ionicon
            name="chatbubble-ellipses"
            size={36}
            color={Colors.primaryColor}
            onPress={chatHandler}
            style={{ height: 80, marginRight: 10 }}
          />
        </ListItem>

        {!isReviewGiven && (
          <View style={{ paddingHorizontal: 20 }}>
            <Button
              title={_translate("writeAReview")}
              type="solid"
              onPress={() => navigate("RateTrainer", { trainer: profile })}
              titleStyle={{ fontSize: 16 }}
              buttonStyle={{
                borderColor: Colors.primaryColor,
                width: WIDTH - 60,
                height: 50,
                borderRadius: 25,
              }}
              containerStyle={{ width: WIDTH - 60, marginVertical: 5 }}
              TouchableComponent={TouchableOpacity}
            />
          </View>
        )}
        <Row style={{ marginTop: 16 }}>
          <InfoBox
            label={_translate("totalExperience")}
            value={profile?.experience || "--"}
          />
          <InfoBox
            label={_translate("numberOfClients")}
            value={profile?.subscribedUsers?.length}
          />
          <InfoBox
            label={_translate("overallRating")}
            value={`${overallRating?.toFixed(1) || "--"}`}
          />
        </Row>

        <View style={{ width: wp("100%"), height: "auto", marginTop: 20 }}>
          <PoppinsText
            semiBold
            fontSize={rf(3)}
            color="#2E2A2A"
            style={styles.heading}
          >
            {_translate("trainerPrograms")}
          </PoppinsText>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primaryColor} />
          ) : programs.length == 0 ? (
            <View style={{ height: 200, justifyContent: "center" }}>
              <PoppinsText fontSize={rf(2.5)} color="#999" style={styles.text2}>
                {_translate("noProgramsYet")}
              </PoppinsText>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                height: wp("60%"),
                marginLeft: wp("5%"),
              }}
            >
              {programs.map((item, i) => (
                <ProgramCard {...item} key={item._id} />
              ))}
            </ScrollView>
          )}
        </View>
        <View style={{ width: wp("100%"), height: "auto", marginTop: 20 }}>
          <PoppinsText
            semiBold
            fontSize={rf(3)}
            color="#2E2A2A"
            style={styles.heading}
          >
            {_translate("trainingClasses")}
          </PoppinsText>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primaryColor} />
          ) : classes.length == 0 ? (
            <View style={{ height: 200, justifyContent: "center" }}>
              <PoppinsText fontSize={rf(2.5)} color="#999" style={styles.text2}>
                {_translate("noClassesYet")}
              </PoppinsText>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                height: wp("60%"),
                marginLeft: wp("5%"),
              }}
            >
              {classes.map((item, i) => (
                <ClassCard {...item} key={item._id} />
              ))}
            </ScrollView>
          )}
        </View>
        <View style={{ width: wp("100%"), height: "auto", marginTop: 20 }}>
          <PoppinsText
            semiBold
            fontSize={rf(3)}
            color="#2E2A2A"
            style={styles.heading}
          >
            {_translate("reviewsGiven")}
          </PoppinsText>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primaryColor} />
          ) : reviews?.length == 0 ? (
            <View style={{ height: 200, justifyContent: "center" }}>
              <PoppinsText fontSize={rf(2.5)} color="#999" style={styles.text2}>
                {_translate("noReviewsYet")}
              </PoppinsText>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                height: wp("60%"),
                marginLeft: wp("5%"),
              }}
            >
              {reviews.map((item, i) => (
                <ReviewCard {...item} key={item._id} />
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const InfoBox = ({ label, value }) => (
  <View
    style={{
      width: wp("30%"),
      height: wp("30%"),
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#F2F2F2",
      borderRadius: 12,
      padding: wp("2%"),
      marginHorizontal: wp("1%"),
    }}
  >
    <View
      style={{ height: 50, justifyContent: "center", alignItems: "center" }}
    >
      <PoppinsText
        fontSize={rf(2)}
        color={"#7D7D7D"}
        style={{ textAlign: "center" }}
      >
        {label}
      </PoppinsText>
    </View>
    <View
      style={{ height: 60, justifyContent: "center", alignItems: "center" }}
    >
      <PoppinsText semiBold fontSize={18} color={"#2E2A2A"}>
        {value}
      </PoppinsText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  background: {
    width: wp("100%"),
    height: wp("70%"),
    minHeight: 200,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#666",
  },
  image: {
    width: wp("100%"),
    height: wp("70%"),
    minHeight: 200,
    resizeMode: "cover",
  },
  whiteBackground: {
    width: wp("100%"),
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    marginTop: -50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  textContainer: {
    width: WIDTH,
    height: 150,
    justifyContent: "space-between",
    //  backgroundColor: '#aaa',
  },
  heading: {
    color: "#222222",
    fontSize: 22,
    textAlign: "left",
    marginBottom: 5,
    marginLeft: 22,
    marginTop: 16,
  },
  text: {
    color: "#222222",
    fontSize: 16,
    width: wp("50%"),
  },
  text2: {
    textAlign: "center",
    marginHorizontal: wp("5%"),
    fontSize: 16,
  },
  text3: {
    color: "#999999",
    fontSize: 15,
    fontStyle: "italic",
  },

  btnContainer: {
    width: WIDTH,
    height: 110,
    alignItems: "center",
    justifyContent: "space-between",
  },
  rating: {
    width: wp("80%"),
    justifyContent: "space-between",
  },
  scrollView: {
    height: 200,
    paddingLeft: 10,
    paddingBottom: 50,
  },
  handle: {
    width: wp("15%"),
    height: 5,
    backgroundColor: "#AFAFAF",
    borderRadius: 5,
  },
});

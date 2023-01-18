import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useEffect } from "react";
import { SectionList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Icon, Image, ListItem } from "react-native-elements";
import { useDispatch } from "react-redux";
import MulishText from "../../../components/MulishText";
import NavigationHeader from "../../../components/NavigationHeader";
import Row from "../../../components/Row";
import Colors from "../../../constants/Colors";
import { hp, rf, wp } from "../../../constants/Constants";
import { goBack, navigate } from "../../../navigations/NavigationService";
import { setVideoDetails } from "../../../redux/reducers/ClientReducer";
import {
  useClassDetails,
  useProfile,
  useIsLoading,
} from "../../../redux/reducers/ProfileReducer";
import {
  isAfterToday,
  makeSectionsByWeek,
  WEEKDAYS,
} from "../../../utilities/utils";
import moment from "moment";
import { _translate } from "../../../localization";
import {
  cancelSubscription,
  purchaseClass,
} from "../../../redux/actions/ClientActions";
import { unwrapResult } from "@reduxjs/toolkit";
import { showAlert, closeAlert } from "react-native-customisable-alert";
import { fetchMyProfile } from "../../../redux/actions/ProfileActions";

const Tab = createMaterialTopTabNavigator();

export default function MyClassDetails() {
  const classDetails = useClassDetails();
  const { title, image, createdBy } = classDetails;

  return (
    <View style={styles.container}>
      <NavigationHeader title={title} backArrow={true} showRightMenu={false} />

      <Image source={{ uri: image }} style={styles.image} />

      <Row
        style={{
          width: wp("90%"),
          marginVertical: 10,
          justifyContent: "flex-start",
        }}
      >
        <MulishText bold color="#000" fontSize={rf(2)}>
          {_translate("classBy")}
        </MulishText>
        <Avatar
          source={{ uri: createdBy?.image }}
          size={32}
          rounded
          containerStyle={{ marginHorizontal: wp("2%") }}
        />
        <MulishText semiBold color="#000" fontSize={rf(1.8)}>
          {createdBy?.name}
        </MulishText>
      </Row>

      <Tab.Navigator
        initialLayout={{ width: wp("100%"), height: 200 }}
        style={{ width: wp("90%"), backgroundColor: "#FFF" }}
        tabBarOptions={{
          indicatorStyle: { backgroundColor: Colors.primaryColor },
          tabStyle: {},
          style: { justifyContent: "space-around" },
          showIcon: true,
        }}
        backBehavior="none"
      >
        <Tab.Screen name={_translate("about")} component={About} />
        <Tab.Screen name={_translate("videos")} component={Videos} />
      </Tab.Navigator>
    </View>
  );
}

const About = () => {
  const classDetails = useClassDetails();
  const dispatch = useDispatch();
  const profile = useProfile();
  const loading = useIsLoading();

  const { description, totalLength, daily, price, createdBy } = classDetails;

  let isPurchased = false,
    isExpired = false;
  const subscriptions = profile?.subscribedTrainers || [];
  for (const subscription of subscriptions) {
    const { subscribed, trainer, expires } = subscription;
    if (trainer._id === createdBy?._id) {
      isPurchased = subscribed;
      isExpired = !isAfterToday(new Date(expires));
    }
  }

  useEffect(() => {
    if (isExpired)
      showAlert({
        title: "Subscription Expired",
        message:
          "Your subscription has expired. Kindly renew your subscription to access all classes of " +
          createdBy?.name,
        alertType: "warning",
        dismissable: false,
        btnLabel: "Renew Subscription",
        onPress: buyNow,
        onDismiss: goBack,
      });
  }, [isExpired]);

  const buyNow = () => {
    if (createdBy)
      dispatch(
        purchaseClass({
          type: "subscription",
          trainerId: createdBy._id,
          programId,
          amount: price,
        })
      )
        .then(unwrapResult)
        .then((originalPromiseResult) => {
          const raypdRedirectUrl = originalPromiseResult;
          if (raypdRedirectUrl) {
            navigate("Checkout", { url: raypdRedirectUrl });
          }
        })
        .catch((rejectedValue) => {
          console.log("rejectedValue: ", rejectedValue);
          showAlert({
            title: "Error",
            message: JSON.stringify(rejectedValue),
            alertType: "error",
          });
        });
  };
  const onCancelSubscription = () => {
    if (createdBy)
      showAlert({
        title: "Cancel Subscription",
        message: `This will remove your access from all classes of ${createdBy.name}. Do you want to continue?`,
        alertType: "warning",
        dismissable: true,
        btnLabel: "PROCEED",
        leftBtnLabel: "CANCEL",
        onPress: () => {
          closeAlert();
          dispatch(cancelSubscription(createdBy._id))
            .then(unwrapResult)
            .then((originalPromiseResult) => {
              const success = originalPromiseResult;
              if (success) {
                dispatch(fetchMyProfile());
                goBack();
              }
            })
            .catch((rejectedValue) => {
              console.log("rejectedValue: ", rejectedValue);
              showAlert({
                title: "Error",
                message: JSON.stringify(rejectedValue),
                alertType: "error",
              });
            });
        },
      });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
        backgroundColor: "#FFF",
      }}
    >
      <Row style={{ width: wp("90%"), marginVertical: 10 }}>
        <MulishText bold color="#000" fontSize={rf(2)}>
          {_translate("description")}
        </MulishText>
        <MulishText
          color="#1E2022"
          fontSize={rf(2)}
        >{`${totalLength}`}</MulishText>
      </Row>

      <View style={{ width: wp("90%") }}>
        <MulishText color="#000" fontSize={rf(1.6)} style={styles.text}>
          {description}
        </MulishText>
      </View>

      {/* <Row style={{ width: wp('90%'), marginVertical: 10 }}>
      <MulishText bold color="#000" fontSize={rf(2)} >{`Videos Completed`}</MulishText>
      <ProgressCircle
          percent={Number(price)}
          radius={16}
          borderWidth={4}
          color={Colors.primaryColor}
          shadowColor="#ddd"
          bgColor="#fff"
          outerCircleStyle={{ marginBottom: 10}}
      >
          <PoppinsText fontSize={7} color='#000' style={{ marginTop: 2 }}>
            {`${price}%`}
          </PoppinsText>
      </ProgressCircle>
    </Row> */}
      <Button
        title="Cancel Subscription"
        type="clear"
        onPress={onCancelSubscription}
        titleStyle={{ fontSize: 14, color: "#666" }}
        buttonStyle={{ height: 50, borderRadius: 25 }}
        containerStyle={{
          marginHorizontal: 16,
          marginVertical: 5,
          position: "absolute",
          bottom: 16,
        }}
        TouchableComponent={TouchableOpacity}
        loading={loading}
      />
    </View>
  );
};

const Videos = () => {
  const classDetails = useClassDetails();
  const dispatch = useDispatch();
  const onPressVideo = (video) => {
    dispatch(setVideoDetails(video));
    navigate("VideoPlayerScreen", { programId: classDetails._id });
  };
  let videos = classDetails?.videos || [];
  const today = moment();
  videos = videos.filter(
    (item) =>
      moment(item.date).isBefore(today, "days") ||
      moment(item.date).isSame(today, "days")
  );
  let videoSections = makeSectionsByWeek(videos).reverse();

  return (
    <SectionList
      sections={videoSections}
      keyExtractor={(item, index) => item._id + index}
      renderItem={({ item }) => (
        <VideoCard video={item} onPress={onPressVideo} />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View
          style={{ width: "100%", alignItems: "center", marginVertical: 10 }}
        >
          <MulishText bold color="#666" fontSize={rf(2.5)}>
            {title}
          </MulishText>
        </View>
      )}
      contentContainerStyle={{
        width: wp("90%"),
        alignItems: "stretch",
        padding: 16,
      }}
      style={{ width: wp("100%"), height: "100%", backgroundColor: "#FFF" }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <View style={styles.empty}>
          <MulishText color="#999">{_translate("No videos")}</MulishText>
        </View>
      )}
    />
  );
};

const VideoCard = ({ video, onPress }) => (
  <ListItem
    containerStyle={{
      backgroundColor: "#FFF",
      padding: 0,
      width: "100%",
      marginVertical: 8,
      alignItems: "center",
      padding: 20,
      borderWidth: 1,
      borderColor: "#EAEAEA",
      borderRadius: 12,
    }}
    onPress={() => onPress(video)}
    Component={TouchableOpacity}
  >
    <Icon
      name={"video-camera"}
      type="font-awesome"
      color={"#77838F"}
      size={24}
      containerStyle={styles.iconContainer}
    />

    <ListItem.Content style={{ paddingLeft: 5 }}>
      <ListItem.Title>
        <MulishText bold fontSize={rf(2)} color="#1E2022">
          {video.title}
        </MulishText>
      </ListItem.Title>
      <ListItem.Subtitle>
        <MulishText fontSize={10} color="#1E2022">
          {WEEKDAYS[video.day]}
        </MulishText>
      </ListItem.Subtitle>
    </ListItem.Content>
    <ListItem.Chevron iconProps={{ color: "#77838F", size: 30 }} />
  </ListItem>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  scrollView: {
    height: 60,
    paddingLeft: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  image: {
    width: wp("90%"),
    height: wp("50%"),
    resizeMode: "cover",
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  heading: {
    marginVertical: 15,
  },
  text: {
    textAlign: "justify",
    lineHeight: 18,
  },
  circle: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("12%"),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  chevron: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
  },
  videoCard: {
    width: wp("85%"),
    height: 300,
    backgroundColor: "#FFF",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderRadius: 12,
    marginVertical: 10,
    elevation: 8,
  },
  videoPlayer: {
    backgroundColor: "#000",
    flex: 0,
    width: "100%",
    height: 250,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  caption: {
    height: 50,
    justifyContent: "center",
  },
  title: {
    marginHorizontal: wp("5%"),
  },
  chevron: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primaryColor,
  },
  empty: {
    flex: 1,
    height: hp("50%"),
    alignItems: "center",
    justifyContent: "center",
  },
});

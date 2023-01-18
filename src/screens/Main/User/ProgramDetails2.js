import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { closeAlert, showAlert } from "react-native-customisable-alert";
import { Avatar, Button, Image } from "react-native-elements";
import { useDispatch } from "react-redux";
import MulishText from "../../../components/MulishText";
import NavigationHeader from "../../../components/NavigationHeader";
import PoppinsText from "../../../components/PoppinsText";
import PrimaryButton from "../../../components/PrimaryButton";
import Row from "../../../components/Row";
import Colors from "../../../constants/Colors";
import { rf, wp } from "../../../constants/Constants";
import { goBack, navigate } from "../../../navigations/NavigationService";
import { cancelSubscription, purchaseClass } from "../../../redux/actions/ClientActions";
import { _translate } from '../../../localization';
import { useUser } from "../../../redux/reducers/AuthReducer";
import {
  useClassDetails,
  useIsLoading,
} from "../../../redux/reducers/ClientReducer";
import { useProfile, useIsLoading as useLoadingProfile } from "../../../redux/reducers/ProfileReducer";
import { fetchMyProfile } from "../../../redux/actions/ProfileActions";
import { isAfterToday } from "../../../utilities/utils";

export default function ProgramDetails2() {
  const dispatch = useDispatch();
  const profile = useProfile();
  const program = useClassDetails();
  const loading = useIsLoading();
  const loadingProfile = useLoadingProfile()

  const {
    _id: programId,
    title,
    price,
    videos,
    image,
    subTitle,
    description,
    totalLength,
    daily,
    createdBy,
  } = program;

  let isPurchased = false, isExpired = false;
  const subscriptions = profile?.subscribedTrainers || []; 
  for (const subscription of subscriptions) {
    const { subscribed, trainer, expires } = subscription; 
    if(trainer._id === createdBy?._id){
      isPurchased = subscribed;
      isExpired = !isAfterToday(new Date(expires)); 
    }
  }

  useEffect(() => {
    if(isExpired)
      showAlert({
        title: "Subscription Expired",
        message: 'Your subscription has expired. Kindly renew your subscription to access all classes of '+ createdBy?.name,
        alertType: "warning",
        dismissable: false,
        btnLabel: 'Renew Subscription',
        onPress: buyNow,
        onDismiss: goBack
      });
}, [isExpired]);

  const buyNow = () => {
    if(createdBy)
      dispatch(
        purchaseClass({
          type: "subscription",
          trainerId: createdBy._id,
          programId,
          amount: Math.round(price)
        })
      )
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        const raypdRedirectUrl = originalPromiseResult;
        if (raypdRedirectUrl) {
          navigate('Checkout', { url: raypdRedirectUrl })
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
    if(createdBy)
    showAlert({
      title: 'Cancel Subscription',
      message: `This will remove your access from all classes of ${createdBy.name}. Do you want to continue?`,
      alertType: 'warning',
      dismissable: true,
      btnLabel: 'PROCEED',
      leftBtnLabel: 'CANCEL',
      onPress: () => {
        closeAlert();
        dispatch(cancelSubscription(createdBy._id))
        .then(unwrapResult)
        .then((originalPromiseResult) => {
          const success = originalPromiseResult;
          if (success) {
            dispatch(fetchMyProfile());
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
      }
    });
  };

  return (
    <View style={styles.container}>
      <NavigationHeader title={title} backArrow={true} showRightMenu={false} />
      <ScrollView
        contentContainerStyle={{ width: "100%", alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: image }} style={styles.image} />

        <Row
          style={{
            width: wp("90%"),
            marginVertical: 10,
            justifyContent: "flex-start",
          }}
        >
          <MulishText
            bold
            color="#000"
            fontSize={rf(2)}
          >{_translate("programBy")}</MulishText>
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

        <Row style={{ width: wp("90%"), marginVertical: 10 }}>
          <PoppinsText color="#7D7D7D" fontSize={rf(1.8)}>
            {subTitle}
          </PoppinsText>
          <PoppinsText color="#2E2A2A" fontSize={rf(1.7)}>
            {daily ? `${daily} ${_translate("minDaily")}` : ""}
          </PoppinsText>
        </Row>

        <Row style={{ width: wp("90%"), marginVertical: 10 }}>
          <MulishText
            bold
            color="#000"
            fontSize={rf(2)}
          >{_translate("description")}</MulishText>
          <MulishText color="#1E2022" fontSize={rf(2)}>{`${
            totalLength || ""
          }`}</MulishText>
        </Row>

        <View style={{ width: wp("90%") }}>
          <MulishText color="#000" fontSize={rf(1.6)} style={styles.text}>
            {description || ""}
          </MulishText>
        </View>

        <Row style={{ width: wp("90%"), marginVertical: 10 }}>
          <MulishText bold color="#000" fontSize={rf(2)}>{`Price`}</MulishText>
          <View style={styles.circle}>
            <PoppinsText semiBold color="#000" fontSize={rf(2.2)}>
              {`${price || ""}$`}</PoppinsText>
          </View>
        </Row>

        {isPurchased ? (
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <PoppinsText
              color="#bbb"
              fontSize={rf(1.5)}
              style={{ marginVertical: 30 }}
            >
              {_translate("youHaveAlreadySubscribedToThisClass")}
            </PoppinsText>
             <Button
                title='Cancel Subscription'
                type='clear'
                onPress={onCancelSubscription}
                titleStyle={{fontSize: 13, color: '#666'}}
                buttonStyle={{ height: 50, borderRadius: 25 }}
                containerStyle={{ marginHorizontal: 16, marginVertical: 5 }}
                TouchableComponent={TouchableOpacity}
                loading={loading || loadingProfile}
                />
          </View>
        ) : (
          <>
            <PoppinsText
              color="#bbb"
              fontSize={rf(1.5)}
              style={{ marginVertical: 10 }}
            >{_translate("subscribeToAllClassesOfThisTrainerNow")}</PoppinsText>
            <PrimaryButton
              title={_translate("subscribeClasses")}
              buttonStyle={{
                width: wp("50%"),
                height: 56,
                borderRadius: 10,
                marginVertical: 20,
              }}
              onPress={buyNow}
              loading={loading}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexWrap: "nowrap",
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
});

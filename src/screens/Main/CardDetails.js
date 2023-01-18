/* eslint-disable react-native/no-raw-text */
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import images from "../../assets/images";
import CardFieldInput from "../../components/CardFieldInput";
import NavigationHeader from "../../components/NavigationHeader2";
import PrimaryButton from "../../components/PrimaryButton";
import Row from "../../components/Row";
import Colors from "../../constants/Colors";
import { hp, WIDTH, wp } from "../../constants/Constants";
import { navigate } from "../../navigations/NavigationService";
import CreditCard, {CardImages} from 'react-native-credit-card';
import { useIsLoading, useMembership, useMemberships } from "../../redux/reducers/ProfileReducer";
import { useRoute } from "@react-navigation/native";
import { updateMembership } from "../../redux/actions/ProfileActions";
import { unwrapResult } from "@reduxjs/toolkit";
import { showAlert } from "react-native-customisable-alert";
import { useDispatch } from "react-redux";
import { _translate } from "../../localization";

export default function CardDetails() {
  const route = useRoute(); 
  const dispatch = useDispatch()
  const memberships = useMemberships();
  const isLoading = useIsLoading()

  const membershipId = route.params.membershipId; 
  const membership = memberships.find(m => m._id === membershipId); 

  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [focused, setFocused] = useState('');


  const onPayNow = () => { 
      dispatch(updateMembership(membership?._id))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        const profile = originalPromiseResult; 
        if(profile?._id){
          navigate('PurchaseSuccess')
        }
      })
      .catch((rejectedValue) => {
        console.log('rejectedValue: ', rejectedValue)
        showAlert({
          title: `${_translate("somethingWentWrong")}`,
          message: rejectedValue,
          alertType: 'error'
        })
      });    
   }

  return (
    <View style={styles.container}>
      <NavigationHeader title={_translate("paymentDetails")} containerStyle={{ backgroundColor: Colors.primaryColor }}/>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardview} >

          <CreditCard
            style={styles.creditcard}
            shiny={false}
            bar={false}
            focused={focused}
            number={number}
            name={name}
            expiry={`${expiryMonth}${expiryYear}`}
            cvc={cvc}
            type={type}
            imageFront={images.card_front}
            imageBack={images.card_back}
            />
        </View>

        <View style={styles.whiteBackground}>
          <View style={{height: 350}}>
            <CardFieldInput 
              label={_translate("cardNumber")} 
              keyboardType="number-pad" 
              onChangeText={(text) => setNumber(text)}
              onFocus={() => setFocused('number')}
              maxLength={16}
              />
            <CardFieldInput 
              label={_translate("cardHolderName")} 
              onChangeText={(text) => setName(text)}
              onFocus={() => setFocused('name')}
            />
            <Row style={{ width: wp("90%"), justifyContent: "space-between" }}>
              <View style={{ width: wp("45%") }}>
                <CardFieldInput 
                  label={_translate("month")} 
                  keyboardType="number-pad" 
                  maxLength={2}
                  onChangeText={(text) => setExpiryMonth(text)}
                  onFocus={() => setFocused('expiry')}
              />
              </View>
              <View style={{ width: wp("45%") }}>
                <CardFieldInput 
                  label={_translate("year")} 
                  keyboardType="number-pad" 
                  maxLength={2}
                  onChangeText={(text) => setExpiryYear(text)}
                  onFocus={() => setFocused('expiry')}
                  />
              </View>
            </Row>
            <CardFieldInput 
            label="CVC" 
            keyboardType="number-pad" 
            maxLength={3}
            onChangeText={(text) => setCvc(text)}
            onFocus={() => setFocused('cvc')}

            />
          </View>

          <PrimaryButton
            title={`${_translate("payNow")} ${membership?.price}`}
            buttonStyle={{ width: wp("50%"), height: 62, borderRadius: 10 }}
            containerStyle={{ marginTop: hp('3%') }}
            onPress={onPayNow}
            loading={isLoading}
          />
        </View>
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
    width: wp("100%"),
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
  },
  cardview: {
    width: wp("100%"),
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,

  },
  creditcard: {
    width: 300,
    height: 200,
    marginTop: hp("3%"),
    marginBottom: hp("5%"),
    borderRadius: 10,
    elevation: 3, 
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  whiteBackground: {
    width: wp("100%"),
    height: 500,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: hp("2%"),
    paddingBottom: hp("5%"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textContainer: {
    width: WIDTH,
    height: 150,
    justifyContent: "space-between",
    //  backgroundColor: '#aaa',
  },
  heading: {
    color: "#222222",
    fontSize: 28,
    textAlign: "center",
  },
  text: {
    color: "#222222",
    fontSize: 16,
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
});

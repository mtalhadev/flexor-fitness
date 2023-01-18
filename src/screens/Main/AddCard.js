/* eslint-disable react-native/no-raw-text */
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../assets/images';
import CardFieldInput from '../../components/CardFieldInput';
import NavigationHeader from '../../components/NavigationHeader2';
import PrimaryButton from '../../components/PrimaryButton';
import Row from '../../components/Row';
import Colors from '../../constants/Colors';
import { hp, WIDTH, wp } from '../../constants/Constants';
import { goBack, navigate } from '../../navigations/NavigationService';
import { _translate } from "../../localization";


export default function AddCard() {
  
  const insets = useSafeAreaInsets(); 


    return (
          <View style={styles.container}>
            <NavigationHeader title={_translate("paymentDetails")} />

          <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>

            <Image 
              source={images.creditcard}
              style={[styles.creditcard, { marginTop: hp('3%') }]}
            />

          <View style={styles.whiteBackground}>

            <View style={{ }}>
              <CardFieldInput label={_translate("cardNumber")} keyboardType="number-pad"/>
              <CardFieldInput label={_translate("cardHolderName")} />
              <Row style={{ width: wp('90%'), justifyContent: 'space-between' }}>
                <View style={{ width: wp('45%') }}>
                  <CardFieldInput label={_translate("month")} keyboardType="number-pad"/>
                </View>
                <View style={{ width: wp('45%') }}>
                  <CardFieldInput label={_translate("year")} keyboardType="number-pad"/>
                </View>
              </Row>
              <CardFieldInput label="CVC" keyboardType="number-pad" />
            </View>

            <PrimaryButton 
              title={_translate("addAccount")}
              buttonStyle={{ width: wp('50%'), height: 62, borderRadius: 10 }}
              onPress={() => { goBack() }}
            />

          </View>

          </ScrollView>

          </View>
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.primaryColor
  },
  scrollView: {
    width: wp('100%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  creditcard: {
      width: wp('90%'),
      height: 190,
      resizeMode: 'contain',
      marginTop: hp('3%'),
      marginBottom: hp('3%'),
      borderRadius: 10
  },
  whiteBackground: {
    width: wp('100%'),
    height: 500,
    backgroundColor: '#FFF',
    alignItems: "center",
    justifyContent:"space-between",
    paddingTop: hp('2%'),
    paddingBottom: hp('5%'),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textContainer: {
     width: WIDTH,
     height: 150,
     justifyContent: 'space-between',
    //  backgroundColor: '#aaa',
  },
  heading:{
    color: '#222222',
    fontSize: 28,
    textAlign: 'center',
  },
  text:{
    color: '#222222',
    fontSize: 16,
  },
  btnContainer: {
    width: WIDTH,
    height: 110,
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  rating:{
    width: wp('80%'),
    justifyContent: 'space-between',
  }


})
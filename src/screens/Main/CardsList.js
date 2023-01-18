import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import images from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import PrimaryButton from '../../components/PrimaryButton';
import Colors from '../../constants/Colors';
import { wp } from '../../constants/Constants';
import { navigate } from '../../navigations/NavigationService';
import { _translate } from "../../localization";


export default function CardsList() {
  
    return (
            <View style={styles.container}>
                <NavigationHeader
                  title={_translate("payment")} 
                  backArrow={true}
                  />
            
            <Image source={images.mastercard} style={styles.card} onPress={() => navigate('CardDetails')} />
            <Image source={images.visacard} style={styles.card} onPress={() => navigate('CardDetails')}/>

            <PrimaryButton
              title={_translate("addNewCard")}
              buttonStyle={{ width: wp('50%'), height: 62, borderRadius: 10 }}
              onPress={() => { navigate('AddCard') }}
            />

            </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background2,
  },
  card: {
      width: wp('90%'),
      height: 80,
      resizeMode: "contain",
      marginVertical: 10
  }
})
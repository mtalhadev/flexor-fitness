import moment from 'moment';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import images from '../assets/images';
import { rf, wp } from '../constants/Constants';
import { navigate } from '../navigations/NavigationService';
import PoppinsText from './PoppinsText';
import PrimaryButton from './PrimaryButton';
import Row from './Row';
import { _translate } from "../localization"

export default function OfferCard({ image, title, expiry, onGetOffer }) {
    const expiryDate = new Date(expiry); 

    const hours = moment(expiryDate).diff(moment(), 'hours'); 
    const days = Math.floor(hours/24); 
    const remaining = hours%24; 


    return (
        <ImageBackground
            source={{ uri: image }}
            style={styles.container}
            imageStyle={styles.image}
        >

            <PoppinsText bold fontSize={19} color={'#FFF'}>{title}</PoppinsText>

            <Row style={{ justifyContent: "space-between", alignItems: 'center', }} >
                <Row style={{ width: 100, justifyContent: 'space-between'}}>
                    <ProgressBox value={days} unit={'Days'} />
                    <ProgressBox value={remaining} unit={'Hours'} />
                </Row>
                <PrimaryButton
                    title={_translate("getNow")}
                    titleStyle={{ fontSize: rf(2) }}
                    buttonStyle={{ width:100, height: 38, borderRadius: 9, padding: 0}}
                    onPress={onGetOffer}
                    />
            </Row>

        </ImageBackground>
        )
}

const ProgressBox = ({ value, unit }) => (
    <View style={{ height: 60, justifyContent: 'space-between', alignItems: 'center', }}>
    <ImageBackground source={images.progressBox} style={styles.progressBox} resizeMode="contain">
        <PoppinsText bold fontSize={rf(1.2)} color={'#FFF'}>{value}</PoppinsText>
    </ImageBackground>
    <PoppinsText bold fontSize={rf(1)} color={'#FFF'}>{unit}</PoppinsText>
    </View>
)

const styles = StyleSheet.create({
  container: {
      width: wp('90%'),
      height: 171,
      borderRadius: 10,
      marginVertical: 15,
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 10,
  },
  image: {
    width: wp('90%'),
    height: 171,
    borderRadius: 10,
    resizeMode: "cover",
    
  },
  progressBox: {
    width: 40,
    height: 43.5,
    justifyContent: 'center',
    alignItems: 'center',
  },


})
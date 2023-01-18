import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AirbnbRating, Image, Rating } from 'react-native-elements';
import Modal from 'react-native-modal';
import { wp } from '../constants/Constants';
import { goBack, navigate } from '../navigations/NavigationService';
import MulishText from './MulishText';
import PrimaryButton from './PrimaryButton';
import { _translate } from "../localization"
import images from '../assets/images';

export default function RatingModal({ 
    isModalVisible,
    closeModal,
    item  
 }) {
  
    return (
        <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        backdropOpacity={0.9}
        animationIn='slideInUp'
        animationOut='zoomOut'
        animationInTiming={300}
        animationOutTiming={300}
        style={{ justifyContent: "flex-start", paddingVertical: 100, alignItems: 'center', }}
        useNativeDriver>

          <View style={styles.container}>

            <View style={styles.circle}>
              <Image
                source={images.smiley2}
                style={{ width: 60, height: 60, resizeMode: "contain"}}
              />
            </View>

            <AirbnbRating
                count={5}
                defaultRating={item.rating}
                size={30}
                reviewSize={0}
                starContainerStyle={{ justifyContent: 'space-between', width: 200, height: 60 }}
                isDisabled
              />

              <MulishText semiBold fontSize={18} color={'#9093A3'} style={{ width: '80%', textAlign: "center",}}>
                {_translate("Thanks for your awesome experience")}
              </MulishText>

              <PrimaryButton 
                title={_translate('Back to home')}
                buttonStyle={{ width: wp('50%'), height: 62, borderRadius: 62 }}
                onPress={() => { closeModal(); goBack() }}
                />
          </View>
          </Modal>
    )
}
const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    height: 420,
    alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: '#FFF',
    borderRadius: 30,
    paddingVertical: 30
  },
  rating:{
    width: wp('80%'),
    justifyContent: 'space-between',
  },
  circle: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF3FA',
    borderRadius: 100
  },

})
/* eslint-disable react-native/no-raw-text */
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image, AirbnbRating, Avatar } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../assets/images';
import MulishText from '../../../components/MulishText';
import NavigationHeader from '../../../components/NavigationHeader2';
import PrimaryButton from '../../../components/PrimaryButton';
import RatingModal from '../../../components/RatingModal';
import Row from '../../../components/Row';
import Colors from '../../../constants/Colors';
import { hp, WIDTH, wp } from '../../../constants/Constants';
import { navigate } from '../../../navigations/NavigationService';
import { _translate } from '../../../localization';
import { useUser } from '../../../redux/reducers/AuthReducer';
import StyledInput from '../../../components/StyledInput';
import { useDispatch } from 'react-redux';
import { addReview } from '../../../redux/actions/ClientActions';
import { unwrapResult } from '@reduxjs/toolkit';
import { showAlert } from 'react-native-customisable-alert';
import { useIsLoading } from '../../../redux/reducers/ClientReducer';

export default function RateTrainer({ route }) {
  const dispatch = useDispatch();
  const profile = route?.params?.trainer;
  const isLoading = useIsLoading();
  
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const [modalProps, setModalProps] = useState({
    visible: false, data: { }
  });

  const onSubmit = () => { 
    dispatch(addReview({
      rating: rating,
      trainerId: profile._id,
      message: review
    }))
    .then(unwrapResult)
    .then((success) => {
      if(success) {
        setModalProps({ visible: true, data: { rating, review }})
      }
    })
    .catch((rejectedValue) => {
      console.log("rejectedValue: ", rejectedValue);
      showAlert({
        title: "Something went wrong!!",
        message: rejectedValue,
        alertType: "error",
      });
    });

   }
    return (
          <View style={styles.container}>

            <NavigationHeader title={_translate("rateTrainer")} />

            <View style={{ width: wp('100%'),height: hp('40%')-100, justifyContent: 'center', alignItems: 'center', }}>
              <Avatar 
                source={{ uri: profile?.image }}
                containerStyle={[styles.manWithPhone, { marginTop: 0 }]}
              />
            </View>


          <View style={styles.whiteBackground}>

              <MulishText semiBold style={styles.heading}>
                { profile?.name }
              </MulishText>

              <AirbnbRating
                count={5}
                defaultRating={0}
                size={30}
                reviewSize={0}
                starContainerStyle={{ justifyContent:  'space-between', width: 200, height: 60 }}
                onFinishRating={(val) => setRating(val)}
              />
              
              <StyledInput
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.inputView}
                inputStyle={styles.inputStyle}
                value=''
                placeholder={_translate("writeAReview")}
                onChangeText={(text) => setReview(text)}
                onFocus={() => {}}
                onEndEditing={(text) => {}}
                keyboardType='default'
                returnKeyType='done'
                onSubmitEditing={() => {}}
                multiline
                />

              <PrimaryButton 
                title={_translate("submit")}
                buttonStyle={{ width: wp('50%'), height: 50, borderRadius: 62 }}
                loading={isLoading}
                onPress={onSubmit}
              />

          </View>

          <RatingModal 
              isModalVisible={modalProps.visible}
              closeModal={() => { setModalProps({ ...modalProps, visible: false })}}
              item={modalProps.data}  
          />

          </View>
    )
}

const SmilleyButton = ({ smiley, text, onSelect, selected }) => (
  <TouchableOpacity onPress={() => { onSelect(text) }}>
  <View style={{ height: 100, justifyContent: "space-between", alignItems: 'center',}}>
      <View style={[styles.circle, { borderWidth: 0, elevation: selected ? 5 : 0 }]}>
        <Image 
          source={smiley}
          style={{ width: 34, height: 34, resizeMode: "contain"}}
        />
      </View>
      <MulishText semiBold fontSize={14} color={selected ? "#222222" : "#9093A3"} >{text}</MulishText>
  </View>
  </TouchableOpacity>

)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.primaryColor
  },
  circle: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#DEE1E6',
    borderWidth: 1,
    borderRadius: 60,
    backgroundColor: "#FFF"
  },
  manWithPhone: {
      width: 130,
      height: 130,
      resizeMode: 'cover',
      borderRadius: 30,
      borderColor: '#FFF',
      borderWidth: 5,
      backgroundColor: "#FFF"

  },
  whiteBackground: {
    width: wp('100%'),
    height: hp('60%'),
    backgroundColor: '#FFF',
    alignItems: "center",
    justifyContent:"space-between",
    paddingTop: hp('8%'),
    paddingBottom: hp('3%'),
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0  ,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  textContainer: {
     width: WIDTH,
     height: 150,
     justifyContent: 'space-between',
    //  backgroundColor: '#aaa',
  },
  heading:{
    color: '#222222',
    fontSize: 22,
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
  },
  inputContainer: {
    height: hp('60%')-250,
    width: wp('90%') - 10,
    marginTop: 0, marginBottom: 10,

  },
  inputView: {
    height: hp('60%')-280,
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    borderColor: '#999',
    borderWidth: 1,
    borderBottomWidth: 1
  },
  inputStyle: {
      fontSize: 14,
  },



})
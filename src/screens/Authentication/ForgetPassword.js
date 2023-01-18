import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import Lock from '../../assets/svg/Lock';
import MulishText from '../../components/MulishText';
import PrimaryButton from '../../components/PrimaryButton';
import StyledInput from '../../components/StyledInput';
import Colors from '../../constants/Colors';
import CommonStyles from '../../constants/CommonStyles';
import { hp, wp } from '../../constants/Constants';
import { navigate } from '../../navigations/NavigationService';
import withResize from '../../utilities/resizedSvg';
import { useIsLoading, useIstrainer } from '../../redux/reducers/AuthReducer';
import { forgetPassword } from '../../redux/actions/AuthActions';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { showAlert } from 'react-native-customisable-alert';
import { _translate } from "../../localization";
function ForgetPassword({ insets, route }) {
  
  const LockSvg = withResize(Lock, 1)

  const [email, setEmail] = useState('');
  
  const isTrainer = useIstrainer(); 
  const isLoading = useIsLoading(); 

  const dispatch = useDispatch()

  const submitForm = () => {
    console.log('submitting form .....', { email });
    dispatch(forgetPassword({email}))      
    .then(unwrapResult)
    .then((originalPromiseResult) => {
      const userid = originalPromiseResult; 
      if(userid){
        navigate('VerifyEmail', { userid })
      }
    })
    .catch((rejectedValue) => {
      console.log('rejectedValue: ', rejectedValue)
      showAlert({
        title: 'Something went wrong!',
        message: rejectedValue,
        alertType: 'error'
      })
    })
}   


    return (
      <KeyboardAvoidingView
        //keyboardVerticalOffset={keyboardVerticalOffset}
        behavior={Platform.OS == "ios" ? "padding" : null}
        style={styles.container}
      >
         <ScrollView
            contentContainerStyle={{
              width: wp('100%'),
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: hp('4%'),
            }}
            showsVerticalScrollIndicator={false}>

              <LockSvg
                  width={247}
                  height={206}
                  style={{ marginTop: hp('10%') + insets.top }}
              />
              <View style={styles.formContainer} >

              <MulishText extraBold style={styles.heading}>
                  {_translate("forgotPassword")}
              </MulishText>
              <MulishText style={styles.text}>
                {_translate("enterEmailToResetpassword")}
              </MulishText>

              <StyledInput
                containerStyle={[CommonStyles.input, { height: 70 }]}
                inputContainerStyle={{ height: 70 }}
                placeholder={_translate("enterEmail")}
                keyboardType='email-address'
                returnKeyType='done'
                onEndEditing={(text) => setEmail(text)}

                />
              
              <TouchableOpacity
                style={{ marginVertical: hp('3%')}}
                onPress={() => { }}
              >
                <MulishText>
                  {_translate("tryAnotherWay")}
                </MulishText>
              </TouchableOpacity>

              <PrimaryButton
                title={_translate("resetPassword")}
                buttonStyle={{ width: wp('80%'), height: 70, borderRadius: 10, marginBottom: hp('1%') }}
                onPress={submitForm}
                />
              
            </View>
            </ScrollView>

          </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background

  },
  logo: {
    width: wp('100%'),
    height: hp('20%') ,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: wp('10%'),
    // backgroundColor: '#ddd',
  },
  heading:{
    color: '#3D374F',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: wp('10%'),
    marginTop: hp('8%')
  },
  text:{
    color: 'rgba(0,0,0,0.53)',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: wp('12%'),
    marginVertical: hp('3%'),
  },
  input: {
    width: wp('90%'),
    height: 70,
    marginTop: hp('2%')
  },

})

export default withSafeAreaInsets(ForgetPassword)
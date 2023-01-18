import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { showAlert } from 'react-native-customisable-alert';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import Mail from '../../assets/svg/Mail';
import CodeInput from '../../components/CodeInput';
import MulishText from '../../components/MulishText';
import PrimaryButton from '../../components/PrimaryButton';
import Colors from '../../constants/Colors';
import { hp, wp } from '../../constants/Constants';
import { navigate } from '../../navigations/NavigationService';
import { confirmCode } from '../../redux/actions/AuthActions';
import { useIsLoading } from '../../redux/reducers/AuthReducer';
import withResize from '../../utilities/resizedSvg';
import { _translate } from "../../localization";
function VerifyEmail({ insets, route }) {
  
  const userid = route?.params?.userid; 

  const MailSvg = withResize(Mail, 1)

  const [code, setCode] = useState('');

  const isLoading = useIsLoading(); 
  const dispatch = useDispatch()

  const submitForm = () => {
    console.log('submitting form .....', { code });
    dispatch(confirmCode({ userid, token: code }))      
    .then(unwrapResult)
    .then((originalPromiseResult) => {
      if(originalPromiseResult == true){
        navigate('NewPassword', { userid, code })
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

              <MailSvg 
                width={145}
                height={153}
                style={{ marginTop: hp('10%') + insets.top }}
              />
              <View style={styles.formContainer} >

              <MulishText extraBold style={styles.heading}>
                  {_translate("verifyYourEmail")}
              </MulishText>
              <MulishText style={styles.text}>
                {_translate("pleaseCheckEmailForCode")}
              </MulishText>
              
              <CodeInput 
                onCodeSubmit={(text) => setCode(text)}
              />
              
              <TouchableOpacity
                style={{ marginVertical: hp('3%')}}
                onPress={() => { }}
              >
                <MulishText extraBold color='#2B2C43'>
                  {_translate("resendCode")}
                </MulishText>

              </TouchableOpacity>

              <PrimaryButton
                title={'Send'}
                buttonStyle={{ width: wp('80%'), height: 70, borderRadius: 10, marginBottom: hp('1%') }}
                onPress={submitForm}
                loading={isLoading}
                disabled={code.length < 4}
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
    color: 'rgba(0,0,0,0.63)',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: wp('12%'),
    marginVertical: hp('3%'),
  },
  input: {
    width: wp('90%'),
    height: 56,
    marginTop: hp('2%')
  },

})

export default withSafeAreaInsets(VerifyEmail)
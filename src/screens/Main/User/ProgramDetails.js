import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { showAlert } from 'react-native-customisable-alert';
import { Avatar, Image } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import MulishText from '../../../components/MulishText';
import NavigationHeader from '../../../components/NavigationHeader';
import PoppinsText from '../../../components/PoppinsText';
import PrimaryButton from '../../../components/PrimaryButton';
import Row from '../../../components/Row';
import Colors from '../../../constants/Colors';
import { rf, wp } from '../../../constants/Constants';
import { _translate } from '../../../localization';
import { navigate } from '../../../navigations/NavigationService';
import { purchaseProgram } from '../../../redux/actions/ClientActions';
import { useIsLoading, useProgramDetails } from '../../../redux/reducers/ClientReducer';
import { useProfile } from '../../../redux/reducers/ProfileReducer';

export default function ProgramDetails() {

    const program = useProgramDetails()
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

    const profile = useProfile(); 
    const isPurchased = profile?.programs?.findIndex(p => p._id === programId) >= 0; 

    console.log('programs: ', profile?.programs);
    console.log('programId: ', programId);
    console.log('isPurchased: ', isPurchased);

    const dispatch = useDispatch()
    const loading = useIsLoading(); 

    const buyNow = () => {
      dispatch(purchaseProgram({
        programId,
        amount: Math.round(price)
      }))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        const raypdRedirectUrl = originalPromiseResult;
        if (raypdRedirectUrl) {
          navigate('Checkout', { url: raypdRedirectUrl })
        }
      })
      .catch((rejectedValue) => {
        console.log('rejectedValue: ', rejectedValue)
        showAlert({
          title: 'Error',
          message: JSON.stringify(rejectedValue),
          alertType: 'error'
        })
      })
    }
    
    return (
      <View style={styles.container}>
          <NavigationHeader title={title} backArrow={true} showRightMenu={false} />   
          <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center',}} showsVerticalScrollIndicator={false}>

              <Image source={{ uri: image }} style={styles.image} />

              <Row style={{ width: wp('90%'), marginVertical: 10, justifyContent: 'flex-start', }}>
                <MulishText bold color="#000" fontSize={rf(2)} >{_translate("programBy")}</MulishText>
                <Avatar source={{ uri: createdBy?.image }} size={32} rounded containerStyle={{ marginHorizontal: wp('2%')}} />
                <MulishText semiBold color="#000" fontSize={rf(1.8)} >{ createdBy?.name }</MulishText>
              </Row>


              <Row style={{ width: wp('90%'), marginVertical: 10 }}>
                <MulishText bold color="#000" fontSize={rf(2)} >{_translate("description")}</MulishText>
                <MulishText color="#1E2022" fontSize={rf(2)} >{ `${totalLength || ''}` }</MulishText>
              </Row>

              <View style={{ width: wp('90%'), }}>
                <MulishText color="#000" fontSize={rf(1.6)} style={styles.text}>
                {description}
                </MulishText>
              </View>

              <Row style={{ width: wp('90%'), marginVertical: 10 }}>
                <MulishText bold color="#000" fontSize={rf(2)} >{_translate("price")}</MulishText>
                <View style={styles.circle}>
                  <PoppinsText semiBold color="#000" fontSize={rf(2.2)} style={styles.price} textProps={{ adjustsFontSizeToFit: true, numberOfLines: 1 }}>
                    { `${price}$` }
                  </PoppinsText>
                </View>
              </Row>

              {
                isPurchased ? 
                <PoppinsText color="#bbb" fontSize={rf(1.5)} style={{ marginVertical: 30 }}>{ _translate("youHaveAlreadyPurchasedThisProgram") }</PoppinsText>
                :
                <PrimaryButton
                title={_translate("buyNow")}
                buttonStyle={{ width: wp('50%'), height: 56, borderRadius: 10, marginVertical: 20 }}
                onPress={buyNow}
                loading={loading}
                />  
              }

          </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
  },
  scrollView: {
     height: 60,
     paddingLeft: 20,
     marginTop: 15,
     marginBottom: 10
  },
  image: {
      width: wp('90%'),
      height: wp('50%'),
      resizeMode: 'cover',
      borderTopLeftRadius: 12,
      borderBottomRightRadius: 12,
  },
  heading: {
     marginVertical: 15
  },
  text: {
    textAlign:'justify',
    lineHeight: 18
  },
  circle: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    
  },
  chevron: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
  },
  price: {
    width: wp('10%'),
    textAlign: "center",
  }
})
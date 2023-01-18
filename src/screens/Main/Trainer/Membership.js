import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { showAlert } from 'react-native-customisable-alert';
import { Image } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import images from '../../../assets/images';
import MulishText from '../../../components/MulishText';
import NavigationHeader from '../../../components/NavigationHeader';
import PoppinsText from '../../../components/PoppinsText';
import PrimaryButton from '../../../components/PrimaryButton';
import Row from '../../../components/Row';
import ToggleButton from '../../../components/ToggleButton';
import Colors from '../../../constants/Colors';
import { AUTH_TOKEN, hp, MEMBERSHIP, rf, wp } from '../../../constants/Constants';
import { navigate } from '../../../navigations/NavigationService';
import { fetchMemberships, updateMembership } from '../../../redux/actions/ProfileActions';
import { useIsLoading, useMembership, useMemberships } from '../../../redux/reducers/ProfileReducer';
import { useDispatchEffect } from '../../../utilities/hooks';
import { _translate } from '../../../localization';

function Membership() {
    const dispatch = useDispatch()
    const insets = useSafeAreaInsets(); 
    const memberships = useMemberships();
    const isLoading = useIsLoading()
    const activeMembership = useMembership();
    const [selectedMembership, setSelectedMembership] = useState(activeMembership._id);

    const membership = memberships.find(m => m._id === selectedMembership); 
    const maxClients = membership?.maxClients === "1" ? `1 Client` : 
                       membership?.maxClients === "50" ? `2 - 50 Clients`: 'Unlimited Clients'; 

    const onRefresh = useDispatchEffect(fetchMemberships, null, memberships.length === 0);

    useEffect(() => {
      if(!selectedMembership && memberships.length) {
        setSelectedMembership(memberships[0]._id)
      }
    }, [selectedMembership, memberships]);

    const rows = []; let i=0;
    while (i<memberships.length) {
      const row = [];
      if(memberships[i]) row.push(memberships[i]);
      if(memberships[i+1]) row.push(memberships[i+1]);
      rows.push(row);
      i+=2;
    }


    const onPressContinue = () => { 
      if(membership.title === 'Free')
        dispatch(updateMembership(membership._id))
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
      else 
        navigate('CardDetails', { membershipId: membership._id})
     }
    return (
      <View style={styles.container}>
      <NavigationHeader 
        title={''} 
        backArrow={true}
        />

        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>

              <Image
                    source={images.logo}
                    style={[styles.logo, { marginTop: insets.top}]}
                  />

              <View style={styles.formContainer} >

                <MulishText semiBold style={styles.heading}>
                    {_translate("membership")}
                </MulishText>
                <MulishText style={styles.text}>
                    {_translate("somethingWentWrong")}
                </MulishText>


                {
                  isLoading ? (
                    <ActivityIndicator
                      size="large"
                      color={Colors.primaryColor}
                      style={{ marginHorizontal: wp("40%") }}
                    />
                  ) : rows?.length == 0 ? (
                    <PoppinsText
                      semiBold
                      fontSize={rf(2.5)}
                      color="#bbb"
                      style={styles.emptyText}
                    >{_translate("noDataFound")}</PoppinsText>
                  ) : (
                    rows.map(row => (
                    row.length == 2 ?
                    <Row key={row[0]._id}>
                      <ToggleButton {...row[0] } onSelect={(id) => setSelectedMembership(id)} selected={selectedMembership==row[0]._id}/>
                      <ToggleButton {...row[1] } onSelect={(id) => setSelectedMembership(id)} selected={selectedMembership==row[1]._id}/>
                    </Row>
                    :
                    <ToggleButton {...row[0] } onSelect={(id) => setSelectedMembership(id)} selected={selectedMembership==row[0]._id} key={row[0]._id} />
                    ))
                  )}
                
            </View>

            <PrimaryButton
                title={`${_translate("continueWith")} ${maxClients}`}
                buttonStyle={{ width: wp('80%'), height: 56, borderRadius: 10, marginBottom: hp('1%') }}
                onPress={onPressContinue}
                loading={isLoading}

                />

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
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background

  },
  logo: {
    width: wp('80%'),
    height: hp('20%') ,
    resizeMode: 'contain',
  },
  formContainer: {
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: wp('10%'),
    // backgroundColor: '#ddd',
    marginBottom: hp('3%')
  },
  heading:{
    color: '#3D374F',
    fontSize: wp('6%'),
    textAlign: 'center',
    marginHorizontal: wp('10%'),
    marginTop: -hp('3%')
  },
  text:{
    color: 'rgba(0,0,0,0.53)',
    fontSize: wp('4%'),
    textAlign: 'center',
    marginHorizontal: wp('12%'),
    marginVertical: hp('3%'),
  },
  input: {
    width: wp('90%'),
    height: 56,
    marginTop: hp('2%')
  },
  google: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  }


})

export default Membership
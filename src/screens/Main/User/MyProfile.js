/* eslint-disable react-native/no-raw-text */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, ImageBackground, RefreshControl, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../assets/images';
import MyProgramCard from '../../../components/MyProgramCard';
import NavigationHeader from '../../../components/NavigationHeader2';
import PoppinsText from '../../../components/PoppinsText';
import TrainerCard from '../../../components/TrainerCard';
import Colors from '../../../constants/Colors';
import { hp, rf, wp } from '../../../constants/Constants';
import { navigate } from '../../../navigations/NavigationService';
import { fetchMyProfile, fetchMyPrograms } from '../../../redux/actions/ProfileActions';
import { useIstrainer, useUser } from '../../../redux/reducers/AuthReducer';
import { useMyPrograms, useProfile, useIsLoading, useMyTrainers, useMyClasses } from '../../../redux/reducers/ProfileReducer';
import { useDispatchEffect } from '../../../utilities/hooks';
import { _translate } from '../../../localization';
import { isAfterToday } from '../../../utilities/utils';
import { setPaymentSuccess, usePaymentSuccess } from '../../../redux/reducers/ClientReducer';
import { useDispatch } from 'react-redux';

const AVATAR_SIZE = wp('35%'); 

export default function MyProfile() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();   
  const programs = useMyPrograms(); 
  const classes = useMyClasses(); 
  const isLoading = useIsLoading(); 
  const profile = useProfile(); 
  const isTrainer = useIstrainer(); 
  const user = useUser();
  const paymentSuccess = usePaymentSuccess();

  const subscriptions = profile?.subscribedTrainers || []; 
  const myTrainers = {}; 
  for (const subscription of subscriptions) {
    const { subscribed, trainer, expires } = subscription; 
    const isExpired = !isAfterToday(new Date(expires)); 
    if(subscribed && !isExpired && !myTrainers[trainer._id]){
      myTrainers[trainer._id] = trainer;
    }
  }
  const subscribedTrainers = Object.values(myTrainers); 

  useEffect(() => {
    StatusBar.setTranslucent(true)
     return () => {
       StatusBar.setTranslucent(false)
     }
  }, []);

  useEffect(() => {
    if(paymentSuccess) {
      dispatch(fetchMyProfile());
      dispatch(setPaymentSuccess(false));
    }
  }, [paymentSuccess])


  const onRefresh = useDispatchEffect(fetchMyPrograms, null, isFocused);

    return (
       <ScrollView
          contentContainerStyle={{
            width: wp('100%'),
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingBottom: hp('4%'),
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
            />
          }>

        <ImageBackground 
          source={images.drawerHeaderBkgd}
          style={styles.container}
          imageStyle={styles.background}>
          
          <View style={styles.overlay}>
            <NavigationHeader 
              title={''} statusBarColor={'transparent'} 
              rightComponent={<Icon name='edit' type="feather" size={20} color='#FFF' onPress={() => navigate('EditProfile')} />}
            />
            <Avatar
                containerStyle={{  borderColor: Colors.background, borderWidth: 5,  zIndex: 1, marginTop: -wp('3%'), marginBottom: 10, padding:0, backgroundColor: '#FFF' }}
                imageProps={{resizeMode: 'cover'}}
                size={AVATAR_SIZE}      
                rounded
                source={{ uri: profile.image }}
                renderPlaceholderContent={<ActivityIndicator />}
                />
            <PoppinsText semiBold fontSize={rf(3.5)} color="#FFF"style={styles.text}>{profile.name}</PoppinsText>
            <PoppinsText fontSize={rf(1.5)} color="#FFFFFF90" style={styles.text}>{profile.email}</PoppinsText>
          </View>

        </ImageBackground>  

        <View style={styles.whiteBackground}>
            <View style={styles.handle} />
            <View style={{ width: wp('100%'), height: wp('75%'), marginTop: 20 }}>
              <PoppinsText semiBold fontSize={rf(3)} color="#2E2A2A" style={styles.heading} >{_translate("myPrograms")}</PoppinsText>
              {
              isLoading ?
              <ActivityIndicator size='large' color={Colors.primaryColor} />
              :
              programs.length == 0 ?
              <View style={{ height: wp('40%'), justifyContent: 'center',}}>
                <PoppinsText fontSize={rf(2.5)} color="#999" style={styles.text}>{_translate("noProgramsYet")}</PoppinsText>
              </View>
              :
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ height: wp('60%'), marginLeft: wp('5%') }}>
                {programs.map((item,i) => (
                  <MyProgramCard {...item} key={item._id}/>
                ))}
              </ScrollView> 
              }
            </View>
            <View style={{ width: wp('100%'), height: wp('75%'), marginTop: 20 }}>
              <PoppinsText semiBold fontSize={rf(3)} color="#2E2A2A" style={styles.heading} >{_translate("myClasses")}</PoppinsText>
              {
              isLoading ?
              <ActivityIndicator size='large' color={Colors.primaryColor} />
              :
              classes.length == 0 ?
              <View style={{ height: wp('40%'), justifyContent: 'center',}}>
                <PoppinsText fontSize={rf(2.5)} color="#999" style={styles.text}>{_translate("noClassesYet")}</PoppinsText>
              </View>
              :
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ height: wp('60%'), marginLeft: wp('5%') }}>
                {classes.map((item,i) => (
                  <MyProgramCard {...item} key={item._id}/>
                ))}
              </ScrollView> 
              }
            </View>
            <View style={{ width: wp('100%'), height: wp('80%'), }}>
              <PoppinsText semiBold fontSize={rf(3)} color="#2E2A2A" style={styles.heading} >{_translate("myTrainers")}</PoppinsText>
              {
              isLoading ?
              <ActivityIndicator size='large' color={Colors.primaryColor} />
              :
              subscribedTrainers?.length == 0 ?
              <View style={{ height: wp('30%'), justifyContent: 'center', }}>
                <PoppinsText fontSize={rf(2.5)} color="#999" style={styles.text}>{_translate("noTrainersYet")}</PoppinsText>
              </View>
              :
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                {subscribedTrainers.map(item => <TrainerCard {...item} key={item._id} />)}
              </ScrollView> 
              }
            </View>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('40%'),
    minHeight: 400,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background
  },
  background: {
    width: wp('100%'),
    height: hp('30%'),
    minHeight: 400,
    resizeMode: 'cover'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.7)', width: wp('100%'), height: 450, 
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  whiteBackground: {
    width: wp('100%'),
    backgroundColor: '#FFF',
    alignItems: "center",
    justifyContent:'flex-start',
    paddingTop: hp('2%'),
    marginTop: -30,
    borderTopLeftRadius: wp('12%'),
    borderTopRightRadius: wp('12%'),

  },
  heading: {
    marginLeft: 22,
    marginVertical: 10

  },
  scrollView: {
    height: 240,
    paddingLeft: 10
  },
  text: {
    textAlign: "center",
    marginHorizontal: wp('5%')
  },
  handle: {
    width: wp('15%'),
    height: 5,
    backgroundColor: '#AFAFAF',
    borderRadius: 5
  },
})
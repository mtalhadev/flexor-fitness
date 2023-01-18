/* eslint-disable react-native/no-raw-text */
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Image } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../assets/images';
import MulishText from '../../components/MulishText';
import PrimaryButton from '../../components/PrimaryButton';
import Colors from '../../constants/Colors';
import CommonStyles from '../../constants/CommonStyles';
import { HEIGHT, hp, rf, WIDTH, wp } from '../../constants/Constants';
import { navigate } from '../../navigations/NavigationService';
import { _translate } from "../../localization"
export default function OnboardingScreen() {
  
  const insets = useSafeAreaInsets(); 

  const [dimensions, setDimensions] = useState({
      width: 0,
      height: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollView = useRef();

  const _onMomentumScrollEnd = (e) => {
      const offset = e.nativeEvent.contentOffset.x;
      const newIndex = Math.round(offset / dimensions.width);
      if (newIndex === activeIndex) {
          return;
      }
      const lastIndex = activeIndex;
      setActiveIndex(newIndex)
  };
  const _onLayout = ({ nativeEvent }) => {
      const { width, height } = nativeEvent.layout;
      if (width !== dimensions.width || height !== dimensions.height) {
          // Set new width to update rendering of pages
          setDimensions({ width, height });
          // Set new scroll position
          const func = () => {
              scrollView.current?.scrollTo({
                  x: activeIndex * width,
                  animated: false,
              });
          };
          setTimeout(func, 0); 
      }
  };
  const goToSlide = (pageNum) => {
    const prevNum = activeIndex;
    setActiveIndex(pageNum);
    scrollView.current?.scrollTo({
      x: pageNum * dimensions.width,
     });
  };

    return (
          <View style={styles.container}>
            <ImageBackground
              source={images.circlesBkgd}
              style={styles.circlesBkgd}
            >
              {
                activeIndex == 0 ?
                <Image 
                  source={images.manWithPhone}
                  style={[styles.manWithPhone, { marginTop: -hp('3%') + insets.top }]}
                />
                :
                <Image 
                  source={images.woman}
                  style={[styles.woman, { marginTop: -hp('3%') + insets.top }]}
                />
              }

            </ImageBackground>

            <ImageBackground
              source={images.whiteBackground}
              style={styles.whiteBackground}>
              
              <ScrollView 
              ref={scrollView}
              contentContainerStyle={{  }} 
              horizontal 
              pagingEnabled 
              showsHorizontalScrollIndicator={false} 
              bounces={false} 
              onMomentumScrollEnd={_onMomentumScrollEnd} 
              onLayout={_onLayout} 
              >
                <View style={styles.textContainer} >
                <MulishText extraBold style={styles.heading}>
                Search Best <MulishText extraBold>Trainer</MulishText>
                {"\n"}
                for exercises
                </MulishText>
                <MulishText style={styles.text}>
                {_translate("youCanFindOurBestTrainerFrom")}
                {_translate("listOfTrainersAndTrainerBuiltYour")} 
                {_translate("exercises")}
                </MulishText>
                </View>

              <View style={styles.textContainer} >
                <MulishText extraBold style={styles.heading}>
                Take <MulishText extraBold>Yoga</MulishText> Classes 
                {"\n"}
                From Home
                </MulishText>

                <MulishText style={styles.text}>
                {`${_translate("YouCanTakeYogaOnlineClasses")} ${"\n"}`}
                {_translate("fromBestTrainers")}
                </MulishText>
              </View>

              </ScrollView>

                <View style={styles.btnContainer}>
                  <View style={[CommonStyles.row]}>
                    {activeIndex == 0 ? <ActiveDot /> : <InactiveDot />}
                    {activeIndex == 1 ? <ActiveDot /> : <InactiveDot />}
                  </View>
                  <PrimaryButton 
                    title={activeIndex == 0 ? `${_translate("next")}`: `${_translate("getStarted")}`}
                    buttonStyle={{ width: wp('50%'), height: hp('10%') }}
                    onPress={() => { activeIndex == 0 ? goToSlide(1) : navigate(_translate('StartScreen')) }}
                  />

                </View>
                
            </ImageBackground>

          </View>
    )
}

const ActiveDot = () => (
  <View style={styles.activeDot}/>
)
const InactiveDot = () => (
  <View style={styles.inactiveDot}/>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.primaryColor
  },
  circlesBkgd: {
    width: wp('100%'),
    height: hp('55%'),
    resizeMode: 'cover',
  },
  manWithPhone: {
      width: wp('100%'),
      height: hp('55%'),
      resizeMode: 'contain',
      marginTop: -hp('4%')
  },
  woman: {
    width: wp('100%'),
    height: hp('78%'),
    resizeMode: 'contain',
    marginTop: -hp('3%')
  },
  whiteBackground: {
    width: wp('100%'),
    height: hp('60%'),
    alignItems: "center",
    justifyContent:"space-between",
    resizeMode: "contain",
    paddingTop: hp('8%'),
    paddingBottom: 40,
    position: "absolute",
    bottom: -30,
    left: 0,
    right: 0
  },
  textContainer: {
     width: WIDTH,
     height: hp('20%'),
     justifyContent: 'space-between',
    //  backgroundColor: '#aaa',
  },
  heading:{
    color: '#3D374F',
    fontSize: rf(3.5),
    textAlign: 'center',
  },
  text:{
    color: '#6C6876',
    fontSize: rf(2),
    textAlign: 'center',
    marginHorizontal: wp('12%'),
    marginTop: hp('1.5%'),
  },
  activeDot: {
    width: 30,
    height: 7,
    backgroundColor:Colors.primaryColor,
    borderRadius: 7,
    marginHorizontal: 1
  },
  inactiveDot: {
    width: 14,
    height: 7,
    backgroundColor: '#C4C4C4',
    borderRadius: 7,
    marginHorizontal: 1
  },
  btnContainer: {
    width: WIDTH,
    height: hp('15%'),
    alignItems: 'center',
    justifyContent: 'space-between',

  },


})
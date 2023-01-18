import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch } from 'react-redux';
import MulishText from '../components/MulishText';
import NavigationHeader from '../components/NavigationHeader';
import Row from '../components/Row';
import Colors from '../constants/Colors';
import { hp, LANGUAGE, rf, wp } from '../constants/Constants';
import { currentLocale, setI18nConfig, _translate } from '../localization';
import { setLanguage, useLanguage } from '../redux/reducers/AuthReducer';
import LocalStorage from '../services/LocalStorage';

 function ChangeLanguage() {  
    const dispatch = useDispatch()
    const Language = useLanguage()

    const onSelectLanguage = async (code) => { 
      await setI18nConfig(code);
      LocalStorage.storeData(LANGUAGE, code);
      dispatch(setLanguage(code));
    }

    return (
      <View style={styles.container}>

        <NavigationHeader title="" backArrow />
        
        <View style={styles.content}>
          <MulishText bold style={styles.heading}>
            {_translate(`changeLanguage`)}
          </MulishText>
          <MulishText style={styles.text}>
            {_translate(`pleaseSelectLanguage`)}
          </MulishText>
          <Row style={{  }}>
            <ToggleButton code={'en'} title="English" onSelect={onSelectLanguage} selected={Language==='en'} />
            <ToggleButton code={'is'} title="Icelandic" onSelect={onSelectLanguage} selected={Language==='is'} />
          </Row>
        </View>
      </View>
      )
  }
  
const ToggleButton = ({ title, code,  onSelect, selected  }) => (
    <TouchableWithoutFeedback onPress={() => { onSelect(code) }}>
        <View style={{ ...toggleBtnStyles.container, backgroundColor: selected ? Colors.primaryColor : "#FFF",}}>
          <View style={{ ...toggleBtnStyles.circle, backgroundColor: selected ? '#FFF' : Colors.primaryColor }}>
            <MulishText bold fontSize={rf(2.2)} color={selected ? Colors.primaryColor : '#fff'} style={{ marginBottom: 3, textTransform: 'uppercase' }}>{code}</MulishText>
          </View>
          <MulishText bold fontSize={rf(1.8)} color={selected ? '#FFF':'#000'} style={{ textAlign: "center"}}>{ title }</MulishText>
        </View>
    </TouchableWithoutFeedback>
)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: Colors.background,
  
    },
    content: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: Colors.background,
      paddingHorizontal: wp('5%')
  
    },
    heading: {
      color: "#3D374F",
      fontSize: rf(3),
    },
    text: {
      color: "rgba(0,0,0,0.53)",
      fontSize: rf(2),
      marginVertical: hp("3%"),
      
    },
  });

  const toggleBtnStyles = StyleSheet.create({
    container: {
      width: wp('40%'),
      height: wp('40%'),
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: 14,
      marginHorizontal: 10,
      marginVertical: 10,
      elevation: 5,
      paddingVertical: 21,
      paddingHorizontal: 16
    },
    circle: {
      width: wp('15%'),
      height: wp('15%'),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: wp('20%'),
    },
  })
  
  export default ChangeLanguage;
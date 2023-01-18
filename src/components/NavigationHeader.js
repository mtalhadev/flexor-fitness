import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Touchable, TouchableWithoutFeedback } from 'react-native';
import { Header, Icon, Image } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { pop,  } from '../navigations/NavigationService';
import { useIstrainer } from '../redux/reducers/AuthReducer';
import PoppinsText from './PoppinsText';

export default function NavigationHeader({ title, backArrow, showRightMenu, rightComponent }) {
  
    const navigation = useNavigation();
    const insets= useSafeAreaInsets()

    const isTrainer = useIstrainer()

    let leftComponent = null;
    if(backArrow) 
      leftComponent = <Icon name={'arrow-back-ios'} type="material" color={"#000"} size={20} containerStyle={styles.iconBack} onPress={() => navigation?.goBack()} Component={TouchableWithoutFeedback} />
    else
      leftComponent = <Icon name={'menu'} type="feather" color={"#000"} size={22} containerStyle={styles.iconBack} onPress={() => navigation?.openDrawer()} Component={TouchableWithoutFeedback}  />

    let _rightComponent;
    if(rightComponent)
        _rightComponent = rightComponent;
    else if(showRightMenu)
      _rightComponent =  <Icon name={'dots-vertical'} type="material-community"  color={"#000"} size={22} containerStyle={styles.iconBack} Component={TouchableWithoutFeedback}  />

    return (
        <Header 
            leftComponent={leftComponent} 
            centerComponent={<PoppinsText semiBold fontSize={16} color={"#000"} style={{lineHeight: 40}}>{title}</PoppinsText>} 
            rightComponent={_rightComponent}
            leftContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 5, flex: 0.4}}
            centerContainerStyle={{ justifyContent: 'center',   }}
            rightContainerStyle={{ flex: 0.4 }}
            containerStyle={{ height: 60 + insets.top, backgroundColor: 'transparent', alignItems: 'center', borderBottomWidth: 0 }}
            statusBarProps={{ backgroundColor: '#FAFAFA', barStyle: 'dark-content' }}
        />
    )
}


const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 55,
    resizeMode: 'contain',
    marginTop: 10
  },
  iconBack: {
     width: 40, height: 40,
     backgroundColor: '#FFF',
     borderRadius: 12,
     justifyContent: 'center',
     alignItems: 'center',
     
  },
  
})

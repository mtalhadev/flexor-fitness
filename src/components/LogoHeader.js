import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Header, Image } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../assets/images';
import Colors from '../constants/Colors';

export default function LogoHeader() {
  
    const navigation = useNavigation();
    const insets= useSafeAreaInsets()

    return (
        <Header 
            leftComponent={{ icon: 'menu', color: Colors.primaryColor, onPress: () => navigation.openDrawer() }} 
            centerComponent={<Image source={images.logo_header} style={styles.logo}  />} 
            containerStyle={{ height: 60 + insets.top, backgroundColor: 'white', alignItems: 'center' }}
            statusBarProps={{ backgroundColor: '#FFF', barStyle: 'dark-content' }}
            leftContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 15}}
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
})

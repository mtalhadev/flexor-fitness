import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import NavigationHeader from '../components/NavigationHeader';
import { WebView } from 'react-native-webview';
import Colors from '../constants/Colors';
import { hp } from '../constants/Constants';
import { useRoute } from '@react-navigation/native';
import { _translate } from "../localization"

export default function PrivacyPolicy() {
  const route = useRoute();
  // const url  = route.params.url; 
    return (
          <WebView
            source={{ uri: 'https://flexor-18650.web.app/' }}
            style={{ 
              marginTop: 20,
              width: '100%',
              flex: 1,
              height: hp('100%'),
              backgroundColor: '#FAFAFA'
             }}
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator
                size="large"
                color={Colors.primaryColor}
              />
            )}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
          />
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FAFAFA',
  },
})
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { showAlert } from 'react-native-customisable-alert';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import { hp } from '../constants/Constants';
import { goBack, navigate } from '../navigations/NavigationService';
import { fetchMyProfile } from '../redux/actions/ProfileActions';
import { setPaymentSuccess } from '../redux/reducers/ClientReducer';

const CHECKOUT_COMPLETE_URL_OFFER = 'https://flexor.is/api/client/completeoffer/'; 
const CHECKOUT_COMPLETE_URL_ORDER = 'https://flexor.is/api/client/completeorder/'; 
const CHECKOUT_FAILED_URL = 'https://flexor.is/failed'; 

export default function CheckoutScreen() {
  const dispatch = useDispatch();
  const route = useRoute();
  const url  = route.params.url; 
    return (
          <WebView
            source={{ uri: url || 'https://flexor-18650.web.app/' }}
            style={{ 
              marginTop: 20,
              width: '100%',
              flex: 1,
              height: hp('100%'),
              backgroundColor: '#FAFAFA',
              justifyContent: "center",
              alignItems: "center"
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
            onNavigationStateChange={(navState) => {
              const url = navState.url;
              console.log('navState.url: ', url);
              if(url.includes(CHECKOUT_COMPLETE_URL_OFFER) || url.includes(CHECKOUT_COMPLETE_URL_ORDER)){
                dispatch(setPaymentSuccess(true));
                dispatch(fetchMyProfile());
                showAlert({
                    title: 'SUCCESS',
                    message: "You are successfully subscribed.",
                    alertType: "success",
                    onPress: () => goBack()
                  })
              } else if(url.includes(CHECKOUT_FAILED_URL)){
                dispatch(setPaymentSuccess(false));
                showAlert({
                  title: "Error",
                  message: 'Subscription failed. Please try again.',
                  alertType: "error",
                  onPress: () => goBack()
                });        
             }
            }}          
          />
    )
}

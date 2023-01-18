import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Button,
  LogBox,
  BackHandler,
  Alert,
  UIManager,
  Image,
} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {ErrorBoundary} from 'react-error-boundary';
import {enableScreens} from 'react-native-screens';
import Navigation from './src/navigations';
import { Provider } from 'react-redux';
import store from "./src/redux/store";
import AppTheme from './src/constants/AppTheme';
import CustomisableAlert from 'react-native-customisable-alert';
import CrashReporting from './src/services/CrashReporting';
import {GoogleSignin,statusCodes} from '@react-native-google-signin/google-signin';
import Colors from './src/constants/Colors';

// import * as Sentry from '@sentry/react-native';

// Sentry.init({ 
//   dsn: 'https://5feb208e24c6444dbaa1187f70e49923@o400724.ingest.sentry.io/6105026', 
// });


if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

enableScreens();

export default function App() {

  GoogleSignin.configure({
        
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: "657622851504-iafli61uufdfo1bugcbmhhjckpguhv02.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    // iosClientId: "709115598624-bpb4507sd4a8naierhva7nmn39375jqp.apps.googleusercontent.com", // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  });

  return (
    <ThemeProvider theme={AppTheme}>
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar barStyle="default" translucent backgroundColor={'transparent'} />
          <ErrorBoundary
            FallbackComponent={ErrorFallbackScreen}
            onReset={() => {
              BackHandler.exitApp();
            }}>
            <Navigation />
          </ErrorBoundary>
          <CustomisableAlert
              titleStyle={{
                  fontSize: 18,
                  fontFamily: "Mulish-SemiBold",
                  color:'#000'
              }}
              btnStyle={{
                style: { backgroundColor: '#FFF', borderRadius: 10, borderColor: '#999', borderWidth: 1 },
              }}
              btnRightStyle={{ 
                style: { backgroundColor: '#FFF', borderRadius: 10, borderColor: '#999', borderWidth: 1 },
              }}
              btnLabelStyle={{ color: '#666', }}  
          />
        </View>
      </Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});

function ErrorFallbackScreen({error, resetErrorBoundary}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgb(244, 244, 244)" }}>
      <Image source={require('./src/assets/images/error-screen.jpeg')} style={{ width: '100%', height: 200, resizeMode: 'contain'}}/>
      <Text
        style={{color: Colors.text, fontSize: 22, fontFamily: 'Poppins-Bold', marginTop: 100, textAlign: 'center' }}>
          Something went wrong
      </Text>
      <Text
        style={{color: '#666', fontSize: 15, fontFamily: 'Poppins-Regular', marginTop: 10, width: '80%',textAlign: 'center', marginBottom: 16 }}>
          We could not process your request, our server just acted up!
      </Text>
      <Button
        onPress={() => resetErrorBoundary()}
        title=" EXIT APP"
        style={{ width: 150, height: 40, }}
      />
      {
        __DEV__ &&
        <>
          <Text style={{color: '#000', fontWeight: 'bold', margin: 5, marginTop: 20 }}>
            Error details:{' '}
          </Text>
          <Text style={{color: '#666'}}>{error.message}</Text>
        </>
      }
    </View>
  );
}

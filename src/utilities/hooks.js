import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  AppState,
  BackHandler,
  Keyboard,
  Linking,
  Platform,
  ToastAndroid,
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import VersionCheck from "react-native-version-check";
import { useDispatch } from "react-redux";
import {
  AUTH_TOKEN,
  IS_TRAINER,
  LANGUAGE,
  USER_DATA,
} from "../constants/Constants";
import { currentLocale, setI18nConfig } from "../localization";
import { navigate } from "../navigations/NavigationService";
import { signOut } from "../redux/actions/AuthActions";
import { setAuthData, setLanguage } from "../redux/reducers/AuthReducer";
import { setProfile } from "../redux/reducers/ProfileReducer";
import ApiService from "../services/ApiService";
import LocalStorage from "../services/LocalStorage";

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export function useToken() {
  const [Token, setToken] = useState(null);
  const [checking, setChecking] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let token = await LocalStorage.getData(AUTH_TOKEN);
      const isTrainer = await LocalStorage.getData(IS_TRAINER);
      let user = await LocalStorage.getData(USER_DATA);
      if (token && user && isTrainer != null) {
        const userId = user?._id;
        ApiService.setAuthHeader(token);
        let res = isTrainer
          ? await ApiService.trainer.getProfile(userId)
          : await ApiService.client.getProfile(userId);
        console.log("res.data: ", res.data);
        if (res.data.message === "Token is not valid") {
          token = null;
          dispatch(signOut());
          dispatch(setAuthData({ isTrainer, authToken: token, user: null }));
          dispatch(setProfile({}));
          navigate("Signin");
        } else if (res.data && res.data.success) {
          user = res.data.user;
        }
      }
      setToken(token);
      if (token && user) {
        dispatch(setAuthData({ isTrainer, authToken: token, user }));
        dispatch(setProfile(user));
      }
      if (token) {
        ApiService.setAuthHeader(token);
      }
      const language = await LocalStorage.getData(LANGUAGE);
      const currentLanguage = currentLocale();
      console.log("currentLanguage: ", currentLanguage);
      console.log("language: ", language);
      await setI18nConfig(language);
      dispatch(setLanguage(language));
      await new Promise((resolve) => {
        setTimeout(() => {
          setChecking(false);
          SplashScreen.hide();
          resolve();
        }, 3000);
      });
    })();
  }, []);
  return { Token, checking };
}

export const useDispatchEffect = (thunk, params, condition) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (condition) dispatch(thunk(params));
  }, [condition]);

  const onRefresh = () => {
    dispatch(thunk(params));
  };
  return onRefresh;
};

export const useVersionCheck = () => {
  useEffect(() => {
    checkVersion();
  }, []);
  const checkVersion = async () => {
    const current = VersionCheck.getCurrentVersion();
    console.log("current: ", current);
    try {
      const res = await fetch("https://flexor.is/api/client/validateversion", {
        method: "POST",
        body: { platform: Platform.OS, version: current },
      });
      const result = await res.json();
      console.log("result: ", result);
      const forceUpdate = result.success && result.forceUpdate;
      const updateNeeded = await VersionCheck.needUpdate({ forceUpdate });
      console.log("updateNeeded: ", updateNeeded);

      if (forceUpdate && updateNeeded?.isNeeded) {
        Alert.alert(
          "Please Update",
          "You will have to update this app to the latest version for best performance.",
          [
            {
              text: "Update",
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(
                  updateNeeded?.storeUrl ||
                    "https://play.google.com/store/apps/details?id=com.getweys.flexor"
                );
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log("Check Version error: ", error);
    }
  };
};

// export const useFacebookSignin = (FB_APP_ID) => {
//   const [fbSignin, setFbSignin] = useState(false);
//   const signInWithFacebookAsync = async () => {
//     setFbSignin(true);
//     try {
//       await Facebook.initializeAsync(FB_APP_ID);
//       const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync({
//         permissions: ['public_profile', 'email'],
//       });
//       setFbSignin(false);
//       let fbResult = {
//         type, token, expires
//       };

//       if (type === 'success') {
//         // Get the user's name using Facebook's Graph API
//         let response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`);
//         let result = await response.json();
//         console.log('Facebook login response   ', result);
//         fbResult = {
//           ...fbResult,
//           user: {
//             uuid: result.id,
//             name: result.name,
//             email: result.email,
//             picture: result.picture.data.url,
//           }
//         }
//       } else {
//         alert(`Facebook Login Failed.`);
//         // type === 'cancel'
//       }
//       return { result: fbResult, error: null};
//     } catch (e) {
//       console.log(`Facebook Login Error: ${e.message}`);
//       return {result: null, error: e};
//     }
//   }
//   return { fbSignin, signInWithFacebookAsync};
// }

// export const useGoogleSignin = () => {
//   const [googleSignin, setGoogleSignin] = useState(false);
//   useEffect(() => {
//     GoogleSignIn.initAsync();
//   }, []);
//   const signInWithGoogleAsync = async () => {
//     try {
//       setGoogleSignin(true);
//       await GoogleSignIn.askForPlayServicesAsync();
//       const { type, user } = await GoogleSignIn.signInAsync();
//       setGoogleSignin(false);
//       console.log('onGoogleSignin: ', user);

//       let googleResult = {
//         idToken: user.auth.idToken,
//         token: user.auth.accessToken,
//         expires: user.auth.idTokenExpirationDate,
//         type
//       };
//       if (type === 'success') {
//         googleResult = {
//           ...googleResult,
//           user: {
//             uuid: user.uid,
//             name: user.displayName,
//             email: user.email,
//             picture: user.photoURL,
//           }
//         }
//         return {result: googleResult, error: null};
//       }
//     } catch (e) {
//       console.log('Google login error: ', e);
//       return {result: null, error: e};
//     }
//   };
//   return { googleSignin, signInWithGoogleAsync};
// }
export function useBackHandler(handler) {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handler);
    return () => BackHandler.removeEventListener("hardwareBackPress", handler);
  }, [handler]);
}

export function useDoubleTapExit() {
  let backPressed = 0;
  const handleBackButton = () => {
    if (backPressed > 0) {
      BackHandler.exitApp();
      backPressed = 0;
    } else {
      backPressed++;
      ToastAndroid.show("One more tap to exit", ToastAndroid.SHORT);
      setTimeout(() => {
        backPressed = 0;
      }, 2000);
      return true;
    }
  };
  useEffect(() => {
    const unsubscribe = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );
    return () => {
      unsubscribe.remove();
    };
  }, [handleBackButton]);
}

export function useAppState() {
  const currentState = AppState.currentState;
  const [appState, setAppState] = useState(currentState);
  const onChange = (newState) => {
    setAppState(newState);
  };
  useEffect(() => {
    AppState.addEventListener("change", onChange);
    return () => {
      AppState.removeEventListener("change", onChange);
    };
  }, []);
  return appState;
}

export function useLayout() {
  const [layout, setLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const onLayout = useCallback((e) => setLayout(e.nativeEvent.layout), []);

  return {
    onLayout,
    ...layout,
  };
}

export function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

// export const useCurrentLocation = (loc=null) => {
//   const [location, setLocation] = useState(loc);
//   useEffect(() => {
//     checkForLocationPermission
//     UserLocation.fetch((location) => setLocation(location))
//   }, []);
//   return location;
// }

// export const useFetchContacts = () => {
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     checkContactsPermission(() => {
//       setLoading(true);
//       Contacts.getAllWithoutPhotos().then(contacts => {
//         setLoading(false)
//         setContacts(
//           contacts.map(contact => ({
//             name: `${contact.givenName} ${contact.familyName}`,
//             phoneNumbers: contact.phoneNumbers
//           }))
//         );
//       });
//     });
//   }, []);

//   return { contacts, loading };
// }

export const useKeyboard = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const subscribeDidShow = Keyboard.addListener(
      "keyboardDidShow",
      _keyboardDidShow
    );
    const subscribeDidHide = Keyboard.addListener(
      "keyboardDidHide",
      _keyboardDidHide
    );
    return () => {
      Keyboard.removeSubscription(subscribeDidShow);
      Keyboard.removeSubscription(subscribeDidHide);
    };
  }, []);
  const _keyboardDidShow = () => {
    setKeyboardVisible(true);
  };
  const _keyboardDidHide = () => {
    setKeyboardVisible(false);
  };

  return isKeyboardVisible;
};

// export const useFetchContacts = (contactsQuery) => {
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Contacts.requestPermissionsAsync();
//       if (status === 'granted') {
//         setLoading(true);
//         const { data } = await Contacts.getContactsAsync(contactsQuery);
//         setLoading(false);
//         if (data.length > 0) {
//           console.log(data);
//           setContacts(data)
//         }
//       }
//     })();
//   }, []);

//   return { loading, contacts };
// }

// import { CONNECTION_URL } from '../constants/Constants';
// import { checkContactsPermission, checkForLocationPermission, checkSMSPermission } from './AppPermissions';

// export const useSocketIO = (userInfo, callback) => {
//   const socket = useRef();

//   useEffect(() => {
//     let connectionUrl = CONNECTION_URL(userInfo.myNumber);
//     console.log('connectionUrl: ',connectionUrl);
//     socket.current = socketIO(connectionUrl, {
//       transports: ['websocket'],
//       query: userInfo,
//       forceNew: false,
//       agent: false,
//       rejectUnauthorized: false,
//       perMessageDeflate: true,
//     });
//     if(!socket.current.connected)
//       socket.current.connect();
//     socket.current.on('connect', () => {
//       console.log('******** connected to socket server ************');
//       socket.current.on('connect_error', (error) => {
//         console.log('connect_error: ', error);
//       });
//       callback && callback();
//     });
//     return () => { socket.current.off('connect') }
//   }, []);

//   return socket;
// }
//   function xwwwfurlenc(srcjson){
//     if(typeof srcjson !== "object")
//       if(typeof console !== "undefined"){
//         console.log("\"srcjson\" is not a JSON object");
//         return null;
//       }
//     let u = encodeURIComponent;
//     let urljson = "";
//     let keys = Object.keys(srcjson);
//     for(let i=0; i <keys.length; i++){
//       if(srcjson[keys[i]].length) {
//         urljson += `${u(keys[i])}=${u(srcjson[keys[i]])}`;
//         if(i < (keys.length-1)) urljson += "&";
//       }
//     }
//     return urljson;
// }

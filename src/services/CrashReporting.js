import crashlytics from '@react-native-firebase/crashlytics';

export default {
    log: (text) => { console.log(text); crashlytics().log(text) },
    recordError: (text, e) => { 
        console.log(text,e.message); 
        crashlytics().log(text);
        crashlytics().recordError(e) 
    },
    crashNow: () => {crashlytics().crash()}
}
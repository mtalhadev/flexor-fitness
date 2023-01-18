
import { ToastAndroid,Platform } from 'react-native';

const RNToast = {
    showShort: (text) => { Platform.OS==='android' && ToastAndroid.showWithGravityAndOffset(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 100 ) },
    showLong: (text) => { Platform.OS==='android' && ToastAndroid.showWithGravityAndOffset(text, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 100 ) },
}

export default RNToast;
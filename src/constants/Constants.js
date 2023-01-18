import {Dimensions} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const wp = widthPercentageToDP;  
export const hp = heightPercentageToDP;  
export const rf = RFPercentage;

export const PUSH_TOKEN = '@push-token';  
export const AUTH_TOKEN = '@x-auth-token';  
export const USER_DATA = '@userdata';  
export const IS_TRAINER = '@isTrainer';  
export const MEMBERSHIP = '@membership';  
export const LANGUAGE = '@language';  

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const LARGE_FONT_SIZE = 'large';
export const MEDIUM_FONT_SIZE = 'medium';
export const SMALL_FONT_SIZE = 'small';

export const WEEDAYNAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
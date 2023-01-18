import React from 'react';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import { rf } from '../constants/Constants';

const PrimaryButton = ({ title, containerStyle, buttonStyle, titleStyle,  onPress, loading, iconRight, icon, disabled }) => (
        <Button
            title={title}
            type='solid'
            onPress={onPress}
            loading={loading}
            iconRight={iconRight}
            icon={icon}
            titleStyle={{ color: Colors.secondaryColor, fontSize: rf(2.5), fontFamily: 'Mulish-ExtraBold', ...titleStyle }}
            buttonStyle={{ backgroundColor: Colors.primaryColor, borderRadius: 16, ...buttonStyle }}
            containerStyle={{ width: buttonStyle.width, ...containerStyle }}
            disabled={disabled}
            />  

    )

export default PrimaryButton;
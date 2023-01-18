import React from 'react';
import { Button } from 'react-native-elements';

const SecondaryButton = ({ title, containerStyle, buttonStyle, titleStyle,  onPress, loading, iconRight, icon, component, disabled }) => (
        <Button
        title={title}
        type='outline'
        onPress={onPress}
        loading={loading}
        iconRight={iconRight}
        icon={icon}
        titleStyle={{ color: '#151F33', fontSize: 16, fontFamily: 'Mulish-ExtraBold', ...titleStyle }}
        buttonStyle={{ borderColor: 'rgba(21,31,51,0.4)', borderRadius: 16, borderWidth: 1.5, ...buttonStyle }}
        containerStyle={{ width: buttonStyle.width, borderRadius: buttonStyle.borderRadius, ...containerStyle }}
        TouchableComponent={component}
        disabled={disabled}
        />  
    )

export default SecondaryButton;
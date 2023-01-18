import React from 'react';
import { Text } from 'react-native';
import Colors from '../constants/Colors';

const RobotoText = (props) => {
  
    const { style, children, bold, semiBold, fontSize, color, ...textProps } = props; 

    let fontName = 'Roboto-Regular';
    
    return (
            <Text style = {
                {
                    fontFamily: fontName,
                    color: color || Colors.primaryColor,
                    fontSize,
                    ...style
                }
            } {...textProps}>
                {children}
            </Text>
    )
}

export default RobotoText;
import React from 'react';
import { Text } from 'react-native';
import Colors from '../constants/Colors';

const SFProText = (props) => {
  
    const { style, children, bold, semiBold, fontSize, color } = props; 

    let fontName = 'SF-Pro-Text-Regular';
    if(bold) fontName = 'SF-Pro-Text-Bold';
    if(semiBold) fontName = 'SF-Pro-Text-Semibold';
    
    return (
            <Text style = {
                {
                    fontFamily: fontName,
                    color: color || Colors.primaryColor,
                    fontSize,
                    ...style
                }
            }
            numberOfLines={1}
            >
                {children}
            </Text>
    )
}

export default SFProText;
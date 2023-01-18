import React from 'react';
import { Text } from 'react-native';
import Colors from '../constants/Colors';

const MulishText = (props) => {
  
    const { style, children, bold, extraBold, medium, semiBold, fontSize, color, numberOfLines, marginBottom } = props; 

    let fontName = 'Mulish-Regular';
    if(bold) fontName = 'Mulish-Bold';
    if(semiBold) fontName = 'Mulish-SemiBold';
    if(extraBold) fontName = 'Mulish-ExtraBold';
    if(medium) fontName = 'Mulish-Medium';
    
    return (
            <Text style = {
                {
                    fontFamily: fontName,
                    color: color || Colors.primaryColor,
                    fontSize,
                    marginBottom: marginBottom,
                    
                    ...style
                }
            }
            numberOfLines={numberOfLines || 0}>
                {children}
            </Text>
    )
}

export default MulishText;
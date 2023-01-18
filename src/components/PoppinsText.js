import React from 'react';
import { Text } from 'react-native';
import Colors from '../constants/Colors';

const PoppinsText = (props) => {
  
    const { style, children, bold, semiBold, fontSize, color, textProps={} } = props; 

    let fontName = 'Poppins-Regular';
    if(bold) fontName = 'Poppins-Bold';
    if(semiBold) fontName = 'Poppins-SemiBold';
    
    return (
            <Text style = {
                {
                    fontFamily: fontName,
                    color: color || Colors.primaryColor,
                    fontSize,
                    flexWrap: 'wrap',
                    ...style
                }
            }
            {...textProps}>
                {children}
            </Text>
    )
}

export default PoppinsText;
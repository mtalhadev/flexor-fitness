
import React, { useEffect, useState } from 'react';
import {
    Animated,
    Platform, StyleSheet, Text
} from 'react-native';
import {
CodeField,
Cursor,
useBlurOnFulfill,
useClearByFocusCell
} from 'react-native-confirmation-code-field';
import Colors from '../constants/Colors';
import { WIDTH, wp } from '../constants/Constants';
import { _translate } from "../localization"

const CELL_SIZE = 60;
const CELL_BORDER_RADIUS = 10;
const DEFAULT_CELL_BG_COLOR = Colors.background;
const NOT_EMPTY_CELL_BG_COLOR = Colors.primaryColor;
const ACTIVE_CELL_BG_COLOR = Colors.background;
const DEFAULT_TEXT_COLOR = '#2B2C43';
const NOT_EMPTY_TEXT_COLOR = Colors.primaryColor;
const ACTIVE_TEXT_COLOR = Colors.primaryColor;

const {Value, Text: AnimatedText} = Animated;

const CELL_COUNT = 4;
// const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
// const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
// const animateCell = ({hasValue, index, isFocused}) => {
//   Animated.parallel([
//     Animated.timing(animationsColor[index], {
//       useNativeDriver: false,
//       toValue: isFocused ? 1 : 0,
//       duration: 250,
//     }),
//     Animated.spring(animationsScale[index], {
//       useNativeDriver: false,
//       toValue: hasValue ? 0 : 1,
//       duration: hasValue ? 300 : 250,
//     }),
//   ]).start();
// };

export default function CodeInput({ onCodeSubmit }) {
  
    const [value, setValue] = useState('');

    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
      });
      
    const renderCell = ({index, symbol, isFocused}) => {
      const hasValue = Boolean(symbol);
      const animatedCellStyle = {
    //     backgroundColor: hasValue
    //       ? animationsScale[index].interpolate({
    //           inputRange: [0, 1],
    //           outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
    //         })
    //       : animationsColor[index].interpolate({
    //           inputRange: [0, 1],
    //           outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
    //         }),
    //     color: hasValue
    //         ? animationsScale[index].interpolate({
    //             inputRange: [0, 1],
    //             outputRange: [NOT_EMPTY_TEXT_COLOR, ACTIVE_TEXT_COLOR],
    //           })
    //         : animationsColor[index].interpolate({
    //             inputRange: [0, 1],
    //             outputRange: [DEFAULT_TEXT_COLOR, ACTIVE_TEXT_COLOR],
    //           }),
    //     borderRadius: animationsScale[index].interpolate({
    //       inputRange: [0, 1],
    //       outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
    //     }),
    //     transform: [
    //       {
    //         scale: animationsScale[index].interpolate({
    //           inputRange: [0, 1],
    //           outputRange: [0.5, 1],
    //         }),
    //       },
    //     ],
      };
      // Run animation on next event loop tik
      // Because we need first return new style prop and then animate this value
    //   setTimeout(() => {
    //     animateCell({hasValue, index, isFocused});
    //   }, 0);
      return (
        <Text
          key={index}
          style={[styles.cell, animatedCellStyle]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      );
    };
  
    const _onCodeSubmit = (text) => {
      console.log('text: ', text)
      setValue(text)
      if(text.length == CELL_COUNT) 
        onCodeSubmit(text)
    }
    
    return (
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={_onCodeSubmit}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          renderCell={renderCell}
          
          // onFocus={() => { getClipboard() }}
        />
    )
}
const styles = StyleSheet.create({
    codeFiledRoot: {
        width: wp('80%'),
        height: CELL_SIZE + 2,
        marginTop: 10,
        marginBottom: 20,
        justifyContent: 'space-around',
        shadowColor: 'rgba(0, 0, 0, 0.01)',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 2,
      },
      cell: {
        marginHorizontal: 0,
        height: CELL_SIZE,
        width: CELL_SIZE,
        lineHeight: CELL_SIZE - 5,
        ...Platform.select({web: {lineHeight: 65}}),
        fontSize: 25,
        textAlign: 'center',
        borderRadius: CELL_BORDER_RADIUS,
        borderColor: 'rgba(43,44,67,.2)',
        borderWidth: 2,
        color: '#2B2C43',
        backgroundColor: 'transparent',
      },
    })
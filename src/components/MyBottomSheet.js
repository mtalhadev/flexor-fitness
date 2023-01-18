import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomSheet } from 'react-native-elements';
import { wp } from '../constants/Constants';

export default function MyBottomSheet({ isVisible, style, children }) {
  
    return (
        <BottomSheet
        isVisible={isVisible}
        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.6)' }}
        modalProps={{ animationType: 'fade',  }}
    >
        <View style={{ ...styles.bottomSheet, ...style }}>
            {children}
        </View>
    </BottomSheet>
)
}
const styles = StyleSheet.create({
    bottomSheet: {
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        alignItems: 'center',
        borderTopLeftRadius: wp('1%'),
        borderTopRightRadius: wp('1%'),
        paddingBottom: 16
      },
      handle: {
        width: wp('15%'),
        height: 5,
        backgroundColor: '#AFAFAF',
        borderRadius: 5,
        margin: 10
      },
    })
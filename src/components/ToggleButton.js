import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Colors from '../constants/Colors';
import { rf } from '../constants/Constants';
import MulishText from './MulishText';

const ToggleButton = ({ _id: id, title, price,  onSelect, selected  }) => (
    <TouchableWithoutFeedback onPress={() => { onSelect(id) }}>
        <View style={{ ...styles.container, backgroundColor: selected ? Colors.primaryColor : "#FFF",}}>
          <MulishText bold fontSize={rf(1.8)} color={selected ? '#FFF':'#000'} style={{ textAlign: "center"}}>{ title }</MulishText>
          <View style={{ ...styles.circle, backgroundColor: selected ? '#FFF' : Colors.primaryColor }}>
          <MulishText bold fontSize={rf(1.8)} color={selected ? Colors.primaryColor : '#fff'} style={{ marginBottom: 3,}}>{`$${ price }`}</MulishText>
          </View>
        </View>
    </TouchableWithoutFeedback>
)
const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 148,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 14,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 5,
    paddingVertical: 21,
    paddingHorizontal: 16
  },
  circle: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
  },
  text: {
      textAlign: 'center',
  }
})

export default ToggleButton;
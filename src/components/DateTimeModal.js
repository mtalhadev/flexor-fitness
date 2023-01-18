import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { hp, wp } from '../constants/Constants';
import { _translate } from "../localization"

export default function DateTimeModal({ isModalVisible, closeModal, mode, onChange, date = new Date() }) {
  
    if(isModalVisible)
    return (
        
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={false}
            display='spinner'
            
            onChange={(e, date) => {  onChange(date) }}
          />
    )
    else return null
}
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  },
})
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CommonStyles from '../constants/CommonStyles';
import StyledInput from './StyledInput';
import { _translate } from "../localization"

export default function EmailInput({ 
    placeholder,
    value,
    onChangeText,
    onEndEditing,
    reset
}) {
  
    const [error, setError] = useState('');

    const _onEndEditing = useCallback(
        (text) => {
            onEndEditing && onEndEditing(text)
        },
        [],
    );

    return (
        <StyledInput
            containerStyle={CommonStyles.input}
            placeholder={placeholder}
            keyboardType='email-address'
            returnKeyType='next'
            onSubmitEditing={() => { }}     
            autoCompleteType='on'      
            value={value}
            onChangeText={onChangeText}
            errorMessage={error} 
            errorStyle={{ fontSize: 12, textAlign: 'right' }}
            onFocus={() => { setError('') }}
            onEndEditing={_onEndEditing}
            />
)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
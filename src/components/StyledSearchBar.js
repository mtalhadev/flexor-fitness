import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { wp } from '../constants/Constants';

export default function StyledSearchBar(props) {
  
    const [value, setValue] = useState('');
    const _onChangeText = (text) => {
        setValue(text); 
        props.onChangeText && props.onChangeText(text)
    }
    
    return (
        <SearchBar
        placeholder={props.placeholder}
        placeholderTextColor="#00000036"
        onChangeText={_onChangeText}
        value={value}
        showCancel={true}
        searchIcon={{ name: "search", size: 18, type:"feather",color:'#00000036' }}
        containerStyle={{ width: wp('100%'), height: 52, backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: "transparent", paddingHorizontal: 20, justifyContent: 'center',  ...props.containerStyle }}
        inputContainerStyle={{ height: 50, backgroundColor: "#FFF", borderRadius: 12, borderColor: "#00000036", borderWidth: 1, borderBottomColor: "#00000036", borderBottomWidth: 1 }}
        inputStyle={{ fontSize: 14, color: '#000', fontFamily: 'Mulish-Bold' }}
        onFocus={props.onFocus}
        disabled={props.disabled}
        onPressOut={props.onPress}
        autoFocus={props.autoFocus}
        onCancel={props.onCancel}
        onClear={props.onClear}
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
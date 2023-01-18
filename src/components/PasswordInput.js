import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import CommonStyles from '../constants/CommonStyles';
import Icon from '../constants/Icon';
import StyledInput from './StyledInput';

const  PasswordInput = React.forwardRef((props, ref) => {
    const [showPassowrd, setShowPassowrd] = useState(false);

    const [Focused, setFocus] = useState(false);
    const [text, setText] = useState(props.value);
    // console.log('MyInput ',props.placeholder, ' re-rendered');
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        if(props.reset) setText('')
    }, [props.reset]);

    if(props.value !== text && !touched) {
        setText(props.value); setTouched(true);
    }
    if(props.clearTextOnFocus && Focused && text.length)
        setText('')
        // const handleInput = (e) => { 
    //    console.log(e.nativeEvent.key);
    // }

    const updateText = (text) => {
            console.log(text)
            setText(text); 
            props.onChangeText && props.onChangeText(text);
        }
        
    const _onEndEditting = (event) => {
        props.onEndEditing && props.onEndEditing(event.nativeEvent.text);
    }

    return (
        <Input
            ref={ref}
            containerStyle={{ ...CommonStyles.input, ...props.containerStyle}}
            inputContainerStyle={[styles.inputContainer, Focused ? { ...props.inputContainerStyle, ...props.focusedStyle } : props.inputContainerStyle]}
            inputStyle={[styles.inputText, props.inputStyle]}
            placeholder={props.placeholder}
            keyboardType='default'
            returnKeyType='next'
            onChangeText={updateText}
            value={text}
            //onKeyPress={handleInput}
            errorMessage={!Focused ? props.errorMessage : ''} 
            errorStyle={props.errorStyle}
            placeholderTextColor={props.placeholderTextColor || 'rgba(0,0,0,0.55)'}
            onSubmitEditing={props.onSubmitEditing}     
            autoCompleteType='off'
            secureTextEntry={!showPassowrd}    
            rightIcon={<ToggleEye onToggle={() => {setShowPassowrd(!showPassowrd)}} />}
            onEndEditing={_onEndEditting}
            />
)
});

const ToggleEye = ({ onToggle }) => { 
    const [open, setOpen] = useState(false);
    if(open) return <Icon.Ionicon name='eye-outline' onPress={() => { setOpen(false); onToggle() }} size={18} style={{ margin: 10}} />
    else return <Icon.Ionicon name='eye-off-outline' onPress={() => { setOpen(true); onToggle() }} size={18} style={{ margin: 10}}  />
  }
  
const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'rgba(240,242,246,0.76)',
        height: 56,
        borderRadius: 10,
        paddingLeft: 18,
        borderBottomWidth: 0
        
    },
    inputText: {
        fontFamily: 'Mulish-Regular',
        color: '#000',
        fontSize: 14
    }
});
  export default PasswordInput
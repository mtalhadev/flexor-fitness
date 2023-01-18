import React, { useState, useEffect, Children } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableOpacity,
    Easing,
    Alert,
  } from 'react-native';
import { Icon } from 'react-native-elements';
  import Swipeable from 'react-native-gesture-handler/Swipeable';
import Colors from '../constants/Colors';
  

export default function SwipableListItem({ handleDelete, children, containerStyle, }) {
  
  const onDelete = () => {
    Alert.alert('Confirm Delete', 'Are you sure?',
    [
      { text: 'NO', onPress: () => {}, style: 'cancel' },
      { text: 'YES', onPress: handleDelete, style: 'default' },
    ], {
      cancelable: false
    })
  }
  
  const swipeLeft  = (progress, dragX) => {
    const scale = dragX.interpolate({
        inputRange:[0, 100],
        outputRange:[0, 1],
        extrapolate:'clamp'
      })
      const borderTopLeftRadius = containerStyle.borderRadius || 12; 
      const borderBottomLeftRadius = containerStyle.borderRadius || 12; 
      return (
        <TouchableOpacity onPress={onDelete}>
        <View style={{backgroundColor:'#EDEDF7',width:containerStyle?.height, height: containerStyle?.height || 100, justifyContent:'center', alignItems: 'flex-start', borderTopLeftRadius, borderBottomLeftRadius}}>
            <Animated.View style={{ width: containerStyle?.height, height: 30, transform:[{scale}]}}>
               <Icon name={'ios-trash-sharp'} type='ionicon' color={Colors.primaryColor} size={containerStyle?.height/3} />
            </Animated.View>
        </View>
        </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderLeftActions={swipeLeft} leftThreshold={90}>
      <Animated.View style={{ ...containerStyle, }} >
      {children}
      </Animated.View>
    </Swipeable>
  );
}
    

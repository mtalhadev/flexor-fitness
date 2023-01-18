import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import { _translate } from "../localization"

export default function BadgedAvatar({ source }) {
  
    return (
        <View>
        <Avatar
          rounded
          source={source}
          size={60}
        />
        <Badge
          status="success"
          badgeStyle={{ width: 14, height: 14, borderRadius: 14}}
          containerStyle={{ position: 'absolute', bottom: 3, right: 3 }}
        />
      </View>
      
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
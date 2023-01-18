/* eslint-disable react-native/no-raw-text */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { wp } from '../constants/Constants';
import { Avatar, Icon, Image, ListItem } from 'react-native-elements';
import MulishText from './MulishText';
import SFProText from './SFProText';
import Colors from '../constants/Colors';


export default function ExerciseCard({ _id, image, title, selected, onSelect }) {
  
    return (
          <View style={styles.container}>
            <ListItem containerStyle={{ backgroundColor: 'transparent', padding: 0, width: '100%'}}>
            <Avatar source={{ uri: image }} size={80} avatarStyle={{ width: 80, height: 80, borderRadius: 14 }} />
            <ListItem.Content>
                <ListItem.Title>
                    <MulishText semiBold fontSize={14} color={'#1E2022'}>{title}</MulishText>
                </ListItem.Title>
            </ListItem.Content>
             <Icon 
              name={selected ? 'minus' : 'plus'} 
              type='feather' 
              color={Colors.primaryColor} 
              size={12}  
              reverse 
              reverseColor="#FFF" 
              containerStyle={{  borderRadius: 5 }} 
              onPress={() => onSelect(_id)}
              Component={Pressable}/>
            </ListItem>

          </View>
    )
}


const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    height: 100,
    alignItems: "flex-start",
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    borderColor: '#EAEAEA',
    borderWidth: 1
  },
})
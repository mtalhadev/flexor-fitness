/* eslint-disable react-native/no-raw-text */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { rf, wp } from '../constants/Constants';
import { Avatar, Chip, ListItem } from 'react-native-elements';
import MulishText from './MulishText';
import SFProText from './SFProText';
import Colors from '../constants/Colors';

export default function WorkoutCard({ _id, image, title, highlight, duration, onPress }) {
  
    return (
          <View style={styles.container}>
            <ListItem containerStyle={{ backgroundColor: 'transparent', padding: 0, width: '100%'}} onPress={() => onPress(_id)} Component={TouchableOpacity}>
            <Avatar source={{ uri: image }} size={80} avatarStyle={{ width: 80, height: 80, borderRadius: 14 }} />
            <ListItem.Content>
                <ListItem.Title>
                    <MulishText semiBold fontSize={15} color={'#1E2022'}>{title}</MulishText>
                </ListItem.Title>
                <ListItem.Subtitle>
                    <View style={{ height: 50, justifyContent: "space-between"}}>
                       <SFProText color="#77838F" fontSize={12}>{highlight}</SFProText>
                       <Chip
                          title={`${duration.value} ${duration.typeDuration}`}
                          titleStyle={{ color: '#FFF', fontSize: rf(1.2), fontFamily: 'Poppins-Regular', lineHeight: rf(1.3) }}
                          buttonStyle={styles.chip}
                          containerStyle={{ height: 30 }}
                        />
                    </View>
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron iconProps={{ color: '#77838F', size: 30,  }} />
            </ListItem>
          </View>
    )
}


const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: 100,
    alignItems: "flex-start",
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    marginVertical: 6,
    marginHorizontal: 10,
    borderColor: '#EAEAEA',
    borderWidth: 1,
    elevation: 2
  },
  chip: {
    backgroundColor: Colors.primaryColor,
    width: wp('22%'),
    height: rf(1.3)+16,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    paddingTop: 3,
    marginTop: 1,
    marginBottom: 8
  },
})
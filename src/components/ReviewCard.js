/* eslint-disable react-native/no-raw-text */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, ListItem, Rating } from 'react-native-elements';
import { rf, WIDTH, wp } from '../constants/Constants';
import MulishText from './MulishText';
import SFProText from './SFProText';
import Colors from '../constants/Colors';
import Icon from '../constants/Icon';
import { navigate } from '../navigations/NavigationService';
import moment from 'moment';
import { timeInWords } from '../utilities/utils';

export default function ReviewCard({ rating, message, createdBy: client, createdAt, trainerId: trainer }) {
  
    return (
          <View style={styles.container}>
            
            <ListItem containerStyle={{ backgroundColor: 'transparent', padding: 0, width: '100%', height: 50 }}>
              <Avatar source={{ uri: client.image }} size={50} rounded />
              <ListItem.Content>
                  <ListItem.Title>
                      <MulishText bold fontSize={16} color={'#1E2022'}>{client.name}</MulishText>
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <MulishText semiBold fontSize={13} color={'#1E2022'}>
                      <Stars ratings={rating} size={20}/> {" "}{rating?.toFixed(1)}
                    </MulishText>
                  </ListItem.Subtitle>
              </ListItem.Content>
              <MulishText fontSize={13} color="#77838F">{timeInWords(new Date(createdAt))}</MulishText>
            </ListItem>

            <MulishText semiBold fontSize={15} color="#77838F" style={{ marginHorizontal: 10, marginTop: 16 }}>
              {message}
            </MulishText>

          </View>
    )
}

const Stars = ({ ratings=0, total=5, size }) => { 
  const stars = new Array(Math.round(ratings)).fill('★'); 
  const remianing = new Array(total - Math.round(ratings)).fill('☆');
  return <MulishText color={'#F2BF07'} fontSize={size}>
    {stars.map(star => star)}{remianing.map(star => star)}
  </MulishText>
  }

const Row = ({children, style}) => (
  <View style={{ flexDirection: "row", ...style }}>
     {children}
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: WIDTH-50,
    alignItems: "flex-start",
    justifyContent: 'flex-start',
    marginVertical: 8
  },
  rating:{
    marginRight: wp('1%')
  }
})
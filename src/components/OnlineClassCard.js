/* eslint-disable react-native/no-raw-text */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableOpacityComponent } from 'react-native';
import { rf, WIDTH, wp } from '../constants/Constants';
import { Avatar, Chip, Image, ListItem, Rating } from 'react-native-elements';
import MulishText from './MulishText';
import SFProText from './SFProText';
import Colors from '../constants/Colors';
import Icon from '../constants/Icon';
import { navigate } from '../navigations/NavigationService';

export default function OnlineClassCard({ image, name, skill, address, rating, reviews }) {
  
    return (
          <View style={styles.container}>
            <ListItem containerStyle={{ backgroundColor: 'transparent', padding: 0, width: '100%'}} onPress={() => navigate('ProgramDetails')} Component={TouchableOpacity}>
            <Avatar source={image} size={60} avatarStyle={{ width: 60, height: 60, borderRadius: 8 }} />
            <ListItem.Content>
                <ListItem.Title>
                    <MulishText semiBold fontSize={14} color={'#1E2022'}>{name}</MulishText>
                </ListItem.Title>
                <ListItem.Subtitle>
                    <View style={{ }}>
                       <SFProText color="#77838F" fontSize={rf(1.8)}>{skill}</SFProText>
                       <SFProText color="#77838F" fontSize={rf(1.8)}>{address}</SFProText>
                      
                    </View>
                </ListItem.Subtitle>
            </ListItem.Content>
            <Icon.Ionicon name="chatbubble-ellipses" size={wp('6%')} color={Colors.primaryColor} style={{ marginRight: wp('2%') }}/>
            </ListItem>

            <Row style={{ justifyContent: 'flex-start', alignItems: 'center',  width: '100%',}}>
                <Rating
                  value={rating}
                  type="custom"
                  ratingColor={'#FFD855'}
                  ratingBackgroundColor='#EFF3FA'
                  ratingCount={5}
                  imageSize={13}
                  onFinishRating={() => {}}
                  style={styles.rating} 
                  readOnly
                  />
                <SFProText color="#77838F" fontSize={rf(1.5)}>{`(${reviews})`}</SFProText>
            </Row>
          </View>
    )
}

const IconText = ({ icon, text }) => (
  <TouchableOpacity onPress={() => {navigate('Chat', { screen: 'PrivateChat'})}}>
  <Row style={{ alignItems: 'center', justifyContent: 'center',}}>
    {icon}
    <View style={{ width: 2,}}/>
    <SFProText color="#77838F" fontSize={rf(1)}>{text}</SFProText>
  </Row>
  </TouchableOpacity>
)

const Row = ({children, style}) => (
  <View style={{ flexDirection: "row", ...style }}>
     {children}
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: WIDTH-50,
    height: 'auto',
    alignItems: "flex-start",
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 8,
    padding: 14,
    marginVertical: 12,
    marginHorizontal: 10
  },
  rating:{
    marginRight: wp('1%')
  }
})
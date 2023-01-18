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

export default function TrainerProfileCard(data) {

  const { _id, image, name, expertise } = data; 
  
    return (
          <View style={styles.container}>
            <ListItem containerStyle={{ backgroundColor: 'transparent', padding: 0, width: '100%'}} onPress={() => navigate('TrainerProfile', { trainer: data })} Component={TouchableOpacity}>
            <Avatar source={{ uri: image }} size={60} avatarStyle={{ width: 60, height: 60, borderRadius: 8 }} />
            <ListItem.Content style={{ width: '50%'}}>
                <ListItem.Title>
                    <MulishText semiBold fontSize={14} color={'#1E2022'}>{name}</MulishText>
                </ListItem.Title>
                <ListItem.Subtitle>
                    <View style={{}}>
                       <SFProText color="#77838F" fontSize={rf(1.8)} style={{ width: wp('40%')}}>{expertise.join(', ')}</SFProText>
                    </View>
                </ListItem.Subtitle>
            </ListItem.Content>
            <Icon.Ionicon 
              name="chatbubble-ellipses" size={wp('6%')} color={Colors.primaryColor} 
              style={{ marginRight: wp('2%') }} 
              onPress={() => navigate('Chat', { screen: 'PrivateChat', params: { otherUser: data }})}
              />
            </ListItem>

            <Row style={{ justifyContent: 'flex-start', alignItems: 'center',  width: '100%', height: wp('15%')}}>
                <Rating
                  value={3.5}
                  type="custom"
                  ratingColor={'#FFD855'}
                  ratingBackgroundColor='#EFF3FA'
                  ratingCount={5}
                  imageSize={13}
                  onFinishRating={() => {}}
                  style={styles.rating} 
                  readOnly
                  />
                <SFProText color="#77838F" fontSize={rf(1.7)}>{`(${34})`}</SFProText>
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
    height: 122,
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
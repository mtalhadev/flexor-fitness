import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import Colors from '../constants/Colors';
import { hp, wp } from '../constants/Constants';
import MulishText from './MulishText';

export default function TextMessage({ text, time, isItMe, user }) {
  if(isItMe)
    return (
        <MessageBubbleRight
            text = {text}
            time={time}
            user={user}
          />
    )
    else return (
        <MessageBubbleLeft
          text = {text}
          time={time}
          user={user}
          />
    )
}

const MessageBubbleLeft = ({ text, time, user }) => (
    <View style={styles.messageContainer}>
        <View style={[styles.bubble, styles.shadow, { marginLeft: 0, backgroundColor: '#FFF' }]}>
            <MulishText style={{ color: '#000', fontSize: 14 }}>{text}</MulishText>
        </View>
        <View style={{  marginTop: 8, marginBottom: hp('3%') }}>
            {
                user ? 
                <ListItem containerStyle={{ width: wp('50%'), backgroundColor: 'transparent', padding: 0 }}>
                   <Avatar source={user.avatar} size={22} rounded />
                   <ListItem.Content>
                    <ListItem.Title style={{ marginLeft: -3 }}>
                        <MulishText bold fontSize={13} color={'#000'}>{user.name}</MulishText>
                    </ListItem.Title>
                   </ListItem.Content>
                   <MulishText style={{ color: '#918FB7', fontSize: 12, }}>{time}</MulishText>
                </ListItem>
                : 
                <MulishText style={{ color: '#918FB7', fontSize: 12, }}>{time}</MulishText>
            }
        </View>
    </View>
  )
  const MessageBubbleRight = ({ text, time, user }) => (
    <View style={[styles.messageContainer, { alignItems: 'flex-end' }]}>
        <View style={[styles.bubble, { marginRight: 0, backgroundColor: Colors.primaryColor }]}>
        <MulishText style={{ color: '#FFF', fontSize: 14 }}>{text}</MulishText>
        </View>
        <View style={{  marginTop: 8, marginBottom: hp('3%') }}>
        {
            user ? 
            <ListItem containerStyle={{ width: wp('50%'), backgroundColor: 'transparent', padding: 0 }}>
              <Avatar source={user.avatar} size={22} rounded />
              <ListItem.Content>
              <ListItem.Title style={{ marginLeft: -3 }}>
                  <MulishText bold fontSize={13} color={'#000'}>{user.name}</MulishText>
              </ListItem.Title>
              </ListItem.Content>
              <MulishText style={{ color: '#918FB7', fontSize: 12, }}>{time}</MulishText>
          </ListItem>
     : 
            <MulishText style={{ color: '#918FB7', fontSize: 12, }}>{time}</MulishText>
        }
      </View>
    </View>
  )
  
const styles = StyleSheet.create({
    messageContainer: {
        width: wp('90%'),
        alignItems: 'flex-start',
        marginVertical:3
      },
      bubble: {
        width: wp('65%'),
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: Colors.primaryColor,
        borderRadius: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
      shadow: {
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 6,
    
      }
    })
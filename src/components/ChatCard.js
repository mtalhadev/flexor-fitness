import moment from 'moment';
import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Badge, ListItem } from 'react-native-elements';
import images from '../assets/images';
import { WIDTH, wp } from '../constants/Constants';
import { useUser } from '../redux/reducers/AuthReducer';
import MulishText from './MulishText';
import SFProText from './SFProText';
import SwipableListItem from './SwipableListItem';
import { _translate } from "../localization"

export default function ChatCard({ item, navigate, onDelete, searchText }) {
  
  const logedInUser  = useUser();
  
  
  const user = item?.groupId?
                item.trainerSenderId?
                  item.trainerSenderId:
                item.trainerReciverId?
                  item.trainerReciverId:
                item.reciverId?
                  item.reciverId:
                item.senderId
                :
               item.trainerSenderId && item.trainerSenderId._id !== logedInUser?._id?
                  item.trainerSenderId:
                item.trainerReciverId && item.trainerReciverId._id !== logedInUser?._id?
                  item.trainerReciverId:
                item.reciverId && item.reciverId._id !== logedInUser?._id?
                  item.reciverId:
                item.senderId

  let name = item?.groupId?.title;
  name = name || user.name;

  const lastestMessage = item.messageId ? item.messageId : item.groupMessageId;
  
  const onPressHandler = ()=>{
    if(item.groupId){
      navigate("PrivateChat",{ group: item })
    }else{
      navigate("PrivateChat",{ otherUser: user })
    }
  }

  if(searchText.length && !name.startsWith(searchText)) return null;

  return (
      <SwipableListItem 
        handleDelete={() => {}}
        // handleDelete={() => onDelete()}
        containerStyle={{ width: wp('100%'),height: 92,}}
      >
          <View style={styles.container}>
            <ListItem containerStyle={{ backgroundColor: 'transparent', padding: 0, width: '100%'}} onPress={onPressHandler} Component={TouchableOpacity}>
              {
                user?.image?
                <Avatar source={{uri:user.image}} size={64} rounded />
                :
                <Avatar source={images.profileBkgd} size={64} rounded />
              }
            <ListItem.Content>
                <ListItem.Title>
                    <MulishText bold fontSize={14} color={'#221F60'}>{name}</MulishText>
                </ListItem.Title>
                <ListItem.Subtitle>
                    <View style={{ }}>
                      {
                        item?.groupId?
                        <MulishText color="#221F60" fontSize={12} numberOfLines={1} style={styles.message}>{lastestMessage?.senderId == logedInUser?._id? "me": user?.name}:{lastestMessage?.text}</MulishText>
                        :
                        <MulishText color="#221F60" fontSize={12} numberOfLines={1} style={styles.message}>{lastestMessage?.senderId == logedInUser?._id? "me: ":""}{lastestMessage?.text}</MulishText>
                      }
                    </View>
                </ListItem.Subtitle>
            </ListItem.Content>
            <MulishText color="#918FB7" fontSize={12} style={{ marginTop: 20}}>{ lastestMessage?.updatedAt?moment(lastestMessage.updatedAt).format("HH:MM"):""}</MulishText>
            </ListItem>
            {
              item.unRead > 0 &&
              <Badge
                value={item.unRead}
                status='primary'
                badgeStyle={{ width: 24, height: 24, borderRadius: 24,  backgroundColor: "#F8B851",}}
                containerStyle={{ position: 'absolute', top: 8, right: 5 }}
              />

            }
          </View>
      </SwipableListItem>
    )
}

const IconText = ({ icon, text }) => (
  <Row style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5,}}>
    {icon}
    <View style={{ width: 7,}}/>
    <SFProText color="#77838F" fontSize={12}>{text}</SFProText>
    </Row>
)

const Row = ({children, style}) => (
  <View style={{ flexDirection: "row", ...style }}>
     {children}
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    height: 92,
    alignItems: "flex-start",
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 14,
  },
  message: {
    width: wp('40%'), 
  }
})
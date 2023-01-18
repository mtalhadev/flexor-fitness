import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Avatar, Header, Icon, Input, ListItem } from 'react-native-elements';
import images from '../../assets/images';
import Group from '../../assets/svg/Group';
import MulishText from '../../components/MulishText';
import Row from '../../components/Row';
import TextMessage from '../../components/TextMessage';
import { _translate } from '../../localization';
import Colors from '../../constants/Colors';
import { hp, wp } from '../../constants/Constants';


const CHAT_HISTORY = [
    { isItMe: true, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A, varius nisl at ac. Est vitae, iaculis bibendum lorem. Pellentesque tempus sem diam malesuada. ', time: '10:52', user: { name: 'William', avatar: images.user1 }},
    { isItMe: false, text: 'Yes we are best, wow really nice', time: '11:25',user: { name: 'Steve', avatar: images.user2 }},
    { isItMe: false, text: 'Ok, will come late 2 hours', time: '11:30', user: { name: 'Mikie', avatar: images.user3 }},
    { isItMe: true, text: 'Thanks, will wait!', time: '11:32', user: { name: 'William', avatar: images.user1 }},
]; 
export default function GroupChat() {
  
    return (
          <View style={styles.container}>
          
          <GroupChatHeader name="Trainers Squad" />

          <FlatList
            data={CHAT_HISTORY}
            renderItem={({item, index}) => (
                <TextMessage  {...item}/>
              )}
            keyExtractor={(item, i) => item.name}
            style={{ width: '100%', height: hp('100%')-100, padding: wp('5%'), backgroundColor: '#F5F6FA', borderRadius: 20 }}
            ListFooterComponent={<View style={{height: 30 }}/>}/>  

            
        <MessageComposer />

          </View>
    )
}

const GroupChatHeader = ({ name }) => (
      
  <Header
    leftComponent={
      <ListItem containerStyle={{ width: wp('60%'), height: hp('10%'),}}>
        <Group />
        <ListItem.Content style={{ height: hp('10%'), marginLeft: -wp('1%')}}>
          <ListItem.Title><MulishText bold fontSize={wp('5%')} color={'#221F60'} >{ name  }</MulishText></ListItem.Title>
        </ListItem.Content>
      </ListItem>
    }
    rightComponent={
        <Row style={{ width: wp('28%'), justifyContent: "space-between"}}>
            {/* <Icon name={'call-sharp'} type='ionicon' color={'#000'} size={wp('8%')} backgroundColor="#F5F6FA" containerStyle={styles.iconStyle} />
            <Icon name={'videocam-sharp'} type='ionicon' color={'#000'} size={wp('8%')} backgroundColor="#F5F6FA" containerStyle={styles.iconStyle} /> */}
        </Row>
    }
    leftContainerStyle={{ width: wp('60%') }}
    centerContainerStyle={{ width: 0,}}
    rightContainerStyle={{ width: wp('40%'),  justifyContent: 'center', alignItems: 'flex-end', marginRight: 0,}}
    containerStyle={{ backgroundColor: '#FFF', paddingHorizontal: wp('1%'),  }}
    statusBarProps={{ backgroundColor: '#FFF', barStyle: 'dark-content' }}
  />
)
  
const MessageComposer = () => (
  <View style={styles.inputContainerStyle}>
    <Icon
      name={'add'}
      type='ionicon'
      size={wp('8%')}
      color={Colors.primaryColor}
      containerStyle={{ width: wp('14%'), height: wp('14%'), borderRadius: wp('3%'), backgroundColor: '#FFF', justifyContent: 'center', }}
    />
    {/* <Icon
      name={'mic'}
      type='ionicon'
      size={wp('8%')}
      color={Colors.primaryColor}
      containerStyle={{ width: wp('14%'), height: wp('14%'), borderRadius: wp('3%'), backgroundColor: '#FFF', justifyContent: 'center', }}
    /> */}

    <Input
      containerStyle={styles.inputContainer}
      inputContainerStyle={styles.inputView}
      inputStyle={styles.inputText}
      rightIcon={() =>
        <Icon
          name='send'
          type='ionicon'
          size={24}
          color={Colors.primaryColor}
          containerStyle={{  }}
          onPress={() => { }}
        />
      }
      // onChangeText={(text) => {  }}
      // onEndEditing={() => {  }}
      // value={text}
      placeholder='Write now…'
      placeholderTextColor='#918FB7'
      returnKeyType={'done'}
      multiline={false}
      numberOfLines={1}
      maxLength={50}
    />
    </View>
)
          
          
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: Colors.background
    },
  
    inputContainerStyle: {
      flexDirection: 'row',
      width: wp('100%'),
      height: wp('20%'),
      backgroundColor: '#F5F6FA',
      borderTopWidth: 0,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    inputContainer: {
      width: wp('75%'),
      height: wp('14%'),
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    inputView: {
      backgroundColor: '#FFF',
      width: wp('75%'),
      height: wp('14%'),
      borderRadius: wp('3%'),
      paddingLeft: 16,
      margin: 0,
      borderBottomWidth: 0
    },
    inputText: {
      color: '#333', fontSize: 15,
      fontFamily: 'Poppins-Regular',
    }  
  })
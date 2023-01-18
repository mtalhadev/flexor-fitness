import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { wp } from '../constants/Constants';
import BadgedAvatar from './BadgedAvatar';
import Modal from 'react-native-modal'
import Icon from '../constants/Icon';
import Colors from '../constants/Colors';
import IconText from './IconText';
import SecondaryButton from './SecondaryButton';
import Row from './Row';
import { navigate } from '../navigations/NavigationService';
import RobotoText from './RobotoText';
import { deleteClient } from '../redux/actions/TrainerActions';
import { useIsLoading } from '../redux/reducers/ProfileReducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import RNToast from './RNToast';


export default function ClientModal({ 
    isModalVisible,
    closeModal,
    item  
 }) {
  
  const { _id } = item; 

  const loading = useIsLoading(); 
  const dispatch = useDispatch();

  const removeClient = () => {
    dispatch(deleteClient(_id))
    .then(unwrapResult)
    .then((originalPromiseResult) => {
      const clientId = originalPromiseResult; 
      if(clientId){
        
        RNToast.showShort('Client Removed')
      }
      closeModal()
    })
    .catch((rejectedValue) => {
      console.log('rejectedValue: ', rejectedValue)
      closeModal()
      showAlert({
        title: 'Something went wrong!!',
        message: rejectedValue,
        alertType: 'error'
      })
    })
  }
  

    return (
        <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        backdropOpacity={0.9}
        animationIn='zoomIn'
        animationOut='zoomOut'
        animationInTiming={300}
        animationOutTiming={300}
        style={{ justifyContent: "flex-start", paddingVertical: 100 }}
        useNativeDriver>

          <View style={styles.container}>
              <ListItem containerStyle={{ width: "100%", borderRadius: 17}}>
                <BadgedAvatar source={{ uri: item.image }} />
                <ListItem.Content>
                    <ListItem.Title style={styles.name} >{item.name}</ListItem.Title>
                    <ListItem.Subtitle style={styles.status} >{'Active'}</ListItem.Subtitle>
                </ListItem.Content>
                <IconText 
                  icon={<Icon.Ionicon name="chatbubble-ellipses" size={24} color={Colors.primaryColor} />}
                  text={<RobotoText fontSize={14}>{``}</RobotoText>}
                  // onPress={() => { navigate('Chat', { screen: 'PrivateChat'}) }}
                  onPress={() => { navigate('Chat', { screen: 'PrivateChat',params: {otherUser: item}}) }}
                />
              </ListItem>

              <Row style={{ justifyContent: "space-between", width: '100%',marginBottom: 10 }}>
                <View />
                {/* <SecondaryButton 
                    title = {`Charge ${item.name.split(' ')[0]}`}
                    containerStyle = {{ width: '50%', borderRadius: 65 }}
                    buttonStyle = {{ borderWidth: 0 }}
                    titleStyle = {styles.charge}
b                      onPress = {() => { closeModal(); navigate('ChargeUser',{item}) }} 
                    /> */}
                <SecondaryButton 
                    title = {`Remove ${item.name.split(' ')[0]}`}
                    containerStyle = {{ width: '50%', borderRadius: 65}}
                    buttonStyle = {{ borderWidth: 0 }} 
                    titleStyle = {styles.remove}
                    onPress = {() => { removeClient() }} 
                    loading={loading}
                    />

              </Row>
          </View>
          </Modal>
    )
}
const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    height: 162,
    alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: '#FFF',
    borderRadius: 17,
  },
  name: {
     fontFamily: "Roboto-Regular",
     fontSize: 20,
     color: "#000"
  },
  status: {
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    color: "#31B511"
 },
 remove: {
    fontFamily: "Roboto-Regular",
    fontSize: wp('5%'),
    color: "#FF6D55"
 },
 
 charge: {
    fontFamily: "Roboto-Regular",
    fontSize: wp('5%'),
    color: "#000"
 },
})
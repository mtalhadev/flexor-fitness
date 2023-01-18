import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Avatar, Badge, Chip, FAB, ListItem, CheckBox } from 'react-native-elements';
import Icon from '../../../constants/Icon';
import { _translate } from '../../../localization';
const Client = ({item, addClient, clients}) => {

const isIncluded = clients.some(client => client._id == item._id)


console.log(item,"<=---=-=")


return (
    <ListItem onPress={() => {}} Component={TouchableOpacity}>
        <Avatar
          rounded
          source={{uri: item.image}}
          size={60}
        />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        {/* <ListItem.Subtitle> */}
          {/* <PoppinsText fontSize={12}>
            {item.amount}  <PoppinsText color='#000' fontSize={10}>{`Last charge: ${item.date}`}</PoppinsText>
          </PoppinsText> */}
        {/* </ListItem.Subtitle> */}
      </ListItem.Content>
      <CheckBox
        
        checked={isIncluded}
        onPress={addClient}
      />
      {/* <Icon.Feather name='calendar' size={24} color='#AFAFAF' style={{ marginRight: 10}} /> */}
    </ListItem>
  )
  
}

export default  Client

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
    },
})
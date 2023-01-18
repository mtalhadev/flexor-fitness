import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import { showAlert } from 'react-native-customisable-alert';
import { Image, ListItem } from 'react-native-elements';
import images from '../../assets/images';
import MulishText from '../../components/MulishText';
import NavigationHeader from '../../components/NavigationHeader';
import PrimaryButton from '../../components/PrimaryButton';
import Colors from '../../constants/Colors';
import { AUTH_TOKEN, hp, wp } from '../../constants/Constants';
import { navigate } from '../../navigations/NavigationService';
import { useUser } from '../../redux/reducers/AuthReducer';
import { createGroup } from '../../services/FetchApiService';
import LocalStorage from '../../services/LocalStorage';
import CreateGroupModal from './CreateGroupModal';
import SocketManager from '../../socketManager';

import { _translate } from '../../localization';
export default function CreateGroup() {
  
  
  /**
   * State Management
   */
  const [template, setTemplate] = useState();
  const [state, setState] = useState({
    groupName: "",
    isVisible: false,
    clients: []
  });
  
  /**
   * Hooks
   */

  const user = useUser();

  /**
   * Create Group Handler
   */

  const createGroupHandler = async()=>{
    const token = await LocalStorage.getData(AUTH_TOKEN);
    const data = {
      title: state.groupName,
      members: state.clients
    }
    // navigate('GroupChat') 
    createGroup(data,token,res=>{
      if(res.success){
        SocketManager.instance.emitJoinGroup(res.group._id)
        SocketManager.instance.emitGroupMessage({
          groupId: res.group._id,
          text: `${user.name} created this group`,
          trainerSenderId: user._id,
          members: state.clients
        })
        showAlert({
          title: "Success",
          message: res.message,
          alertType: "success"
        })
        setState({
          groupName: "",
          isVisible: false,
          clients: []
        })
      }
    })
  }
  const addClientHandler = (client)=>{
    const isIncluded = state.clients.some(client => client._id == client._id)
    if(isIncluded){
      const _clients = state.clients.filter(client => client._id != client._id)
      setState({...state, clients: _clients})
    }else{
      setState({...state, clients: [...state.clients,client]})
    }
  }


  return (
    <View style={styles.container}>
      <NavigationHeader title={_translate("createYourGroup")} backArrow />

      <MulishText color="rgba(0,0,0,.53)" fontSize={14} style={{ width: wp('90%'), lineHeight: 20, marginVertical: hp('1%'), textAlign: "center" }}>
        {_translate("yourGroupIsWhere")}
      </MulishText>

      {/* <PrimaryButton
        title={'Create My Own'}
        titleStyle={{ color: '#000'}}
        containerStyle={{ alignItems: 'center', justifyContent: 'center', marginTop: hp('5%'), marginBottom: hp('2%'),}}
        buttonStyle={{ width: wp('85%'), height: 56, borderRadius: 10,  backgroundColor: Colors.background2, borderWidth: 2, borderColor: template==0 ? Colors.primaryColor : Colors.background2, }}
        onPress={() => { setTemplate(0)}}
      />

      <View style={{ width: wp('90%') }}>
          <MulishText bold color={Colors.primaryColor} fontSize={17} style={styles.heading} >{`Choose template`}</MulishText>
          <IconButton
            title={'Trainers'}
            image={images.trainers_group}
            onSelect={() => { setTemplate(1) }}
            selected={template == 1}
            />
          <IconButton
            title={'Friends'}
            image={images.friends_group}
            onSelect={() => { setTemplate(2) }}
            selected={template == 2}
            />
      </View> */}

      <PrimaryButton
        title={_translate("createGroup")}
        containerStyle={{ alignItems: 'center', justifyContent: 'center', marginTop: hp('5%'), marginBottom: hp('2%')}}
        buttonStyle={{ width: wp('85%'), height: 56, borderRadius: 10 }}
        onPress={()=>setState({...state,isVisible: true})}
      />
      <CreateGroupModal
        onSubmit = {createGroupHandler}
        onTextChange = {text=> setState({...state,groupName: text})}
        toggle = {()=>setState({...state,isVisible: false})}
        value  = {state.groupName}
        visible = {state.isVisible}
        clients = {user.clients}
        state    = {state}
        addClient = {addClientHandler}

      />
    </View>
  )
}

const IconButton = ({ image, title,  selected, onSelect }) => (
    <ListItem containerStyle={[styles.iconBtn, { borderColor: selected ? Colors.primaryColor : Colors.background2, }]} onPress={onSelect} Component={TouchableOpacity}>
       <Image source={image} style={{ width: 26, height: 36, resizeMode: 'contain'}}/>
       <ListItem.Content>
        <ListItem.Title><MulishText bold color='#000'>{title}</MulishText></ListItem.Title>
       </ListItem.Content>
    </ListItem>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
  },
  iconBtn: {
    width: wp('85%'),
    height: 56,
    borderRadius: 10,
    
    borderWidth: 2,
    backgroundColor: Colors.background2,
    marginVertical: hp('1%')
  }
})
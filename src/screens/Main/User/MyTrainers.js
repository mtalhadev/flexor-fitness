import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import images from '../../../assets/images';
import BadgedAvatar from '../../../components/BadgedAvatar';
import MyTrainerModal from '../../../components/MyTrainerModal';
import NavigationHeader from '../../../components/NavigationHeader';
import PoppinsText from '../../../components/PoppinsText';
import { _translate } from '../../../localization';

const TRAINERS = [
  { id: 1, name: "William Jones", amount: "$12", date: "24/10/2021", image: images.user1 },
  { id: 2, name: "Marvin McKinney", amount: "$20", date: "24/10/2021", image: images.user2 },
  { id: 3, name: "Esther Howard", amount: "$30", date: "24/10/2021", image: images.user3 },
  { id: 4, name: "Theresa Webb", amount: "$70", date: "24/10/2021", image: images.user4 },
  { id: 5, name: "Eleanor Pena", amount: "$90", date: "24/10/2021", image: images.user5 },
]; 
export default function MyTrainers() {
  
  const [modalProps, setModalProps] = useState({
    visible: false, data: { }
  });

    return (
          <View style={styles.container}>
              <NavigationHeader title={_translate("myTrainers")} backArrow/>

          <FlatList
            data={TRAINERS}
            renderItem={({item, index}) => (
              <Trainer {...item} onPress={(data) => { setModalProps({ visible: true, data }) }} />
            )}
            keyExtractor={(item, i) => item.id}
            style={{ width: '100%', height: '100%', padding: 5 }}
            />  
            
          <MyTrainerModal 
              isModalVisible={modalProps.visible}
              closeModal={() => { setModalProps({ ...modalProps, visible: false })}}
              item={modalProps.data}  
          />
          </View>
    )
}

const Trainer = (item) => (
    <ListItem onPress={() => item.onPress(item)} Component={TouchableOpacity}>
      <BadgedAvatar source={item.image} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>
          <PoppinsText fontSize={12}>
            {item.amount}  <PoppinsText color='#000' fontSize={10}>{`${_translate("lastPaidToHim:")} ${item.date}`}</PoppinsText>
          </PoppinsText>
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
    },
})
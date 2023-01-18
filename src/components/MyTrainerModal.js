import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import { wp } from '../constants/Constants';
import { navigate } from '../navigations/NavigationService';
import PoppinsText from './PoppinsText';
import Row from './Row';
import SecondaryButton from './SecondaryButton';

export default function MyTrainerModal({ 
    isModalVisible,
    closeModal,
    item  
 }) {
  
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
                <Avatar source={item.image} size={52} rounded />
                <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>
                  <PoppinsText fontSize={12}>
                    {item.amount}  <PoppinsText color='#000' fontSize={10}>{`Last paid to him: ${item.date}`}</PoppinsText>
                  </PoppinsText>
                </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>

              <Row style={{ justifyContent: "space-between", width: '100%',marginBottom: 10 }}>
                <SecondaryButton 
                    title = {`Message`}
                    containerStyle = {{ width: '50%', borderRadius: 65 }}
                    buttonStyle = {{ borderWidth: 0 }}
                    titleStyle = {styles.charge}
                    onPress = {() => { closeModal(); navigate('Chat', { screen: 'PrivateChat' }) }} 
                    />
                <SecondaryButton 
                    title = {`Give Review`}
                    containerStyle = {{ width: '50%', borderRadius: 65}}
                    buttonStyle = {{ borderWidth: 0 }} 
                    titleStyle = {styles.remove}
                    onPress = {() => { closeModal(); navigate('RateTrainer') }} 
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
    fontSize: 18,
    color: Colors.primaryColor
 },
 
 charge: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    color: Colors.primaryColor
 },
})
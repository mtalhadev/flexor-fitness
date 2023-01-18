import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import { wp } from '../constants/Constants';
import Icon from '../constants/Icon';
import { navigate } from '../navigations/NavigationService';
import { handleClientRequest } from '../redux/actions/TrainerActions';
import IconText from './IconText';
import PrimaryButton from './PrimaryButton';
import RobotoText from './RobotoText';
import Row from './Row';
import SecondaryButton from './SecondaryButton';
import { _translate } from "../localization"
export default function ClientRequestCard({ _id, image, name, className, timing }) {

    const dispatch = useDispatch()

    const handleRequest = ({ requestClient, accept }) => {
      dispatch(handleClientRequest({ requestClient, accept }))
    }
    
    return (
        <View style={styles.container}>
        <ListItem containerStyle={{  padding: 0, width: '100%', }}>
            <Avatar source={{ uri: image }} size={48} rounded />
            <ListItem.Content style={{ marginLeft: -5, marginTop: 10}}>
                <ListItem.Title>
                    <RobotoText fontSize={15} color={'#000'}>{name}</RobotoText>
                </ListItem.Title>
                {/* <ListItem.Subtitle>
                    <View style={{ }}>
                    <RobotoText color="#000" fontSize={11}>{className}</RobotoText>
                    <RobotoText color="rgba(0,0,0,.55)" fontSize={9}>{timing}</RobotoText>
                    </View>
                </ListItem.Subtitle> */}
            </ListItem.Content>
            <IconText 
                icon={<Icon.Ionicon name="chatbubble-ellipses" size={24} color={Colors.primaryColor} />}
                text={<RobotoText fontSize={10} color={'#000'}>{_translate("Message")}</RobotoText>}
                onPress={() => { navigate('Chat', { screen: 'PrivateChat'}) }}
            />
        </ListItem>    
        <Row style={{ width: 210, height: 35, alignItems: 'center', justifyContent: 'space-between',}}>
          <PrimaryButton
            title={_translate("Accept")}
            buttonStyle={{ width: 90, height: 30, borderRadius: 30, paddingVertical: 0, }}
            titleStyle = {{ color: '#FFF', fontSize: 11 }}
            onPress={() => handleRequest({ requestClient: _id, accept: true })}
            />
          <SecondaryButton
            title = {_translate("Decline")}
            buttonStyle = {{ width: 90, height: 30, borderWidth: 0, borderRadius: 30, paddingVertical: 0, backgroundColor: '#B0B0B0',  }}
            titleStyle = {{ color: '#FFF', fontSize: 11 }}
            onPress = {() => handleRequest({ requestClient: _id, accept: false })} 
            />
        </Row>
        </View>
        )
}
const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    height: 140,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    elevation: 8,
    padding: wp('3%'),
    marginVertical: 10,
    borderRadius: 8
  },
})
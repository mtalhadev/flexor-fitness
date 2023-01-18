/* eslint-disable react-native/no-raw-text */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import Colors from '../constants/Colors';
import { wp } from '../constants/Constants';
import PrimaryButton from './PrimaryButton';
import RobotoText from './RobotoText';
import Row from './Row';
import SecondaryButton from './SecondaryButton';
import moment from 'moment';


export default function PaymentRequestCard({item, paymentSendHandler, allPaymentSendHandler}) {
    
    const { trainer,title, amount,updatedAt } = item
    // console.log(item.updatedAt)
    return (
        <ListItem containerStyle={{ backgroundColor: 'transparent', padding: 0, width: '100%', height: 100 }}>
        <Avatar source={{uri: trainer?.image}} size={48} rounded />
        <ListItem.Content style={{ marginLeft: -5, marginTop: 10}}>
            <ListItem.Title>
                <RobotoText fontSize={15} color={'#000'}>{trainer?.name}  <RobotoText fontSize={15} color={Colors.primaryColor}>${amount}</RobotoText></RobotoText>
            </ListItem.Title>
            <ListItem.Subtitle>
                <View style={{ }}>
                   <RobotoText color="#000" fontSize={11}>{title}</RobotoText>
                   {/* <RobotoText color="rgba(0,0,0,.55)" fontSize={9}>{`${timing}   Last Payment ${lastAmount}`}</RobotoText> */}
                   {
                       updatedAt?
                       <RobotoText color="rgba(0,0,0,.55)" fontSize={9}>{moment(updatedAt).format("DD MMM, YYYY")}</RobotoText>
                       :<></>
                   }
                </View>
            </ListItem.Subtitle>
        </ListItem.Content>
        <Row style={{ justifyContent: 'center', width: wp('30%'), height: 35, flexWrap: 'wrap', alignItems: 'center',}}>
            <PrimaryButton
                title={'Pay'}
                buttonStyle={{ width: 90, height: 30, borderRadius: 30, paddingVertical: 0 }}
                titleStyle = {{ color: '#FFF', fontSize: 11 }}
                onPress={() => {paymentSendHandler(item, true) }}
                />
            <SecondaryButton
                title = {`Not Now`}
                containerStyle = {{ width: 70,  }}
                buttonStyle = {{ height: 30, borderWidth: 0, borderRadius: 30, paddingVertical: 0 }}
                titleStyle = {{ color: '#000', fontSize: 10 }}
                onPress = {() => {paymentSendHandler(item ,false)}} 
                />

        </Row>
        </ListItem>    
        )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
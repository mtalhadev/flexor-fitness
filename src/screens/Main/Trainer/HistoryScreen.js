import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import images from '../../../assets/images';
import MulishText from '../../../components/MulishText';
import NavigationHeader from '../../../components/NavigationHeader';
import PrimaryButton from '../../../components/PrimaryButton';
import RNCalendar from '../../../components/RNCalendar';
import Colors from '../../../constants/Colors';
import { wp, hp } from '../../../constants/Constants';
import { navigate } from '../../../navigations/NavigationService';
import { _translate } from "../../../localization";

export default function HistoryScreen() {
  
  const [selectedDate, setSelectedDate] = useState(moment());

    return (
      <View style={styles.container}>
          <NavigationHeader 
            title={_translate("history")} 
            backArrow={true} 
            rightComponent={<Avatar source={images.user1} size={45} rounded />}
            />
          <MulishText color="rgba(0,0,0,.53)" fontSize={14} style={{ width: wp('90%') }}>
            {_translate("clickOnAnyDateToSeeYourHistory")}
            </MulishText>

          <RNCalendar 
            onSelectDate={(date) => setSelectedDate(moment(date.dateString, 'YYYY-MM-DD', true))} />          

          <View style={{ width: wp('90%') }}>
          <MulishText bold color="#000" fontSize={17} style={styles.heading} >{_translate("selectedDate")}</MulishText>
          <MulishText color="#000" fontSize={14}>{selectedDate.format('MMMM DD, YYYY')}</MulishText>

          <MulishText bold color="#000" fontSize={17} style={styles.heading}>{_translate("work")}</MulishText>
          <ListItem containerStyle={{ width: '100%', backgroundColor: 'transparent', padding: 0, marginVertical: 3,  }}>
             <ListItem.Content>
              <ListItem.Title><MulishText color="#000" fontSize={14}>{_translate("workedFrom11:00AMTo12PM")}</MulishText></ListItem.Title>
             </ListItem.Content>
             <MulishText color="#000" fontSize={14}>{`5 sets`}</MulishText>
          </ListItem>
          <ListItem containerStyle={{ width: '100%', backgroundColor: 'transparent', padding: 0, marginVertical: 3,  }}>
             <ListItem.Content>
              <ListItem.Title><MulishText color="#000" fontSize={14}>{`Worked from 5:00 PM to 7:00 PM`}</MulishText></ListItem.Title>
             </ListItem.Content>
             <MulishText color="#000" fontSize={14}>{_translate("5Sets")}</MulishText>
          </ListItem>

          <PrimaryButton
            title={_translate("chargeWilliam")}
            buttonStyle={{ width: wp('90%'), height: 65, borderRadius: 70, marginTop: hp('8%'), }}
            onPress={() => { navigate('ChargeUser') }}
            />


          </View>
         
          

      </View>
    )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
  },
  scrollView: {
     height: 60,
     paddingLeft: 20,
     marginTop: 15,
     marginBottom: 10
  },
  heading: {
     marginVertical: 15
  },
  avatar: {
    width: 47,
    height: 47,
    borderRadius: 47,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3
  }
})
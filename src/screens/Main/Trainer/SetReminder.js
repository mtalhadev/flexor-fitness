import { unwrapResult } from '@reduxjs/toolkit';
import moment from 'moment';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import DateTimeModal from '../../../components/DateTimeModal';
import MulishText from '../../../components/MulishText';
import NavigationHeader from '../../../components/NavigationHeader';
import PrimaryButton from '../../../components/PrimaryButton';
import RNCalendar from '../../../components/RNCalendar';
import StyledInput from '../../../components/StyledInput';
import Colors from '../../../constants/Colors';
import CommonStyles from '../../../constants/CommonStyles';
import { hp, wp } from '../../../constants/Constants';
import { goBack } from '../../../navigations/NavigationService';
import { postReminder } from '../../../redux/actions/TrainerActions';
import { useIsLoading } from '../../../redux/reducers/TrainerReducer';
import { showAlert } from "react-native-customisable-alert";
import { _translate } from '../../../localization';

export default function SetReminder() {
  const dispatch = useDispatch();
  const isLoading = useIsLoading()

  const now = moment();

  const [selectedDate, setSelectedDate] = useState(now);
  const [timePicker, setTimePicker] = useState({
    visible: false, time: now, 
  });
  const [note, setNote] = useState('');

  const onSelectDate = (date) => { 
    const newDate = moment(date.dateString, 'YYYY-MM-DD', true)
    newDate.hour(now.hour()).minute(now.minute());
    setSelectedDate(newDate);
   }
  const onChangeTime = (time) => {
    const newTime = moment(time);
    console.log('currentDate: ', newTime)
    setTimePicker({ visible: false, time: newTime })
  };

  const onSubmit = () => { 
    dispatch(postReminder({
      note,
      time: timePicker.time.format('YYYY-MM-DDTHH:mm:ss')
    }))
    .then(unwrapResult)
    .then((originalPromiseResult) => {
      const reminder = originalPromiseResult; 
      if(reminder?._id){
        goBack()
      }
    })
    .catch((rejectedValue) => {
      console.log('rejectedValue: ', rejectedValue)
      showAlert({
        title: `${_translate("somethingWentWrong")}`,
        message: rejectedValue,
        alertType: 'error'
      })
    });    
   }

    return (
      <View style={styles.container}>
          <NavigationHeader 
            title={_translate("setReminder")} 
            backArrow={true}
            />
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollView}
            >
            <MulishText color="rgba(0,0,0,.53)" fontSize={14} style={{ width: wp('90%'), textAlign: 'center', marginHorizontal: wp('5%') }}>
              {_translate("setReminderDateToChargeClients")}
            </MulishText>

            <RNCalendar 
              onSelectDate={onSelectDate} 
              />          

            <View style={{ width: wp('90%') }}>
              <MulishText bold color="#000" fontSize={17} style={styles.heading} >{_translate("selectedDate")}</MulishText>
              <MulishText color="#000" fontSize={14}>{selectedDate.format('MMMM DD, YYYY')}</MulishText>

              <MulishText bold color="#000" fontSize={17} style={styles.heading}>{_translate("setReminderTime")}</MulishText>
              <Pressable onPress={() => { setTimePicker({ ...timePicker, visible: true,  }) }}>
                <View style={[styles.time, { marginTop: 10, width: wp('90%') }]}>
                  <MulishText color='#000' fontSize={15}>{`${timePicker.time.format('hh:mm A')}`}</MulishText>
                </View>
              </Pressable>
              <StyledInput
                containerStyle={[CommonStyles.input, { height: 150, width: wp('90%'), paddingLeft: 0, paddingRight:0 }]}
                inputContainerStyle={styles.input}
                focusedStyle={styles.input}
                placeholder={_translate("note")}
                keyboardType='default'
                returnKeyType='done'
                value={''}
                onChangeText={(text) => setNote(text)}
                multiline={true}
                />
            </View>
            
            <PrimaryButton
              title={_translate("setReminder")}
              containerStyle={{ alignItems: 'center', justifyContent: 'center' }}
              buttonStyle={{ width: wp('85%'), height: 56, borderRadius: 10, marginTop: hp('5%'), marginBottom: 20 }}
              onPress={onSubmit}
              loading={isLoading}
              />

          </ScrollView>

          <DateTimeModal
            date={selectedDate.toDate()}
            isModalVisible={timePicker.visible} 
            closeModal={() => setTimePicker({ ...timePicker, visible: false }) }
            mode='time'
            onChange={(date) => onChangeTime(date)}
            />

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
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  heading: {
     marginVertical: 15,
     marginTop: 24
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
  },
  input: {
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 8,
    backgroundColor: "#FFF",
    width: '100%',
    height: 150,
    marginLeft: 0,
    elevation: 5
  },
  time: {
    height: 56,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 8,
    backgroundColor: "#FFF",
    elevation:5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20
  },

})
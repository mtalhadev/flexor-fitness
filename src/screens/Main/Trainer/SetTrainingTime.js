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
import Row from '../../../components/Row';
import Colors from '../../../constants/Colors';
import { hp, wp } from '../../../constants/Constants';
import { goBack } from '../../../navigations/NavigationService';
import { postTrainingTime } from '../../../redux/actions/TrainerActions';
import { useIsLoading } from '../../../redux/reducers/TrainerReducer';
import { _translate } from '../../../localization';

export default function SetTrainingTime() {
  const dispatch = useDispatch();
  const isLoading = useIsLoading();

  const now = moment();

  const [selectedDate, setSelectedDate] = useState(now);

  const [startTime, setStartTime] = useState(now);
  const [endTime, setEndTime] = useState(now);
  const [timePicker, setTimePicker] = useState({
    visible: false, time: now, fieldName: ''
  });
  const onSelectDate = (date) => { 
    const newDate = moment(date.dateString, 'YYYY-MM-DD', true)
    newDate.hour(now.hour()).minute(now.minute());
    setSelectedDate(newDate);
   }

  const onChangeTime = (selectedtime) => {
    const newTime = moment(selectedtime);
    console.log('newTime: ', newTime)
    setTimePicker({ visible: false, time: moment(), fieldName: '' })
    if(timePicker.fieldName == 'From') setStartTime(newTime);
    if(timePicker.fieldName == 'To') setEndTime(newTime);
  };
  
  const onSubmit = () => { 
    dispatch(postTrainingTime({
      from: startTime.format('YYYY-MM-DDTHH:mm:ss'),
      to: endTime.format('YYYY-MM-DDTHH:mm:ss')
    }))
    .then(unwrapResult)
    .then((originalPromiseResult) => {
      const trainingTime = originalPromiseResult; 
      if(trainingTime?._id){
        goBack()
      }
    })
    .catch((rejectedValue) => {
      console.log('rejectedValue: ', rejectedValue)
      showAlert({
        title: 'Something went wrong!!',
        message: rejectedValue,
        alertType: 'error'
      })
    });    
   }


    return (
      <View style={styles.container}>
          <NavigationHeader 
            title={_translate("trainingDays")} 
            backArrow={true}
            />

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollView}
            >

          <MulishText color="rgba(0,0,0,.53)" fontSize={14} style={{ width: wp('90%'), textAlign: 'center', marginHorizontal: wp('5%') }}>
            {_translate("setTrainingDays")}
            </MulishText>

          <RNCalendar 
            onSelectDate={onSelectDate}
            />          

          <View style={{ width: wp('90%') }}>
            <MulishText bold color="#000" fontSize={17} style={styles.heading} >{_translate("selectedDate")}</MulishText>
            <MulishText color="#000" fontSize={14}>{selectedDate.format('MMMM DD, YYYY')}</MulishText>

            <MulishText bold color="#000" fontSize={17} style={styles.heading}>{_translate("trainingTimeToClients")}</MulishText>
            
            <Row style={{ width: wp('90%'), height: 60, justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <Pressable onPress={() => { setTimePicker({ ...timePicker, visible: true, fieldName: 'From' }) }}>
              <View style={[styles.input, { marginTop: 0, width: wp('43%') }]}>
              <MulishText color='#999' fontSize={15}>{`From: `}<MulishText bold color='#000' fontSize={15}>{`${startTime.format('hh:mm A')}`}</MulishText></MulishText>
              </View>
            </Pressable>
            <Pressable onPress={() => { setTimePicker({ ...timePicker, visible: true, fieldName: 'To' }) }}>
              <View style={[styles.input, { marginTop: 0, width: wp('43%') }]}>
                <MulishText color='#999' fontSize={15}>{`To: `}<MulishText bold color='#000' fontSize={15}>{`${endTime.format('hh:mm A')}`}</MulishText></MulishText>
              </View>
            </Pressable>
            </Row>

          </View>

            <PrimaryButton
              title={_translate("setTrainingTime")}
              containerStyle={{ alignItems: 'center', justifyContent: 'center',}}
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
    height: 56,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 8,
    backgroundColor: "#FFF",
    elevation:5,
    justifyContent: 'center',
    alignItems: 'center',
  },

})
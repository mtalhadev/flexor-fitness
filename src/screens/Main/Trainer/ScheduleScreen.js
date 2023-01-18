import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, RefreshControl } from 'react-native';
import MulishText from '../../../components/MulishText';
import NavigationHeader from '../../../components/NavigationHeader';
import RNCalendar from '../../../components/RNCalendar';
import Row from '../../../components/Row';
import SecondaryButton from '../../../components/SecondaryButton';
import Colors from '../../../constants/Colors';
import { hp, wp } from '../../../constants/Constants';
import Icon from '../../../constants/Icon';
import { navigate } from '../../../navigations/NavigationService';
import {   fetchTrainerSchedule } from '../../../redux/actions/TrainerActions';
import { useIsLoading,  useReminders, useTrainingTime } from '../../../redux/reducers/TrainerReducer';
import { useDispatchEffect } from '../../../utilities/hooks';
import { _translate } from '../../../localization';
import { useMyClasses } from '../../../redux/reducers/ProfileReducer';
const CLASSES = {key: 'classes', color: Colors.primaryColor, selectedDotColor: 'white'};
const REMINDER = {key: 'reminder', color: 'red', selectedDotColor: 'pink'};
const TRAININGTIME = {key: 'trainingTime', color: 'green', selectedDotColor: "lightgreen"};

export default function ScheduleScreen() {
  const classes = useMyClasses(); 
  const reminders = useReminders(); 
  const trainingTime = useTrainingTime(); 
  const isLoading = useIsLoading(); 
  const isFocused = useIsFocused();

  const onRefresh = useDispatchEffect(fetchTrainerSchedule, null, isFocused);

  const [selectedDate, setSelectedDate] = useState(moment());
  const [month, setMonth] = useState({
    month: moment().month(),
    year: moment().year()
  });
  
  const videos = useMemo(() => {
    let vids = [];
    if(classes.length)
    for (const cls of classes) {
      const createdDate = moment.utc(cls.createdAt);  
      const day = createdDate.day()-1; 
      const startDate = moment(createdDate).add(7-day,'days'); 
      const videos = cls.videos.map(vid => ({
        ...vid,
        classId: cls._id,
        classTitle: cls.title,
        date: videoDate(startDate, vid.week, vid.day)
      }));
      vids = vids.concat(videos)
    }
    return vids;
  }, [classes]); 

  const _markedDates = useMemo(() => {
    let dates = {};
    for (const video of videos) {
      const date = video.date;  
      if(!dates[date])
        dates[date] = { dots: [CLASSES] }
      else if (Array.isArray(dates[date].dots) && !dates[date].dots.find(item => item.key === CLASSES.key))
        dates[date].dots.push(CLASSES)
    }
    for (const reminder of reminders) {
      const date = moment.utc(reminder.time).format('YYYY-MM-DD'); 
      if(!dates[date])
        dates[date] = { dots: [REMINDER] }
      else if (Array.isArray(dates[date].dots) && !dates[date].dots.find(item => item.key === REMINDER.key))
        dates[date].dots.push(REMINDER)
    }
    for (const training of trainingTime) {
      const date = moment.utc(training.from).format('YYYY-MM-DD'); 
      if(!dates[date])
        dates[date] = { dots: [TRAININGTIME] }
      else if (Array.isArray(dates[date].dots) && !dates[date].dots.find(item => item.key === TRAININGTIME.key))
        dates[date].dots.push(TRAININGTIME)
    }
    return dates;
  }, [videos, reminders, trainingTime])

  const dateVids = videos.filter(video => {
    const date = video.date.split('T')[0]; 
    return selectedDate.format('YYYY-MM-DD')=== date;
  }); 
  const dateReminders = reminders.filter(reminder => {
    const date = reminder.time.split('T')[0]; 
    return selectedDate.format('YYYY-MM-DD')=== date;
  }); 
  const dateTrainings = trainingTime.filter(trainingTime => {
    const date = trainingTime.from.split('T')[0]; 
    return selectedDate.format('YYYY-MM-DD')=== date;
  }); 

  console.log('_markedDates: ', _markedDates)
  // const classDates = useMemo(() => {
  //   let dates = {}, days={};
  //   for (let day = 0; day < 7; day++) {
  //     const filtered = classes.filter;       
  //   }
  //   days = [...new Set(days)]; console.log('days: ', days);
  //   console.log('month: ', month);
  //   if(days.length) {
  //     let momentDate = moment().month(month.month).year(month.year).date(1); 
  //     let monthDays = momentDate.daysInMonth(); console.log('monthDays: ', monthDays)
  //     for (let day = 1; day <= monthDays; day++) {
  //       console.log('<========== Loop ==========> ', day);
  //       momentDate = moment(momentDate).clone().date(day); console.log('momentDate: ', momentDate);
  //       const weekday = momentDate.isoWeekday() - 1; console.log('weekday: ', weekday)
  //       if(days.includes(weekday)) {
  //         const dateStr = momentDate.format('YYYY-MM-DD'); console.log('dateStr: ', dateStr)
  //         dates[dateStr] = {
  //           marked: true,
  //           dotColor: Colors.primaryColor,
  //         }
  //       }
  //     }
  //   }
  //   console.log('dates: ', dates);
  //   return dates;
  // }, [classes, month])
  
    return (
      <View style={styles.container}>
          <NavigationHeader 
            title={_translate("Schedule")} 
            />

          <ScrollView 
            contentContainerStyle={{ width: '100%'}} 
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={onRefresh}
              />
            }  
          >

          <MulishText color="rgba(0,0,0,.53)" fontSize={14} style={{ width: wp('90%'), textAlign: 'center', marginHorizontal: wp('5%') }}>
            {_translate("slectCaender")}
            </MulishText>

          <RNCalendar 
            onSelectDate={(date) => setSelectedDate(moment(date.dateString, 'YYYY-MM-DD', true))} 
            markedDates={_markedDates || {}}
            onMonthChange={(month) => setMonth({ month: month.month-1, year: month.year })}
            />          

          <Row style={{ width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: 16 }}>
            <IconText 
            icon={<Icon.Entypo name={'dot-single'} size={30} color={Colors.primaryColor} />}
            text={<MulishText fontSize={14} color="#40054F">{_translate("classes")}</MulishText>}
            />
            <IconText 
            icon={<Icon.Entypo name={'dot-single'} size={30} color={'red'} />}
            text={<MulishText fontSize={14} color="#40054F">{_translate("reminders")}</MulishText>}
            />
            <IconText 
            icon={<Icon.Entypo name={'dot-single'} size={30} color={'green'} />}
            text={<MulishText fontSize={14} color="#40054F">{_translate("trainingDays")}</MulishText>}
            />
          </Row>
          <View style={{ width: wp('100%'), paddingHorizontal: wp('5%') }}>
            <MulishText bold color="#000" fontSize={17} style={styles.heading} >{_translate("selectedDate")}</MulishText>
            <MulishText color="#000" fontSize={14}>{selectedDate.format('MMMM DD, YYYY')}</MulishText>

            <MulishText bold color="#000" fontSize={17} style={styles.heading}>{_translate("details")}</MulishText>
            {
              dateVids.map(vid => (
                <IconText 
                icon={<Icon.Entypo name={'dot-single'} size={30} color={Colors.primaryColor} style={{ marginLeft: -5 }} />}
                text={
                  <MulishText color="#000" fontSize={14} style={styles.details}>
                    {`${vid.classTitle}  |  ${vid.title}`}
                  </MulishText>
                }
                style={{ justifyContent: 'flex-start', paddingLeft: 0, }}
                key={vid._id}
                />
              ))
            }
            {
              dateReminders.map(rem => (
                <IconText 
                icon={<Icon.Entypo name={'dot-single'} size={30} color={'red'} style={{ marginLeft: -5 }} />}
                text={
                  <MulishText color="#000" fontSize={14} style={styles.details}>
                    {`[${moment.utc(rem.time).format('hh:mm A')}]: ${rem.note}`}
                  </MulishText>
                }
                style={{ justifyContent: 'flex-start', paddingLeft: 0, }}
                key={rem._id}
                />
              ))
            }
            {
              dateTrainings.map(ttime => (
                <IconText 
                icon={<Icon.Entypo name={'dot-single'} size={30} color={'green'} style={{ marginLeft: -5 }} />}
                text={
                  <MulishText color="#000" fontSize={14} style={styles.details}>
                    {`${_translate("Training from")}  ${moment.utc(ttime.from).format('hh:mm A')}  to  ${moment.utc(ttime.to).format('hh:mm A')}`}
                  </MulishText>
                }
                style={{ justifyContent: 'flex-start', paddingLeft: 0, }}
                key={ttime._id}
                />
              ))
            }
           
            <Row style={{ width: wp('90%'), height: 60, justifyContent: 'flex-start', alignItems: 'center', marginVertical: 30 }}>
              <SecondaryButton
                title = {_translate("addReminder")}
                icon={{ name: 'plus', type: 'feather', color: Colors.primaryColor, size: wp('6%') }}
                containerStyle = {{ height: 50, justifyContent: 'center',  }}
                buttonStyle = {{ width: wp('40%'), height: 50, borderWidth: 0, paddingVertical: 0 }}
                titleStyle = {{ color: '#000', fontSize: 14,  }}
                onPress = {() => { navigate('SetReminder')}} 
                component={TouchableOpacity}
                />
              <SecondaryButton
                title = {_translate("addTrainingTime")}
                icon={{ name: 'plus', type: 'feather', color: Colors.primaryColor, size: wp('6%') }}
                containerStyle = {{  height: 50, justifyContent: 'center', }}
                buttonStyle = {{ width: wp('50%'), height: 50, borderWidth: 0, borderRadius: 20, paddingVertical: 0 }}
                titleStyle = {{ color: '#000', fontSize: 14,  }}
                onPress = {() => { navigate('SetTrainingTime')}} 
                component={TouchableOpacity} 
                />
            </Row>
          </View>
         </ScrollView>
      </View>
    )
}

const IconText = ({ icon, text, style }) => (
    <Row style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5, ...style }}>
      {icon}
      {text}
    </Row>
  )

const videoDate = (startDate=moment(), week, day) => { 
  const date = moment(startDate).add((week-1)*7 + day, 'days');
  return date.format('YYYY-MM-DD');
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
  },
  details: {
    lineHeight: 22
  }
})
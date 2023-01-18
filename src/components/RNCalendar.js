import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Calendar} from 'react-native-calendars';
import Colors from '../constants/Colors';
import { wp } from '../constants/Constants';
import Icon from '../constants/Icon';
import MulishText from './MulishText';
import Row from './Row';
import moment from 'moment'

export default function RNCalendar(props) {
  
  const [SelectedDate, setSelectedDate] = useState(null);
  // const today = moment(); 
  // const thisMonth = today.format('MMMM'); 
  // const [month, setMonth] = useState(thisMonth);
  // const [subtractMonth, setSubtractMonth] = useState(null);
  // const [addMonth, setAddMonth] = useState(null);

  // const onPressLeftArrow = () => {
  //   subtractMonth && subtractMonth()
  //   setMonth(month)
  // }
  // const onPressRightArrow = () => {
  //   addMonth && addMonth()
  //   setMonth(month)
  // }


  const markedDates = props.markedDates || {}; 

  let newMarked = { 
    ...markedDates,
    [SelectedDate]: {
      selected: true,
      disableTouchEvent: true,
      selectedColor: Colors.primaryColor,
      selectedTextColor: '#FFF',
      ...(markedDates[SelectedDate] || {})
    }
  }; 

  
    return (
      
        <Calendar
            markingType={'multi-dot'}

            // Initially visible month. Default = Date()
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day) => { setSelectedDate(day.dateString); console.log('onDayPress: ', day); props.onSelectDate(day) }}
            markedDates={newMarked}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => {console.log('selected day', day)}}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMMM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {console.log('month changed', month); props.onMonthChange && props.onMonthChange(month)}}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={(direction) => (<Arrow direction={direction} />)}
            renderHeader={(day) => (
              <MulishText bold color='#000' fontSize={20} >{day.toString('MMMM')}</MulishText>
            )}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={0}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={(method, month) => { method() }}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={(method, month) => { method() }}
            // Disable left arrow. Default = false
            disableArrowLeft={false}
            // Disable right arrow. Default = false
            disableArrowRight={false}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            // Replace default month and year title with custom one. the function receive a date as parameter
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
            style={{ width: wp('95%')}}
            theme={{
              contentStyle: { marginVertical: 20 },
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              textSectionTitleColor: '#857389',
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: Colors.primaryColor,
              selectedDayTextColor: '#ffffff',
              dayTextColor: '#000',
              textDisabledColor: '#999',
              dotColor: Colors.primaryColor,
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: Colors.primaryColor,
              indicatorColor: Colors.primaryColor,
              // textDayFontFamily: 'monospace',
              // textMonthFontFamily: 'monospace',
              // textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
              'stylesheet.day.basic': {
                todayText: {
                  color: '#000',
                  fontSize: 17,
                  fontWeight: 'bold'
                },
            
              }
            }}
        />
        
    )
}

function Arrow({ direction, onPress }) {
  if(direction=='left')
  return <Icon.Material name={'arrow-back-ios'} color={"#000"} size={20} style={styles.iconBack} onPress={onPress} />
  else if(direction=='right')
  return <Icon.Material name={'arrow-forward-ios'} color={"#000"} size={20} style={styles.iconBack} onPress={onPress} />

}

const styles = StyleSheet.create({
  iconBack: {
    width: 20, height: 20,
 },
 header: {
   width: wp('90%'),
   height: 50,
  justifyContent: 'space-between',
  alignItems: 'center'
 },
 arrows: {
    width: 80,
    justifyContent: "space-between"
 },
})
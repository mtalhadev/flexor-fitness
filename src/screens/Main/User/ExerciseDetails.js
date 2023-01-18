import React, { useCallback, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Icon, ListItem } from 'react-native-elements';
import MulishText from '../../../components/MulishText';
import NavigationHeader from '../../../components/NavigationHeader';
import PoppinsText from '../../../components/PoppinsText';
import PrimaryButton from '../../../components/PrimaryButton';
import RNCalendar from '../../../components/RNCalendar';
import RNVideoPlayer from '../../../components/RNVideoPlayer';
import RobotoText from '../../../components/RobotoText';
import Row from '../../../components/Row';
import StyledInput from '../../../components/StyledInput';
import Colors from '../../../constants/Colors';
import CommonStyles from '../../../constants/CommonStyles';
import { wp } from '../../../constants/Constants';
import { ordinal } from '../../../utilities/utils';
import { _translate } from '../../../localization';
const EXERCISES = [
  {  title: "1st Set",  completed: true },
  {  title: "2nd Set",  completed: false },
  {  title: "3rd Set",  completed: false },
  {  title: "4th Set",  completed: false },
  {  title: "5th Set",  completed: false },

]; 

export default function ExerciseDetails({ route }) {

  const exercise = route?.params?.exercise; 

  const {
    _id,
    title,
    image,
    video,
    days,
    rep,
    set
  } = exercise; 

  let sets = new Map();
  for (let i = 1; i <= set; i++) {
    sets.set(i, false);
  }

  const [completed, setCompleted] = useState(new Map(sets));

  const onComplete = useCallback(
    (setNo) => {
      let newMap = new Map(completed);
      newMap.set(setNo, true);
      setCompleted(newMap)
    },
    [completed],
  );

    return (
      <View style={styles.container}>
          <NavigationHeader title={title} backArrow={true} showRightMenu={false} />   
          
          <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center',}} showsVerticalScrollIndicator={false}>

          {
            video && 
            <RNVideoPlayer
              source={{ uri: video }}
              style={styles.videoPlayer}
              title={title}
            />
          }
         
          <View style={{ height: 30}}/>

          {
            [...completed.entries()].map(([setNo, status], index) => (
              <>
              <ExerciseCard number={setNo} completed={status} onComplete={onComplete} key={setNo} />
              {setNo < set &&  <Divider width={StyleSheet.hairlineWidth} style={{ width: wp('80%'), marginBottom: 5 }} color='#EAEAEA' />}
              </>
            ))
          }
          
            </ScrollView>
      </View>
    )
}

const ExerciseCard = ({ number, completed, onComplete }) => {

  return(
  <View style={{ width: wp('85%'), height: !completed ? 200 : 160, }}>
    <ListItem containerStyle={{ backgroundColor: '#FFF', padding: 0, width: wp('85%'), height: 55, marginHorizontal: 10, marginVertical: 5}}>
    <Icon name={completed ? 'check' : 'circle'} type='font-awesome' color={'#FFF'} size={20} containerStyle={styles.iconContainer}/>
    <ListItem.Content style={{ paddingLeft: 5}}>
        <ListItem.Title>
            <MulishText bold fontSize={20} color="#1E2022">{`${ordinal(number)} Set`}</MulishText>
        </ListItem.Title>
    </ListItem.Content>
    </ListItem>  
    <Row style={{ width: wp('85%'), height: 56, justifyContent: 'space-between', alignItems: 'center',}}>
      <MulishText bold fontSize={30} color={"rgba(0,0,0,.55)"} style={{ lineHeight: 58}}>{`KM`}</MulishText>
      <Input value={""} />
      <MulishText bold fontSize={30} color={"rgba(0,0,0,.55)"} style={{ lineHeight: 58}}>{`M`}</MulishText>
      <Input value={""} />
    </Row>  
    {
      !completed &&
      <PrimaryButton
        title={_translate("finish")}
        titleStyle={{ fontSize: 14}}
        buttonStyle={{ width: 83, height: 35, borderRadius: 35, marginTop: 25, padding: 0}}
        containerStyle={{ width: '100%', alignItems: 'center', height: 60, justifyContent: 'center',}}
        onPress={() => { onComplete(number)}}
        />
    }

  </View>
)}
const Input = ({ value, onEndEditing }) => { 
   return (
    <StyledInput
    containerStyle={[CommonStyles.input, { width: 107, }]}
    inputStyle={{ fontSize: 26, fontFamily: 'Mulish-Bold',}}
    placeholder={""}
    keyboardType='number-pad'
    returnKeyType='done'
    onSubmitEditing={() => { }}     
    value={value}
    // onChangeText={onChangeText}
    // errorMessage={error} 
    // errorStyle={{ fontSize: 12, textAlign: 'right' }}
    // onFocus={() => { setError('') }}
    onEndEditing={onEndEditing}
    />
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
  text: {
    textAlign:'justify'
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevron: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
  },
  videoPlayer: {
    backgroundColor: '#000',
    flex: 0,
    width: wp('100%'),
    height: 300
  },

})
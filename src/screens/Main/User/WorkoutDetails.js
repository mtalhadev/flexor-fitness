import React, { useCallback } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Image } from 'react-native-elements';
import images from '../../../assets/images';
import ExerciseCard2 from '../../../components/ExerciseCard2';
import MulishText from '../../../components/MulishText';
import NavigationHeader from '../../../components/NavigationHeader';
import TextMessage from '../../../components/TextMessage';
import Colors from '../../../constants/Colors';
import { rf, wp } from '../../../constants/Constants';
import { navigate } from '../../../navigations/NavigationService';
import { fetchExercises,} from '../../../redux/actions/ClientActions';
import { useExercises, useIsLoading } from '../../../redux/reducers/ClientReducer';
import { useDispatchEffect } from '../../../utilities/hooks';
import { _translate } from '../../../localization';

const CHAT_HISTORY = [
  { isItMe: true, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A, varius nisl at ac. Est vitae, iaculis bibendum lorem. Pellentesque tempus sem diam malesuada. ', time: '10:52', user: { name: 'William', avatar: images.user1 }},
  { isItMe: false, text: 'Yes we are best, wow really nice', time: '11:25',user: { name: 'Steve', avatar: images.user2 }},
  { isItMe: false, text: 'Ok, will come late 2 hours', time: '11:30', user: { name: 'Mikie', avatar: images.user3 }},
  { isItMe: true, text: 'Thanks, will wait!', time: '11:32', user: { name: 'William', avatar: images.user1 }},
]; 

export default function WorkoutDetails({ route }) {
  
  const workout = route?.params?.workout; 

  const {
    title,
    instructions,
    image,
    highlight,
    date,
    exercises,
    duration
  } = workout; 

  const allExercises = useExercises(); 
  const isLoading = useIsLoading(); 
  useDispatchEffect(fetchExercises, null, allExercises.length==0);

  let exerciseList = [];
  if(!isLoading && allExercises.length>0)
    exerciseList = exercises?.map(exerItem => {
      const { _id, rep, set, days,  exercise: exerciseId } = exerItem; 
      const data = allExercises.find(item => item._id === exerciseId); 
      return {
        _id,
        ...data,
        rep, set, days
      }
    }); 

  const onPressItem = useCallback(
    (id) => {
      const exercise = exerciseList.find(item => item._id === id); 
      navigate('ExerciseDetails', { exercise })
    },
    [exerciseList],
  );

    return (
      <View style={styles.container}>
          <NavigationHeader title={title} backArrow={true} showRightMenu={false} />   
          
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollView}
            >

          <View style={{ width: wp('85%'), marginBottom: 10  }}>
            <MulishText bold color="#000" fontSize={rf(2.2)} style={styles.heading} >{_translate("instructions")}</MulishText>
            <MulishText color="#000" fontSize={rf(1.6)} style={styles.text}>
              {instructions}
            </MulishText>
          </View>

          <Divider width={StyleSheet.hairlineWidth} style={{ width: wp('80%'), marginTop: 16 }} color='#EAEAEA' />
          { 
            isLoading ? 
            <ActivityIndicator size='large' color={Colors.primaryColor} style={{ marginHorizontal: wp('40%')}} />
            :
            exerciseList?.map((item, index) => (
              <ExerciseCard2 {...item}  key={item._id} completed={false} onPress={onPressItem} />
            ))
          }

          <View style={{ height: 80 }} />

          </ScrollView>
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
     marginBottom: 10,
     alignItems: 'center',
  },
  heading: {
     marginVertical: 15
  },
  text: {
    textAlign:'justify',
    lineHeight: rf(2.5)
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

})
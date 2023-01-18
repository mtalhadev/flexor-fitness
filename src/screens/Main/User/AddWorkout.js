import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { FAB, Image } from 'react-native-elements';
import images from '../../../assets/images';
import NavigationHeader from '../../../components/NavigationHeader';
import WorkoutCard from '../../../components/WorkoutCard';
import Colors from '../../../constants/Colors';
import { wp } from '../../../constants/Constants';
import { navigate } from '../../../navigations/NavigationService';
import { fetchWorkout } from '../../../redux/actions/ClientActions';
import { useIsLoading, useWorkouts } from '../../../redux/reducers/ClientReducer';
import { useDispatchEffect } from '../../../utilities/hooks';
import { _translate } from '../../../localization';
export default function AddWorkout() {
  
  const workouts = useWorkouts()
  const isLoading = useIsLoading(); 

  const isFocused = useIsFocused()

  useDispatchEffect(fetchWorkout, null, isFocused)

  const onPressItem = useCallback(
    (id) => {
      const workout = workouts.find(item => item._id === id); 
      navigate('WorkoutDetails', { workout })
    },
    [workouts],
  );
  
    return (
          <View style={styles.container}>
            <NavigationHeader title={_translate("workout")}/>
            {
              workouts.length === 0 ?
              <View style={[styles.container, { justifyContent: "center"}]}>
                {
                  isLoading ? 
                  <ActivityIndicator size='large' color={Colors.primaryColor}  /> 
                  :
                  <Pressable onPress={() => navigate('CreateWorkout')}>
                    <Image source={images.addWorkout} style={{ width: wp('50%'), height: wp('50%'), resizeMode:"contain" }} />
                  </Pressable>
                }
              </View>
              :
              <FlatList
                data={workouts}
                renderItem={({item, index}) => (
                  <WorkoutCard {...item} onPress={onPressItem} />
                )}
                keyExtractor={(item, i) => item._id}
                style={{ width: '100%', height: '100%', padding: 5 }}
                ListFooterComponent={<View style={{ height: 50 }} />}
                />  
            }
            {
              workouts.length !=0 &&
              <FAB
                color={Colors.primaryColor} size="large" placement="right" 
                icon={{ name: 'add', color: 'white', size: 24  }}
                onPress={() => { navigate('CreateWorkout') }}
                visible
                buttonStyle={{ borderRadius: 100 }}
                />
            }
          </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
  },
})
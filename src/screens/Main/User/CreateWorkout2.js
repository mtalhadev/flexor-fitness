import { Picker } from '@react-native-picker/picker';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Pressable, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { showAlert } from 'react-native-customisable-alert';
import { Icon, Image, SearchBar } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import images from '../../../assets/images';
import ExerciseCard from '../../../components/ExerciseCard';
import ImageUpload from '../../../components/ImageUpload';
import MulishText from '../../../components/MulishText';
import NavigationHeader from '../../../components/NavigationHeader';
import PoppinsText from '../../../components/PoppinsText';
import PrimaryButton from '../../../components/PrimaryButton';
import Row from '../../../components/Row';
import StyledInput from '../../../components/StyledInput';
import StyledSearchBar from '../../../components/StyledSearchBar';
import WorkoutCard from '../../../components/WorkoutCard';
import CommonStyles from '../../../constants/CommonStyles';
import { hp, wp } from '../../../constants/Constants';
import { navigate } from '../../../navigations/NavigationService';
import { createWorkout, fetchExercises, searchExercise } from '../../../redux/actions/ClientActions';
import { useExercises, useIsLoading } from '../../../redux/reducers/ClientReducer';
import ApiErrorHandler from '../../../services/ApiErrorHandler';
import { useDispatchEffect } from '../../../utilities/hooks';
import { _translate } from '../../../localization';

const inputRef = {
  shortDesc: React.createRef(),
  instructions: React.createRef(),
}; 

export default function CreateWorkout2({ route }) {
  
  const selectedExercises = route?.params?.selectedExercises; 
  console.log('selectedExercises: ', JSON.stringify(selectedExercises));
  const [workout, setWorkout] = useState({
    title: "",
    instructions: "",
    image: null,
    highlight: "",
    date: new Date().toISOString(),
    exercises: Object.values(selectedExercises || {}),
    duration: {
        value: 0,
        typeDuration: "week"
    }
  });
  const [showImagePicker, setShowImagePicker] = useState(false);

  const isLoading = useIsLoading()
  const dispatch = useDispatch()

  const onCreate = () => {
    dispatch(createWorkout(workout))
    .then(unwrapResult)
    .then((originalPromiseResult) => {
      const exercises = originalPromiseResult; 
      if(exercises)
        navigate('AddWorkout')
    })
    .catch(ApiErrorHandler)
  }
  
  const onSubmitValue = (key, value) => {
    console.log({ [key]: value });
    setWorkout({
      ...workout,
      [key]: value
    })
  }
    return (
          <View style={styles.container}>
          <NavigationHeader title={_translate("createWorkout")} backArrow />

          <ScrollView
            contentContainerStyle={{
              width: wp('100%'),
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: hp('4%'),
            }}
            showsVerticalScrollIndicator={false}>
            
            <StyledInput
              containerStyle={CommonStyles.input}
              placeholder={'Title'}
              returnKeyType='next'
              onEndEditing={(text) => onSubmitValue('title', text)}
              onSubmitEditing={() => inputRef.shortDesc.current.focus()}
              />
            <StyledInput
              ref={inputRef.shortDesc}
              containerStyle={CommonStyles.input}
              placeholder={_translate("shortDescription")}
              returnKeyType='next'
              onEndEditing={(text) => onSubmitValue('highlight', text)}
              onSubmitEditing={() => inputRef.instructions.current.focus()}
              />
            <StyledInput
              ref={inputRef.instructions}
              containerStyle={{ ...CommonStyles.input, height: 200 }}
              inputContainerStyle={{ height: 200 }}
              placeholder={_translate("instructions")}
              returnKeyType='next'
              multiline={true}
              maxLength={500}
              onEndEditing={(text) => onSubmitValue('instructions', text)}
              onSubmitEditing={() => {}}
              />
            
            <Row style={{ width: wp('85%'), height: 80, justifyContent: 'space-between', alignItems: 'center' }} >
              <StyledInput
                ref={inputRef.instructions}
                containerStyle={{ ...CommonStyles.input, width: wp('48%'), height: 70, }}
                inputContainerStyle={{ height: 55 }}
                placeholder={_translate("duration")}
                returnKeyType='next'
                multiline={true}
                maxLength={500}
                onEndEditing={(text) => onSubmitValue('duration', { value: text, typeDuration: workout.duration.typeDuration })}
                onSubmitEditing={() => {}}
                />
              <Picker
                prompt={_translate("selectUnit")}
                selectedValue={workout.duration.typeDuration}
                onValueChange={(itemValue, itemIndex) => {
                  onSubmitValue('duration', { value: workout.duration.value, typeDuration: itemValue })
                }}
                dropdownIconColor='#AFAFAF'
                mode='dropdown'
                style={{ width: wp('35%'), height: 50, }}
                >
                <Picker.Item label="Day" value="day" fontFamily="Mulish-Regular" />
                <Picker.Item label="Week" value="week" fontFamily="Mulish-Regular"/>
                <Picker.Item label="Month" value="month" fontFamily="Mulish-Regular"/>
                <Picker.Item label="Year" value="year" fontFamily="Mulish-Regular"/>
              </Picker>                
            </Row>

            { 
            workout.image !== null ? 
            <Image source={{ uri: workout.image }} style={{ width: wp('80%'), height: 300, resizeMode: 'contain', borderRadius: 15 }} />
            :
            <Icon name='add-a-photo' type='materialicon' color='grey' size={80} containerStyle={{ width: wp('80%'), height: 300, backgroundColor: '#F0F2F6', justifyContent: 'center', borderRadius: 15 }}
              onPress={() => setShowImagePicker(true)}
            />
            }

            <PrimaryButton
              title={_translate("create")}
              buttonStyle={{ width: wp('80%'), height: 56, borderRadius: 10, marginBottom: hp('1%'), marginTop: 20  }}
              onPress={onCreate}
              loading={isLoading}
              />

            </ScrollView>
            
            <ImageUpload
              showPicker={showImagePicker}
              closePicker={() => setShowImagePicker(false)}
              onUpload={(uri) => onSubmitValue('image', uri)}
            />

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
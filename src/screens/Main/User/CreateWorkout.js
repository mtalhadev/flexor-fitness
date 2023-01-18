import { unwrapResult } from '@reduxjs/toolkit';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { showAlert } from 'react-native-customisable-alert';
import { FAB } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import ExerciseCard from '../../../components/ExerciseCard';
import MulishText from '../../../components/MulishText';
import MyBottomSheet from '../../../components/MyBottomSheet';
import NavigationHeader from '../../../components/NavigationHeader';
import PrimaryButton from '../../../components/PrimaryButton';
import Row from '../../../components/Row';
import SecondaryButton from '../../../components/SecondaryButton';
import StyledInput from '../../../components/StyledInput';
import StyledSearchBar from '../../../components/StyledSearchBar';
import Colors from '../../../constants/Colors';
import { WEEDAYNAMES, wp } from '../../../constants/Constants';
import { navigate } from '../../../navigations/NavigationService';
import { fetchExercises, searchExercise } from '../../../redux/actions/ClientActions';
import { useExercises, useIsLoading } from '../../../redux/reducers/ClientReducer';
import { useDispatchEffect } from '../../../utilities/hooks';
import { _translate } from '../../../localization';
export default function CreateWorkout() {
  
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState({});
  const [picker, setPicker] = useState({
    visible: false,
    exercise: {
      exercise: null,
      days: new Map(),
      rep: 0,
      set: 0
    }
  });

  const exercises = useExercises(); 

  const isLoading = useIsLoading()
  useDispatchEffect(fetchExercises, null, exercises.length == 0);

  useEffect(() => {
    if(!isLoading) setLoading(false)
  }, [isLoading]);

  const dispatch = useDispatch()

  const onSearch = (text) => {
    if(text.length <= 2) 
      return;
    if(loading) return;
    setLoading(true)
    dispatch(searchExercise(text))
    .then(unwrapResult)
    .then((originalPromiseResult) => {
      const exercises = originalPromiseResult; 
      if(exercises?.length)
        setFiltered(exercises)
      setLoading(false)
    })
    .catch((rejectedValue) => {
      console.log('rejectedValue: ', rejectedValue)
      setLoading(false)
      showAlert({
        title: 'Error',
        message: rejectedValue,
        alertType: 'error'
      })
    })
  }
  const onSearchClear = () => {
    setFiltered([])
  }
  
  const openBottomSheet = useCallback(
    (id) => {
      setPicker({ 
        visible: true , 
        exercise: {
          exercise: id,
          days: new Map(),
          rep: 0,
          set: 0
        }
      })
    },
    [],
  );
  const closeBottomSheet = useCallback(
    () => {
      setPicker({ 
        visible: false , 
        exercise: {
          exercise: null,
          days: new Map(),
          rep: 0,
          set: 0
        }
      })
    },
    [],
  );
  const onSelectExercise = (id) => {
    if(selectedExercises[id]) {
      onRemoveExercise(id)
    } else {
      openBottomSheet(id)
    }
  } 
  const onAddExercise = (id) => {
      closeBottomSheet();
      const {exercise} = picker; 
      const newSelected = { ...selectedExercises, 
        [id]: { ...exercise, 
          days: [...exercise.days.keys()].map(day => WEEDAYNAMES.indexOf(day))
      } }; 
      setSelectedExercises(newSelected);
  }
  const onRemoveExercise = (id) => {
    let newSelected = {...selectedExercises};
    delete newSelected[id];
    setSelectedExercises(newSelected);
  }

  const onSubmitValue = useCallback(
    (key, value) => {
      const { visible, exercise } = picker; 
      setPicker({
        visible,
        exercise: {
          ...exercise,
          [key]: value
        }
      })
    },
    [picker],
  );

  const onNext = () => {
    if(Object.values(selectedExercises).length == 0)
      alert(`${_translate("noExerciseSelected")}`);
    else 
      navigate('CreateWorkout2', { selectedExercises });
  }
  
  console.log({ selectedExercises });


    return (
          <View style={styles.container}>
              <NavigationHeader title={_translate("createWorkout")} backArrow />

              <StyledSearchBar
                placeholder={_translate("searchExercise")}
                containerStyle={{ marginBottom: 10}}
                autoFocus={false}
                onChangeText={onSearch}
                onCancel={onSearchClear}
                onClear={onSearchClear}    
              />

              <MulishText fontSize={14} color="#1E2022" style={styles.heading} >
                {_translate("clickPlusToAddExeesrcis")}
              </MulishText>

              {
                (isLoading || loading) ? 
                <ActivityIndicator size='large' color={Colors.primaryColor} style={{ marginHorizontal: wp('40%')}} />
                :
                <FlatList
                data={filtered.length ? filtered : exercises}
                extraData={selectedExercises}
                renderItem={({item, index}) => (
                  <ExerciseCard {...item} selected={!!selectedExercises[item._id]} onSelect={onSelectExercise}/>
                )}
                keyExtractor={(item, i) => item._id}
                style={{ width: '100%', padding: 5 }}
                contentContainerStyle={{ alignItems: 'center' }}
                />  

              }

              <FAB
                color={Colors.primaryColor} size="large" placement="right" 
                icon={{ name: "arrow-forward-ios", type: "material", color: "#FFF", size:22 }}
                buttonStyle={{ borderRadius: 100 }}
                onPress={onNext}/>

              <MyBottomSheet isVisible={picker.visible} >
                <Row style={{ width: wp('85%'), height: 56, justifyContent: 'space-between', alignItems: 'center',}}>
                  <MulishText bold fontSize={20} color={"rgba(0,0,0,.55)"} style={{ marginTop: 24 }}>{_translate("SETS")}</MulishText>
                  <Input value={`${picker.exercise.set || ''}`} onSubmit={(text) => onSubmitValue('set', Number(text))}/>
                  <MulishText bold fontSize={20} color={"rgba(0,0,0,.55)"} style={{ marginTop: 24 }}>{_translate("REPS")}</MulishText>
                  <Input value={`${picker.exercise.rep || ''}`} onSubmit={(text) => onSubmitValue('rep', Number(text))} />
                </Row>  
                <Row style={{ width: wp('85%'), height: 80, justifyContent: 'space-between', alignItems: 'center',}}>
                  <MulishText bold fontSize={20} color={"rgba(0,0,0,.55)"} style={{ width: wp('20%') }}>{_translate("DAYS")}</MulishText>
                  {
                    WEEDAYNAMES.map(weekday => (
                      <Toggle 
                        item={weekday} 
                        selected={!!picker.exercise.days.get(weekday)} 
                        onSelect={(day) => {
                            const { days } = picker.exercise; 
                            days.has(day) ? days.delete(day) : days.set(day, true)
                            onSubmitValue('days', days)
                        }}
                        key={weekday}
                      />
                    ))
                  }
                </Row>
                <Row style={{ width: wp('85%'), height: 56, }}>
                  <PrimaryButton
                      title={_translate("addExercise")}
                      buttonStyle={{ width: wp('50%'), height: 40, borderRadius: 30, paddingVertical: 0 }}
                      titleStyle = {{ color: '#FFF', fontSize: 13 }}
                      onPress={() => onAddExercise(picker.exercise.exercise)}
                      />
                  <SecondaryButton
                      title = {_translate("cancel")}
                      containerStyle = {{ width: wp('32%')  }}
                      buttonStyle = {{ height: 40, borderRadius: 40, paddingVertical: 0 }}
                      titleStyle = {{ color: '#333', fontSize: 13 }}
                      onPress = {closeBottomSheet} 
                      />

                </Row>

              </MyBottomSheet>
          </View>
    )
}

const Input = ({ value, onSubmit }) => { 
  return (
   <StyledInput
   containerStyle={{ width: 107, height: 45, marginTop: 20}}
   inputContainerStyle={{ height: 45, justifyContent: 'center', alignItems: 'center',}}
   inputStyle={{ fontSize: 20, fontFamily: 'Mulish-Bold', textAlign: 'center'}}
   placeholder={""}
   keyboardType='number-pad'
   returnKeyType='done'
   onSubmitEditing={() => { }}     
   value={value}
   onEndEditing={onSubmit}
   />
  )
}

const Toggle = ({ selected, onSelect, item }) => {
  const itemName = item.slice(0,1); 
  return (
    <TouchableWithoutFeedback onPress={() => { onSelect(item) }}>
      <View style={selected ? styles.toggleSelected : styles.toggle}>
        <MulishText fontSize={14} color={selected ? '#FFF':'#000'} style={{ textAlign: "center"}}>{ itemName }</MulishText>
      </View>
  </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
  },
  heading: {
    marginVertical: 10
  },
  toggle: {
    width: wp('65%')/8,
    height: wp('65%')/8,
    borderRadius: wp('65%')/8,
    backgroundColor: 'rgba(240,242,246,0.76)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleSelected: {
    width: wp('65%')/8,
    height: wp('65%')/8,
    borderRadius: wp('65%')/8,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  }

})
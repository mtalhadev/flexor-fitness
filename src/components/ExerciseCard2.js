/* eslint-disable react-native/no-raw-text */
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Icon, ListItem } from 'react-native-elements';
import Colors from '../constants/Colors';
import { wp } from '../constants/Constants';
import { fetchExercises } from '../redux/actions/ClientActions';
import { useDispatchEffect } from '../utilities/hooks';
import MulishText from './MulishText';


export default function ExerciseCard2({ _id, title, rep, set, completed, onPress }) {
  
  const sets = set && `${set} Sets`; 
  const reps = rep && `${rep} Reps`; 

    return (
      <ListItem 
        containerStyle={{ backgroundColor: '#FFF', padding: 0, width: '100%', height: 80, marginVertical: 5, alignItems: 'center',}}
        onPress={() => onPress(_id)} 
        Component={TouchableOpacity}
        >
        <Icon name={completed ? 'check' : 'circle'} type='font-awesome' color={'#FFF'} size={20} containerStyle={styles.iconContainer}/>
        <ListItem.Content style={{ paddingLeft: 5}}>
            <ListItem.Title>
                <MulishText semiBold fontSize={14} color="#1E2022">{title}</MulishText>
            </ListItem.Title>
            <ListItem.Subtitle>
                <MulishText fontSize={10} color="#1E2022">{[sets, reps].join(' | ')}</MulishText>
            </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron containerStyle={styles.chevron} iconProps={{ color: Colors.primaryColor, size: 24,}} />
      </ListItem>    
        )
}


const styles = StyleSheet.create({
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
    borderWidth: 1,
    borderColor: Colors.primaryColor,
  },
})
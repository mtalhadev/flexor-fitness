import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Avatar, Chip, Image, ListItem } from 'react-native-elements';
import images from '../assets/images';
import { navigate } from '../navigations/NavigationService';
import MulishText from './MulishText';
import PoppinsText from './PoppinsText';
import PrimaryButton from './PrimaryButton';

export default function TrainingLessonCard({ title, fee }) {
  
    return (
          <View style={styles.container}>
              <View style={{ width: 100 , height: 150, justifyContent: "space-around", marginLeft: 16}}>
                 <PoppinsText semiBold fontSize={18} color={"#2E2A2A"}>
                     {title}
                 </PoppinsText>
                 <PoppinsText semiBold fontSize={11} color={"#000"}>
                     {`${fee}/month`}
                 </PoppinsText>
                 <PrimaryButton 
                  title={'Join'}
                  buttonStyle={{ width: 80, height: 33, borderRadius: 62, padding: 0}}
                  titleStyle={{ fontSize: 12, }}
                  onPress={() => { navigate('BookTrainingClass') }}
                  />

              </View>
              <View style={{ height: 180, justifyContent: 'flex-end',}}>
                <Image source={images.dailyFitness} style={styles.image} />
              </View>
          </View>
    )
}
const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 180,
    backgroundColor: 'rgba(210,133,54,.29)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    margin:10
  },
  image: {
      width: 83, height: 160,
      resizeMode: "cover",
      borderTopLeftRadius: 12,
      borderBottomRightRadius: 12
  },
  chip: {
    backgroundColor: "#FFF",
    width: 130,
    height: 33,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    paddingTop: 3,
    marginTop: 1,
    marginBottom: 8
  },
})
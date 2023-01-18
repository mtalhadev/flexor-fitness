import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Image, ListItem } from 'react-native-elements';
import images from '../../../assets/images';
import MulishText from '../../../components/MulishText';
import NavigationHeader from '../../../components/NavigationHeader';
import PoppinsText from '../../../components/PoppinsText';
import PrimaryButton from '../../../components/PrimaryButton';
import RNCalendar from '../../../components/RNCalendar';
import RobotoText from '../../../components/RobotoText';
import Row from '../../../components/Row';
import StyledInput from '../../../components/StyledInput';
import Colors from '../../../constants/Colors';
import CommonStyles from '../../../constants/CommonStyles';
import { wp } from '../../../constants/Constants';
import { _translate } from '../../../localization';

const EXERCISES = [
  {  title: "1st Set",  completed: true },
  {  title: "2nd Set",  completed: false },
  {  title: "3rd Set",  completed: false },
  {  title: "4th Set",  completed: false },
  {  title: "5th Set",  completed: false },

]; 

export default function ExerciseDetails2() {
  
    return (
      <View style={styles.container}>
          <NavigationHeader title={_translate("capleRopeTricepExtension")} backArrow={true} showRightMenu={false} />   
          
          <Counter value={5} />

          <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center',}} showsVerticalScrollIndicator={false}>

          <Image source={images.drawerHeaderBkgd} style={{ width: wp('100%'), height: 180, resizeMode: 'cover', marginTop: 20 }} />

          <FlatList
            data={EXERCISES}
            renderItem={({item, index}) => (
              <ExerciseCard {...item} />
            )}
            keyExtractor={(item, i) => item.title}
            style={{ width: '100%', padding: 5, marginTop: 10,  }}
            contentContainerStyle={{ alignItems: 'center',}}
            />  
</ScrollView>
      </View>
    )
}

const Counter = ({ value }) => {
  return (
    <Row style={{ width: 120, height: 25, justifyContent: 'space-between', alignItems: 'center',}}>
      <Icon name={'minus'} type='feather' color={Colors.primaryColor} size={20} />
      <MulishText bold fontSize={18} color={'#000'}>{`${value} ${_translate("sets")}`}</MulishText>
      <Icon name={'plus'} type='feather' color={Colors.primaryColor} size={20} />
    </Row>

  )

}

const Clock = () => { 
   return (
     <Row style={{ width: wp('85%'), height: 100, justifyContent: 'space-between', alignItems: 'center',}}>
       <RobotoText fontSize={12} color='#1E2022' style={{ textAlign: 'center'}}>{`Start Time\n00:00`}</RobotoText>
       <Row style={{ width: 187, height: 42, justifyContent: 'space-around', alignItems: 'center', borderWidth: 1, borderColor: '#000', borderRadius: 10, paddingHorizontal: 10,}}> 
         <PoppinsText bold fontSize={21} color={'#000'}>{`06`}</PoppinsText>
         <PoppinsText bold fontSize={12} color={'#000'}>{`min`}</PoppinsText>
         <PoppinsText bold fontSize={21} color={'#000'}>{`13`}</PoppinsText>
         <PoppinsText bold fontSize={12} color={'#000'}>{`sec`}</PoppinsText>
       </Row>
       <RobotoText fontSize={12} color='#1E2022' style={{ textAlign: 'center'}}>{`End Time\n06:00`}</RobotoText>
     </Row>
   )
}
const ExerciseCard = ({ title, completed }) => (
  <View style={{ width: wp('85%'), height: 200 }}>
    <ListItem containerStyle={{ backgroundColor: '#FFF', padding: 0, width: wp('90%')-20, height: 55, marginHorizontal: 10, marginVertical: 5}}>
    <Icon name={completed ? 'check' : 'circle'} type='font-awesome' color={'#FFF'} size={20} containerStyle={styles.iconContainer}/>
    <ListItem.Content style={{ paddingLeft: 5}}>
        <ListItem.Title>
            <MulishText bold fontSize={20} color="#1E2022">{title}</MulishText>
        </ListItem.Title>
    </ListItem.Content>
    </ListItem>  
    <Row style={{ width: wp('85%'), height: 56, justifyContent: 'space-between', alignItems: 'center',}}>
      <MulishText bold fontSize={26} color={"rgba(0,0,0,.55)"} style={{ lineHeight: 58}}>{_translate("REPS")}</MulishText>
      <Input value={""} />
      <MulishText bold fontSize={26} color={"rgba(0,0,0,.55)"} style={{ lineHeight: 58}}>{_translate("KG")}</MulishText>
      <Input value={""} />
    </Row>  
    <PrimaryButton
      title={_translate("finish")}
      titleStyle={{ fontSize: 14}}
      buttonStyle={{ width: 83, height: 35, borderRadius: 35, marginTop: 25, padding: 0}}
      containerStyle={{ width: '100%', alignItems: 'center', height: 60, justifyContent: 'center',}}
      onPress={() => {}}
      />

  </View>

)

const Input = ({ value }) => { 
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
    // onEndEditing={_onEndEditing}
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

})
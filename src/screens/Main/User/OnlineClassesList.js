import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Divider, Icon, ListItem, SearchBar } from 'react-native-elements';
import images from '../../../assets/images';
import MulishText from '../../../components/MulishText';
import NavigationHeader from '../../../components/NavigationHeader';
import OnlineClassCard from '../../../components/OnlineClassCard';
import StyledSearchBar from '../../../components/StyledSearchBar';
import Colors from '../../../constants/Colors';
import { wp } from '../../../constants/Constants';
import { _translate } from '../../../localization';

const TRAINERS = [
  { image: images.trainer1 },
  { image: images.trainer2 },
  { image: images.trainer3 },
]; 
const TRAINERS_LIST = [
  { image: images.jane, name: "Yoga Experts", skill: "Strength Training", rating: 4, reviews: 43 },
  { image: images.brooklyn, name: "Do Yoga", skill: "Strength Training", rating: 3, reviews: 56 },
  { image: images.wade, name: "Six Pack Makers", skill: "Strength Training", rating: 3.5, reviews: 67 },

]; 
export default function OnlineClassesList() {
  
    return (
      <View style={styles.container}>
          <NavigationHeader title={_translate("onlineClasses")} backArrow={true} showRightMenu={true} />
          <StyledSearchBar
            placeholder={_translate("Search")+"..."}
            containerStyle={{ marginBottom: 10 }}
          />

          <ListItem containerStyle={{ width: wp('100%'), backgroundColor: 'transparent'}}>
            <Icon name="filter" type={'feather'} color="#000" size={26} iconStyle={{ width: 26}}/>
             <ListItem.Content>
              <ListItem.Title><MulishText semiBold color="#1E2022" fontSize={14}>{_translate("filterClasses")}</MulishText></ListItem.Title>
             </ListItem.Content>
          </ListItem>
          
            <FlatList
              ListHeaderComponent={() => (
                <MulishText bold fontSize={17} color="#1E2022" style={styles.heading} >{_translate("recommendedClasses")}</MulishText>
              )}
              data={TRAINERS_LIST}
              renderItem={({item, index}) => (
                <OnlineClassCard {...item} />
              )}
              keyExtractor={(item, i) => item.name}
              style={{ width: '100%', padding: 10 }}
              ListFooterComponent={() => (
                <View style={{ height: 80 }} />
              )}
              />  
      </View>
    )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background
  },
  scrollView: {
     height: 60,
     paddingLeft: 20,
     marginTop: 15,
     marginBottom: 10
  },
  heading: {
     marginLeft: 22
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
  }
})
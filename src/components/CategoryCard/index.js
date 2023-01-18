import React from 'react'
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import Colors from '../../constants/Colors'
import { wp } from '../../constants/Constants'
import PoppinsText from '../PoppinsText'

const CategoryCard = ({
        selected,
        item,
        onPress,
        style = {}
    }) => (
    <TouchableOpacity 
      disabled={!onPress} 
      activeOpacity={.9}  
      style = {
          [styles.card, {
              backgroundColor: selected ? Colors.primaryColor : Colors.white,
          }, style]
      }
      onPress = {onPress}>
        <Image 
            source ={{uri: item.image}} 
            style={{width: "100%", height: 80, borderRadius: 10}} 
            />
        <View style={{marginHorizontal: 5, marginTop: 5}}>
            <PoppinsText 
            semiBold 
            fontSize={wp('3.5%')} 
            color = {
                selected ? Colors.white : Colors.text
            }
            textProps={{
                ellipsizeMode: 'tail',
                numberOfLines: 1   
            }}
            >
                {item.title}
            </PoppinsText>
        </View>
    </TouchableOpacity>
  )

export default CategoryCard


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    catContainer: {
        marginHorizontal: 10,
        flex: 1
    },
    card: {
        height: 130,
        flex: 1,
        margin: 10,
        backgroundColor: Colors.primaryColor,
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    }
})
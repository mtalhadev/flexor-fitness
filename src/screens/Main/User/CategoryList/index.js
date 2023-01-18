import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import NavigationHeader from '../../../../components/NavigationHeader'
import Colors from '../../../../constants/Colors'

import { useDispatch } from 'react-redux'
import CategoryCard from '../../../../components/CategoryCard'
import PrimaryButton from '../../../../components/PrimaryButton'
import { _translate } from '../../../../localization'
import { goBack } from '../../../../navigations/NavigationService'
import { setSearchCategory, useProgramCategories, useSearchCategory } from '../../../../redux/reducers/ClientReducer'


export default function CategoryList() {
  const dispatch = useDispatch();
  const categories = useProgramCategories();
  const searchCategories = useSearchCategory();

  const onSelectHandler = (id) => {
    if(searchCategories.includes(id)){
      const filter = searchCategories.filter(item => item != id)
      dispatch(setSearchCategory(filter));
    }else{
      dispatch(setSearchCategory([ ...searchCategories, id ]));
    }
  }

  return (
    <View style={styles.container}>
        <NavigationHeader title={_translate("categories")} backArrow={true}/>
        {
          categories === false?
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator color={Colors.primaryColor} />
          </View>
          :
          <>
          <View style={styles.catContainer}>
              <FlatList
                  data = {categories}
                  extraData={searchCategories}
                  renderItem = {({item})=>(
                      <CategoryCard
                          item = {item}
                          onPress = {()=>onSelectHandler(item._id)}
                          selected = {searchCategories.includes(item._id)}
                      />
                  )}
                  keyExtractor = {item => `${item._id}`}
                  numColumns = {2}
              />
          </View>
          <PrimaryButton 
              buttonStyle={{  height: 40, borderRadius: 10, margin: 20 }}
              title={_translate("save")}  
              onPress= {()=>{
                  goBack()
              }}
          />
          </>
        }
    </View>
  )
}

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
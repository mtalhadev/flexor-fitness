import React, { useState,  } from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, FlatList , TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {   Divider, Icon, ListItem } from 'react-native-elements';
import Colors from '../constants/Colors';
import ReactNativeModal from 'react-native-modal';
import MulishText from './MulishText';
import StyledInput from './StyledInput';
import { hp, wp } from '../constants/Constants';
import Row from './Row';
import { _translate } from "../localization"

const ITEM_HEIGHT = 17; 

const ListModal = ({ 
  isModalVisible,
    title,
    items,
    popularItems,
    selectedItems,
    isMultiple,
    onSelectItems,
    closeModal
}) => {
  
  // const { state: modal, closeModal } = AppContext.useDropdown(); 
  // const {   
  //   isModalVisible,
  //   title,
  //   items,
  //   selectedItems,
  //   isMultiple,
  //   onSelectItems
  // } = modal; 

    const [itemsSelected, setItemsSelected] = useState(selectedItems);

    const [search, setSearch] = useState({  
        text: '', filteredData: []
    });
    let itemsObj = {}
    items.forEach(item => {itemsObj[item.name]=1});
    const itemNames = popularItems && popularItems.length ? popularItems.map(item=> item.name) : Object.keys(itemsObj); 
    

    const reduceList = (list, char, index) => { 
      let result = {};
       for (const key in list) {
         if(key[index]===char) result[key] = 1;
       }
      return result;
    }

    const onSearch = (searchTerm='') => {
      let result = itemsObj;
      let i=0;
      while (i<searchTerm.length) {
        result = reduceList(result, searchTerm[i], i);
        i++;
      }
        //console.log(result);
      if(searchTerm.length>=1)
        setSearch({ 
            text: searchTerm, 
            filteredData: Object.keys(result)
            //filteredData: items.filter(item => item.name.toUpperCase().indexOf(search.toUpperCase()) === 0 )
        });
    }

    const onSelectItem = (itemName) => { 
      const newSelected = isMultiple ?  new Map(itemsSelected) : new Map();
      if(isMultiple) { 
        if(newSelected.has(itemName) && newSelected.size>1) 
          newSelected.delete(itemName) 
        else 
          newSelected.set(itemName,true); 
      }
      else newSelected.set(itemName,true);
      setItemsSelected(newSelected);
      if(!isMultiple) {
        closeModal();
        setSearch({ text: '', filteredData: [] })
      }
      onSelectItems([ ...newSelected.keys() ]);
    }
    return (
        <ReactNativeModal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        backdropOpacity={0.9}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        animationInTiming={300}
        animationOutTiming={300}
        useNativeDriver>
          <View style={styles.listContainer}>
            <View style={styles.row}>
              <MulishText style={styles.titleStyle} bold>{ title }</MulishText>
              <TouchableWithoutFeedback onPress={() => closeModal()}>
              <View><MulishText style={styles.text} >{_translate("close")}</MulishText></View>
              </TouchableWithoutFeedback>
            </View>
            <StyledInput
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.inputView}
              inputStyle={styles.inputStyle}
              value=''
              placeholder={_translate("findMore")}
              onChangeText={onSearch}
              onFocus={() => {}}
              onEndEditing={(text) => {}}
              keyboardType='default'
              returnKeyType='done'
              onSubmitEditing={() => {}}
              />
            <FlatList
              data={(search.text.length && search.filteredData.length) ? search.filteredData : itemNames}
              extraData={itemsSelected}
              renderItem={({item, index}) => (
                <Item 
                    itemName={item}
                    value={item}
                    isSelected={!!itemsSelected.get(item)}
                    onSelect={(itemName) => onSelectItem(itemName)}
                />
              )}
              keyExtractor={(item, i) => `${item}`}
              style={styles.flatlistStyle}
              ItemSeparatorComponent={() => <Divider style={{ width: wp('80%') }} color={'#ddd'}/>}
              keyboardShouldPersistTaps='handled'
              getItemLayout={(data, index) => (
                {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
              )}
            
              />  
          </View>
      </ReactNativeModal>
    )
}
const Item = ({ itemName, value, isSelected, onSelect}) => { 
      return (
        <TouchableOpacity onPress={() => { onSelect(itemName) }}>
        <Row style={styles.itemContainerStyle}>
          {
            isSelected ? 
            <MulishText bold style={styles.itemTextStyle} color={Colors.primaryColor}>{value}</MulishText>
            :
            <MulishText style={styles.itemTextStyle} color={'#333'}>{value}</MulishText>
          }
          {
            isSelected &&
            <Icon
                name={'check'}
                type='material'
                size={20}
                color={Colors.primaryColor}
                containerStyle={{ width: 20, height: 20 }}
              />
          }

        </Row>
        </TouchableOpacity>
      ) 
}
const styles = StyleSheet.create({
  listContainer: {
    width: wp('90%'),
    height: hp('100%')-200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F7FB',
    marginHorizontal: 0, 
  },
  row: {
    flexDirection: 'row',
    height: 40, 
    width: wp('90%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingHorizontal:20,
    marginTop: 20
  },
  titleStyle: {
    fontSize: 20,
    color: '#000',
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
  inputContainer: {
    height: 35,
    width: wp('90%') - 10,
    marginTop: 20, marginBottom: 10,

  },
  inputView: {
    height: 35,
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    borderColor: '#999',
    borderWidth: 1,
    borderBottomWidth: 1
  },
  inputStyle: {
      fontSize: 14,
  },
  itemContainerStyle: { 
    width: wp('80%'),
    height: 30,
    backgroundColor: 'transparent',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 16
  },
  itemTextStyle: {
    fontSize: 14,
    marginLeft: 0,
    lineHeight: 22
  },
  itemSelectedStyle: {
    color: '#222',
    fontSize: 14,
    marginLeft: -8
  },
  flatlistStyle: {
    width: wp('80%'),
    minHeight: 50,
    backgroundColor: '#F6F7FB',
    paddingVertical: 5,
    marginBottom: 20, 
  }, 

})

export default ListModal;
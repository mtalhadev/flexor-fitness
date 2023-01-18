import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import PoppinsText from './PoppinsText';

export default function NavigationHeader({ title, backArrow, showRightMenu, rightComponent, statusBarColor=Colors.primaryColor, containerStyle }) {
  
    const navigation = useNavigation();
    const insets= useSafeAreaInsets()

    let leftComponent = <Icon name={'arrow-back-ios'} type="material" color={"#FFF"} size={20} containerStyle={styles.iconBack} onPress={() => navigation?.goBack()} Component={TouchableWithoutFeedback} />

    let _rightComponent;
    if(rightComponent)
        _rightComponent = rightComponent;
    else if(showRightMenu)
      _rightComponent =  <Icon name={'dots-vertical'} type="material-community"  color={"#000"} size={22} containerStyle={styles.iconBack} Component={TouchableWithoutFeedback}  />

    return (
        <Header 
            leftComponent={leftComponent} 
            centerComponent={<PoppinsText semiBold fontSize={19} color={"#FFF"} style={{lineHeight: 40}}>{title}</PoppinsText>} 
            rightComponent={_rightComponent}
            leftContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 5, flex: 0.4}}
            centerContainerStyle={{ justifyContent: 'center',   }}
            rightContainerStyle={{ flex: 0.4, justifyContent: 'center', alignItems: 'flex-start', marginRight: 5 }}
            containerStyle={{ height: 60 + insets.top, backgroundColor: 'transparent', alignItems: 'center', borderBottomWidth: 0, ...containerStyle }}
            statusBarProps={{ backgroundColor: statusBarColor, barStyle: 'light-content' }}
        />
    )
}


const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 55,
    resizeMode: 'contain',
    marginTop: 10
  },
  iconBack: {
     width: 32, height: 32,
     borderColor: '#FFF',
     borderRadius: 8,
     justifyContent: 'center',
     alignItems: 'center',
  },
  
})

import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Icon, Image, ListItem } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MulishText from '../../../components/MulishText';
import NavigationHeader from '../../../components/NavigationHeader';
import Row from '../../../components/Row';
import Colors from '../../../constants/Colors';
import { hp, rf, wp } from '../../../constants/Constants';
import { useProfile, useProgramDetails } from '../../../redux/reducers/ProfileReducer';
import { navigate } from '../../../navigations/NavigationService';
import { useDispatch } from 'react-redux';
import { setVideoDetails } from '../../../redux/reducers/ClientReducer';
import { _translate } from '../../../localization';

const Tab = createMaterialTopTabNavigator();

export default function MyProgramDetails() {

    const program = useProgramDetails()
    const {
        _id: programId,
        title,
        image,
        createdBy,
    } = program;

    return (
      <View style={styles.container}>

          <NavigationHeader title={title} backArrow={true} showRightMenu={false} />   

            <Image source={{ uri: image }} style={styles.image} />

            <Row style={{ width: wp('90%'), marginVertical: 10, justifyContent: 'flex-start', }}>
              <MulishText bold color="#000" fontSize={rf(2)} >{_translate("programBy")}</MulishText>
              <Avatar source={{ uri: createdBy?.image }} size={32} rounded containerStyle={{ marginHorizontal: wp('2%')}} />
              <MulishText semiBold color="#000" fontSize={rf(1.8)} >{ createdBy?.name }</MulishText>
            </Row>

            <Tab.Navigator
              initialLayout={{ width: wp('100%'), height: 200 }}
              style={{ width: wp('90%'), backgroundColor: '#FFF', }}
              tabBarOptions={{
                indicatorStyle: {  backgroundColor: Colors.primaryColor },
                tabStyle: { },
                style: { justifyContent: 'space-around', },
                showIcon: true,
              }}
              backBehavior='none'
            >
              <Tab.Screen name="About" component={About} />
              <Tab.Screen name="Videos" component={Videos} />
            </Tab.Navigator>

      </View>
    )
}

const About = () => {
  const program = useProgramDetails()
  const {
    description,
    daily,
    price,
  } = program;

  console.log({ program });
  return (
  <View style={{ flex: 1, alignItems: 'center', paddingTop: 20, backgroundColor: '#FFF', }}>

    <Row style={{ width: wp('90%'), marginVertical: 10 }}>
      <MulishText bold color="#000" fontSize={rf(2)} >{_translate("description")}</MulishText>
    </Row>

    <View style={{ width: wp('90%'), }}>
      <MulishText color="#000" fontSize={rf(1.6)} style={styles.text}>
      {description}
      </MulishText>
    </View>

    {/* <Row style={{ width: wp('90%'), marginVertical: 10 }}>
      <MulishText bold color="#000" fontSize={rf(2)} >{`Videos Completed`}</MulishText>
      <ProgressCircle
          percent={Number(price)}
          radius={16}
          borderWidth={4}
          color={Colors.primaryColor}
          shadowColor="#ddd"
          bgColor="#fff"
          outerCircleStyle={{ marginBottom: 10}}
      >
          <PoppinsText fontSize={7} color='#000' style={{ marginTop: 2 }}>
            {`${price}%`}
          </PoppinsText>
      </ProgressCircle>
    </Row> */}

  </View>
)}

const Videos = () => {
  const program = useProgramDetails();
  const dispatch = useDispatch()
  const onPressVideo = (video) => {
    dispatch(setVideoDetails(video));
    navigate('VideoPlayerScreen', { programId: program._id });
  }
  const publishedVids = program?.videos?.filter(vid => vid.published === true) || [];

  return  (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 10, backgroundColor: '#FFF', }}>
    <ScrollView contentContainerStyle={{ width: wp('90%'), alignItems: 'center', backgroundColor: "#FFF", paddingTop: 10 }} showsVerticalScrollIndicator={false}>
      {
        publishedVids?.length === 0 ? (
          <View style={styles.empty} >
            <MulishText color='#999'>{_translate("noVideos")}</MulishText>
          </View>
        ) :
        publishedVids.map(video => <VideoCard video={video} key={video._id} onPress={onPressVideo} />)
      }
    </ScrollView>
    </View>
  )
}

const VideoCard = ({ video, onPress }) => (
  <ListItem
    containerStyle={{ backgroundColor: '#FFF', padding: 0, width: '100%', marginVertical: 8, alignItems: 'center', padding: 20, borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 12}}
    onPress={() => onPress(video)} 
    Component={TouchableOpacity}
    >
              
    <Icon name={'video-camera'} type='font-awesome' color={'#77838F'} size={24} containerStyle={styles.iconContainer}/>

    <ListItem.Content style={{ paddingLeft: 5}}>
        <ListItem.Title>
            <MulishText bold fontSize={rf(2)} color="#1E2022">{video.title}</MulishText>
        </ListItem.Title>
    </ListItem.Content>
    <ListItem.Chevron iconProps={{ color: '#77838F', size: 30,  }} />
  </ListItem>    
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
  image: {
      width: wp('90%'),
      height: wp('50%'),
      resizeMode: 'cover',
      borderTopLeftRadius: 12,
      borderBottomRightRadius: 12,
  },
  heading: {
     marginVertical: 15
  },
  text: {
    textAlign:'justify',
    lineHeight: 18
  },
  circle: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    
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
  videoCard: {
    width: wp('85%'),
    height: 300,
    backgroundColor: '#FFF',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 12,
    marginVertical: 10,
    elevation: 8
  },
  videoPlayer: {
    backgroundColor: '#000',
    flex: 0,
    width: '100%',
    height: 250,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  caption: {
    height: 50,
    justifyContent: 'center',
  },
  title: {
     marginHorizontal: wp('5%'),
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
  empty: {
    flex: 1,
    height: hp('50%'),
    alignItems: "center",
    justifyContent: "center",
  }

})
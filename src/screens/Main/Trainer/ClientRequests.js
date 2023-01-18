import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import images from '../../../assets/images';
import ClientRequestCard from '../../../components/ClientRequestCard';
import MulishText from '../../../components/MulishText';
import NavigationHeader from '../../../components/NavigationHeader';
import PrimaryButton from '../../../components/PrimaryButton';
import Colors from '../../../constants/Colors';
import { wp } from '../../../constants/Constants';
import { useRequests, useIsLoading } from '../../../redux/reducers/TrainerReducer';
import { _translate } from "../../../localization";

const CLIENTS = [
  { id: 1, name: "Devon Lane", className: " Booked Hot yoga class", timing: "Mon, 12:00 PM", image: images.user1 },
  { id: 2, name: "Eleanor Pena", className: "Booked Online training", timing: "Tue, 12:00 PM", image: images.user2 },
  { id: 3, name: "Ronald Richards", className: "Booked personal training", timing: "Thu, 12:00 PM", image: images.user3 },
  { id: 4, name: "Brooklyn Simmons", className: "Booked Online training", timing: "Fri, 12:00 PM", image: images.user4 },
]; 

export default function ClientRequests({ navigation }) {

  const requests = useRequests(); 
  const isLoading = useIsLoading(); 

    return (
          <View style={styles.container}>
          <NavigationHeader  title={_translate("clientRequests")}  backArrow={true} />

          {
            isLoading ? 
            <ActivityIndicator size='large' color={Colors.primaryColor} style={{ marginHorizontal: wp('40%')}} />
            :
            <FlatList
              ListHeaderComponent={() => (
                <MulishText color="rgba(0,0,0,.53)" fontSize={14} style={{ width: wp('90%'), lineHeight: 24, marginBottom: 20 }}>
                {_translate("acceptTheRequestsFromTheClients")}
                </MulishText>  
              )}
              data={requests}
              renderItem={({item, index}) => (
                <ClientRequestCard {...item}  />
              )}
              keyExtractor={(item, i) => item.id}
              style={{ width: wp('100%'), height: '100%',  }}
              contentContainerStyle={{ alignItems: 'center', }}
              ListFooterComponent={() => (
                <PrimaryButton
                title={_translate("sendAddingRequest")}
                buttonStyle={{ width: wp('90%'), height: 56, borderRadius: 10, marginTop: 30, marginBottom: 30 }}
                onPress={() => {}}
                />
              )}

              />  
          }
            
                
          </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.background,
      },
    })
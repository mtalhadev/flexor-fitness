import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import MulishText from '../../../components/MulishText';
import NavigationHeader from '../../../components/NavigationHeader';
import PaymentCard from '../../../components/PaymentCard';
import Colors from '../../../constants/Colors';
import { hp, wp } from '../../../constants/Constants';
import { fetchPaymentHistory } from '../../../redux/actions/TrainerActions';
import { useIstrainer } from '../../../redux/reducers/AuthReducer';
import { useIsLoading, usePaymentHistory } from '../../../redux/reducers/TrainerReducer';
import { useDispatchEffect } from '../../../utilities/hooks';
import { _translate } from '../../../localization';

export default function PaymentHistory() {
    const payments = usePaymentHistory();
    const loading = useIsLoading();
    
    useDispatchEffect(fetchPaymentHistory, null, true);

    console.log('payments: ', payments);
    
    return (
          <View style={styles.container}>
          <NavigationHeader 
            title={_translate("Payments")} 
            backArrow={true} 
            />

            <MulishText color="rgba(0,0,0,.53)" fontSize={14} style={{ width: wp('90%'), lineHeight: 24, marginVertical: 20, textAlign: 'center' }}>
            {_translate("followingAreThePaymentsThatYouChargedToYourClients")}
            </MulishText>

            {
            loading ? 
            <ActivityIndicator color={Colors.primaryColor} /> 
            :
            <FlatList
              data={payments}
              renderItem={({item, index}) => (
                <PaymentCard {...item}  />
              )}
              keyExtractor={(item, i) => item.id}
              style={{ width: '100%', padding: 5,  }}
              contentContainerStyle={{  alignItems: 'center',}}
              ListEmptyComponent={() => (
                <View style={styles.empty} >
                  <MulishText color='#999'>{_translate("noPaymentsYet")}</MulishText>
                </View>
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
      empty: {
        flex: 1,
        height: hp('50%'),
        alignItems: "center",
        justifyContent: "center",
      }
    
    })
// import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, View, Text } from 'react-native';
// import { showAlert } from 'react-native-customisable-alert';
import { Icon, ListItem, } from 'react-native-elements';
// import { useDispatch } from 'react-redux';
import MulishText from '../../../components/MulishText';
import NavigationHeader from '../../../components/NavigationHeader';
import StyledSearchBar from '../../../components/StyledSearchBar';
import TrainerProfileCard from '../../../components/TrainerProfileCard';
import Colors from '../../../constants/Colors';
import { wp } from '../../../constants/Constants';
import { _translate } from '../../../localization';
import ApiService from '../../../services/ApiService';

function TrainersList() {

  // const trainers = useTrainers();


  const [state, setState] = useState({
    loading: true,
    trainer: [],
    pgNum: 1,
    pageLoader: false,
    err: false,

  })
  const [searchFilter, onSearchFilter] = useState("");
  const [filtered, setFiltered] = useState([]);
  // const dispatch = useDispatch()


  useEffect(() => {
    if (searchFilter.length > 0) {
      filteredSearch()
    }
  }, [searchFilter])

  useEffect(() => {
    fetchTrainerList();
  }, [state.pgNum])



  const fetchTrainerList = async () => {
    try {
      let res = await ApiService.client.getAllTrainers(state.pgNum);
      if (res.data.trainers.length !== 0) {
        setState({ ...state, trainer: state.trainer.concat(res.data.trainers), loading: false, pageLoader: false })
      }
      else {
        setState({ ...state, err: true, pageLoader: false })
      }

    } catch (err) {
      console.log(err);
    }


  }


  // const onSearch = (text) => {
  //   if (text.length <= 2) return;
  //   if (state.loading) return;
  //   setState({ ...state, loading: true, err: true })
  //   // setLoading(true)
  //   dispatch(searchTrainers(text))
  //     .then(unwrapResult)
  //     .then((originalPromiseResult) => {
  //       const users = originalPromiseResult;
  //       console.log(users, "<------FILTERED TRAINER")
  //       if (users?.length)
  //         setFiltered(users)
  //       setState({ ...state, loading: false, err: true })
  //       // setLoading(false)
  //     })
  //     .catch((rejectedValue) => {
  //       console.log('rejectedValue: ', rejectedValue)
  //       setState({ ...state, loading: false, err: true })
  //       // setLoading(false)
  //       showAlert({
  //         title: 'Error',
  //         message: rejectedValue,
  //         alertType: 'error'
  //       })
  //     })
  // }
  // const onSearch = async (text) => {
  //   try {
  //     const res = await ApiService.client.searchTrainers(state.onSearchFilter);
  //     if (res.data.users.length > 0) {
  //       setState({ ...state, filtered: res.data.users })
  //     }

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }


  const filteredSearch = async () => {
    try {
      const res = await ApiService.client.searchTrainers(searchFilter);
      if (res.data.users) {
        setFiltered(res.data.users)
      }
      else {
        setFiltered([{ err: "No result Found" }])
        setState({ ...state, err: true, pageLoader: false })
      }

    } catch (err) {
      console.log(err);
    }
  }

  const onSearch = (text) => {
    onSearchFilter(text)
  }


  const onSearchClear = () => {
    setFiltered([])
    onSearchFilter("")
    
  }

  const pagehandler = () => {
    setState({ ...state, pgNum: state.pgNum + 1, pageLoader: true })
  }



  return (
    <View style={styles.container}>
      <NavigationHeader title={_translate("trainers")} backArrow={true} />

      <StyledSearchBar
        placeholder={_translate("search") + "..."}
        containerStyle={{ marginBottom: 10 }}
        autoFocus={true}
        onChangeText={onSearch}
        onCancel={onSearchClear}
        onClear={onSearchClear}
      />

      <ListItem containerStyle={{ width: wp('100%'), backgroundColor: 'transparent' }}>
        <Icon name="filter" type={'feather'} color="#000" size={18} containerStyle={{ width: 20, marginLeft: 10 }} />
        <ListItem.Content>
          <ListItem.Title><MulishText semiBold color="#1E2022" fontSize={14}>{_translate("filterTrainers")}</MulishText></ListItem.Title>
        </ListItem.Content>
      </ListItem>

      {
        state.loading ? <ActivityIndicator color={Colors.primaryColor} /> :
          <>
            <FlatList
              ListHeaderComponent={() => (
                <MulishText bold fontSize={17} color="#1E2022" style={styles.heading} >{_translate("nearbyPersonalTrainers")}</MulishText>
              )}
              data={filtered.length ? filtered : state?.trainer}
              renderItem={({ item, index }) => (
                <TrainerProfileCard {...item} />
              )}
              keyExtractor={(item, i) => item._id}
              style={{ width: '100%', height: '100%', padding: 10 }}
              ListFooterComponent={() => (
                <View style={{ height: 80 }}>
                  {state.err == true ? <MulishText style={{ textAlign: 'center' }}>No More Data</MulishText> : null}
                </View>
              )}
              onEndReached={() => { state.err == false && searchFilter.length == 0 ? pagehandler() : null }}
            />
            {state.pageLoader ? <ActivityIndicator color={Colors.primaryColor} /> : null}
          </>
      }
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

export default TrainersList
import React, { useState, useEffect } from "react";
import { Button, ScrollView, StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NavigationHeader from "../../../components/NavigationHeader";
import PoppinsText from "../../../components/PoppinsText";
import ProgramCard from "../../../components/ProgramCard";
import Row from "../../../components/Row";
import PrimaryButton from "../../../components/PrimaryButton";
import StyledSearchBar from "../../../components/StyledSearchBar";
import Colors from "../../../constants/Colors";
import { wp, rf } from "../../../constants/Constants";
import {
  setSearchText,
  useClasses,
  usePrograms,
  useSearchCategory,
  useSearchText,
} from "../../../redux/reducers/ClientReducer";
import { navigate } from "../../../navigations/NavigationService";
import { useDispatch } from "react-redux";
import { _translate } from "../../../localization";
import { useDispatchEffect } from "../../../utilities/hooks";
import { fetchProgramData, fetchHomeData } from "../../../redux/actions/ClientActions";
import { isEmpty } from "../../../services/AuthValidation";
const Tab = createMaterialTopTabNavigator();

const AVATAR_SIZE = wp("12%");




function AllPrograms() {
  const dispatch = useDispatch();
  
  const onSearch = (text) => { 
    dispatch(setSearchText(text))
  }

  return (
    <View style={styles.container}>
      <NavigationHeader title={_translate("allPrograms")} backArrow={true} />

      <ScrollView
        contentContainerStyle={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <StyledSearchBar
            placeholder={_translate("search") + "..."}
            containerStyle={{ width: wp("66%"), paddingRight: 15 }}
            onChangeText={onSearch}
          />
          <PrimaryButton
            buttonStyle={{
              width: wp("30%"),
              height: 45,
              borderRadius: 10,
              padding: 0,
            }}
            title={_translate("category")}
            titleStyle={{ fontSize: rf(2) }}
            onPress={() => {
              navigate("CategoryList");
            }}
          />
        </View>

        <Tab.Navigator
          initialLayout={{ width: wp("100%"), height: 500 }}
          style={{ width: wp("100%"), backgroundColor: "#FFF" }}
          tabBarOptions={{
            indicatorStyle: { backgroundColor: Colors.primaryColor },
            tabStyle: {},
            style: { justifyContent: "space-around" },
            showIcon: true,
          }}
          swipeEnabled={true}
          backBehavior="none"
        >
          <Tab.Screen name="Programs" component={Programs} />
          <Tab.Screen name="Classes" component={Classes} />
        </Tab.Navigator>
      </ScrollView>

    </View>
  );
}

const Programs = () => {
  const programs = usePrograms();
  const searchCategories = useSearchCategory();
  const searchText = useSearchText()

  const [page, setPage] = useState(1);

  useDispatchEffect(fetchProgramData, page, page);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
        backgroundColor: "#FFF",
      }}
    >
      <View style={{ width: wp("95%") }}>
        <Row style={{ width: wp("95%"), justifyContent: "space-between" }}>
          <PoppinsText
            semiBold
            fontSize={wp("5%")}
            color="#2E2A2A"
            style={styles.heading}
          >
            {_translate("recommendedForToday")}
          </PoppinsText>
        </Row>
        {programs?.length == 0 ? (
          <View style={{ height: wp("40%"), justifyContent: "center" }}>
            <ActivityIndicator color={Colors.primaryColor} size={30} />
          </View>
        ) : (
          <FlatList
            data={getFilteredData(programs, searchCategories, searchText)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
            onEndReached={() => {
              setPage(page+1);
            }}
            renderItem={({ item, i }) => (
              <ProgramCard {...item} key={item._id} />
            )
            }
          />
        )}
      </View>
      <View style={{ width: wp("95%") }}>
        <Row style={{ width: wp("95%"), justifyContent: "space-between" }}>
          <PoppinsText
            semiBold
            fontSize={wp("5%")}
            color="#2E2A2A"
            style={styles.heading}
          >
            {_translate("bestPurchasing")}
          </PoppinsText>
        </Row>
        {programs?.length == 0 ? (
          <View style={{ height: wp("40%"), justifyContent: "center" }}>
            <ActivityIndicator color={Colors.primaryColor} size={30} />
            {/* <PoppinsText fontSize={rf(2.5)} color="#999" style={styles.text}>
              {_translate("noProgramsFound")}
            </PoppinsText> */}
          </View>
        ) : (
          <FlatList
            data={getFilteredData(programs, searchCategories, searchText)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
            renderItem={({ item, i }) => (
              <ProgramCard {...item} key={item._id} />
            )
            }
          />
        )}
      </View>
    </View>
  );
};
const Classes = () => {
  const classes = useClasses();
  const searchCategories = useSearchCategory();
  const searchText = useSearchText()

  const [page, setPage] = useState(1);

  useDispatchEffect(fetchHomeData, page, page);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
        backgroundColor: "#FFF",
      }}
    >
      <View style={{ width: wp("95%") }}>
        <Row style={{ width: wp("95%"), justifyContent: "space-between" }}>
          <PoppinsText
            semiBold
            fontSize={wp("5%")}
            color="#2E2A2A"
            style={styles.heading}
          >
            {_translate("recommendedForToday")}
          </PoppinsText>
        </Row>
        {classes?.length == 0 ? (
          <View style={{ height: wp("40%"), justifyContent: "center" }}>
            <ActivityIndicator color={Colors.primaryColor} size={30} />
            {/* <PoppinsText fontSize={rf(2.5)} color="#999" style={styles.text}>
              {_translate("noProgramsFound")}
            </PoppinsText> */}
          </View>
        ) : (
          <FlatList
            data={getFilteredData(classes, searchCategories, searchText)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
            onEndReached={() => {
              setPage(page+1);
            }}
            renderItem={({ item, i }) => (
              <ProgramCard {...item} key={item._id} />
            )
            }
          />
        )}
      </View>
      <View style={{ width: wp("95%") }}>
        <Row style={{ width: wp("95%"), justifyContent: "space-between" }}>
          <PoppinsText
            semiBold
            fontSize={wp("5%")}
            color="#2E2A2A"
            style={styles.heading}
          >
            {_translate("bestPurchasing")}
          </PoppinsText>
        </Row>
        {classes?.length == 0 ? (
          <View style={{ height: wp("40%"), justifyContent: "center" }}>
            <ActivityIndicator color={Colors.primaryColor} size={30} />
            {/* <PoppinsText fontSize={rf(2.5)} color="#999" style={styles.text}>
              {_translate("noProgramsFound")}
            </PoppinsText> */}
          </View>
        ) : (
          <FlatList
            data={getFilteredData(classes, searchCategories, searchText)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
            renderItem={({ item, i }) => (
              <ProgramCard {...item} key={item._id} />
            )
            }
          />
        )}
      </View>
    </View>
  );
};

const getFilteredData = (data=[], searchCategories=[], searchText='') => {
  let filtered = [...data]; 
  if(searchCategories.length){
    filtered = filtered.filter((p) => searchCategories.includes(p.category));
  }
  if(searchText.length){
    filtered = filtered.filter((p) => {
      return p.title?.toLocaleLowerCase().startsWith(searchText.toLocaleLowerCase());
    });
  }
  return filtered;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  scrollView: {
    height: "auto",
    paddingLeft: 10,
  },
  heading: {
    marginLeft: 22,
    marginVertical: 10,
  },
  avatar: {
    width: AVATAR_SIZE + 10,
    height: AVATAR_SIZE + 10,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: wp("0.5%"),
  },
  text: {
    textAlign: "center",
    marginHorizontal: wp("5%"),
  },
});

export default AllPrograms;

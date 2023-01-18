import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
  FlatList
} from "react-native";
import { _translate } from "../../../localization";

import { Avatar, Icon, ListItem, SearchBar } from "react-native-elements";
import images from "../../../assets/images";
import Search from "../../../assets/svg/Search";
import ProgramCard from "../../../components/ProgramCard";
import MulishText from "../../../components/MulishText";
import NavigationHeader from "../../../components/NavigationHeader";
import PoppinsText from "../../../components/PoppinsText";
import Row from "../../../components/Row";
import StyledSearchBar from "../../../components/StyledSearchBar";
import TrainerCard from "../../../components/TrainerCard";
import Colors from "../../../constants/Colors";
import CommonStyles from "../../../constants/CommonStyles";
import { AUTH_TOKEN, hp, rf, wp } from "../../../constants/Constants";
import { navigate } from "../../../navigations/NavigationService";
import {
  fetchHomeData,
  fetchCategoryList,
} from "../../../redux/actions/ClientActions";
import { useProfile } from "../../../redux/reducers/ProfileReducer";
import {
  setSearchCategory,
  useCategories,
  useClasses,
  useIsLoading,
  useProgramCategories,
  usePrograms,
  useTrainers,
} from "../../../redux/reducers/ClientReducer";
import { firstName } from "../../../utilities/utils";
import { useDispatchEffect } from "../../../utilities/hooks";
import ClassCard from "../../../components/ClassCard";
import moment from "moment";
import { useDispatch } from "react-redux";
import LocalStorage from "../../../services/LocalStorage";
import CategoryCard from "../../../components/CategoryCard";
import Carousel from 'react-native-snap-carousel';

const AVATAR_SIZE = wp("12%");

export default function HomeScreen({ navigation }) {
  const profile = useProfile();
  const programs = usePrograms();
  const classes = useClasses();
  const trainers = useTrainers();
  const loading = useIsLoading();
  const categories = useCategories();
  const programCategories = useProgramCategories();
  const dispatch = useDispatch();

  React.useEffect(() => {
    getCategoriesHandler();
  }, []);

  const getCategoriesHandler = async () => {
    const token = await LocalStorage.getData(AUTH_TOKEN);
    dispatch(fetchCategoryList(token));
  };

  

  const slideItem = [
    { img: 'https://media.istockphoto.com/photos/running-on-treadmill-picture-id542197916?b=1&k=20&m=542197916&s=170667a&w=0&h=dM8ehUpNL6-yV4fKoqmktqZZgi-xcgWtir6T7K3HhiY=' },
    { img: 'https://media.istockphoto.com/photos/rope-training-picture-id932455746?b=1&k=20&m=932455746&s=170667a&w=0&h=KUWYQPMmFEkSiamuFnuJLzzhwXMhyr1XuRrYUPkd0mk=' },
    { img: 'https://media.istockphoto.com/photos/redhead-mechanic-taking-a-break-picture-id1135066013?k=20&m=1135066013&s=612x612&w=0&h=fQ06URbk7HYeu75E9gmGWTzOBYWxNMVM_77qIZVKyeE=' },
    { img: 'https://media.istockphoto.com/photos/cross-training-picture-id917869152?k=20&m=917869152&s=612x612&w=0&h=-ECBu0i5Z_AE479M4IXIKBHgKv_MZ7tGWBh_dpZSMR4=' },
    { img: 'https://media.istockphoto.com/photos/unrecognizable-person-taking-dumbbells-in-a-gym-picture-id539258337?k=20&m=539258337&s=612x612&w=0&h=Is_PmVwCd9aB-9hIiW-yAtuzPZU23FBgjMzbY6B4uD0=' },
    { img: 'https://media.istockphoto.com/photos/young-fitness-woman-running-on-sunrise-seaside-trail-picture-id486225114?b=1&k=20&m=486225114&s=170667a&w=0&h=dGllKUX02PBdHtp1i6Kx97A37N5U3gHNmuECiKFLrQY=' },
  ]




  return (
    <View style={styles.container}>
      <NavigationHeader title={_translate("home")} />

      <ScrollView
        contentContainerStyle={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        refreshControl={
          <RefreshControl refreshing={false} />
        }
      >
        <WelcomeHeader
          name={profile ? profile?.name : `${_translate("Client")}`}
        />

        <StyledSearchBar
          placeholder={_translate("search") + "..."}
          containerStyle={{ marginBottom: 10 }}
          onPress={() => {
            navigate("TrainersList");
          }}
        />
        <View style={{ width: wp("100%") }}>
          <Row style={{ width: wp("95%") }}>
            <Carousel
              data={slideItem}
              renderItem={(item) => {
              
                return (
                  <View style={{
                    backgroundColor: 'transparent',
                    height: hp('38%'),
                    // marginLeft: 20,
                    // marginRight: 25,
                    width: wp('70%'),

                  }}>
                    <Image source={{ uri: item.item.img }} style={{ height: hp('38%'), borderRadius: 10,marginLeft:20 ,marginRight:15}} />
                  </View>
                )
              }}
              sliderWidth={200}
              itemWidth={250}
            />
          </Row>
        </View>


        <View style={{ width: wp("100%") }}>
          <Row style={{ width: wp("95%"), justifyContent: "space-between" }}>
            <PoppinsText
              semiBold
              fontSize={rf(2.5)}
              color="#2E2A2A"
              style={styles.heading}
            >
              {_translate("categories")}
            </PoppinsText>
            <TouchableOpacity
              onPress={() => {
                navigate("CategoryList");
              }}
            >
              {/* <PoppinsText
                semiBold
                fontSize={wp("3%")}
                color="#2E2A2A"
                style={styles.heading}
              >
                {_translate("seeMore")}
              </PoppinsText> */}
            </TouchableOpacity>
          </Row>
          <View style={{
            marginHorizontal: 10,
            flex: 1
          }}>
            {
              <FlatList
                data={programCategories}
                renderItem={({ item }) => (
                  <CategoryCard                  
                    item={item}
                    onPress={() => {
                      dispatch(setSearchCategory([item._id]));
                      navigation.navigate("AllPrograms")
                    }}
                  />
                )}
                keyExtractor={item => `${item._id}`}
                numColumns={2}
              />

            }
          </View>
          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color={Colors.primaryColor}
                style={{ marginHorizontal: wp("40%") }}
              />
            ) : programCategories?.length == 0 ? (
              <PoppinsText
                semiBold
                fontSize={rf(2.5)}
                color="#bbb"
                style={styles.emptyText}
              >
                {_translate("noCategories")}
              </PoppinsText>
            ) : (
              programCategories?.map((item, i) => (
                <CategoryCard
                  item={item}
                  style={{ width: 120 }}
                  onPress={() =>
                    navigation.navigate("AllPrograms", {
                      selectedCategories: [item._id],
                    })
                  }
                  key={item._id}
                />
              ))
            )}
          </ScrollView> */}
        </View>
        {/* <View style={{ width: wp("100%"), height: "auto" }}>
          <Row style={{ width: wp("95%"), justifyContent: "space-between" }}>
            <PoppinsText
              semiBold
              fontSize={rf(2.5)}
              color="#2E2A2A"
              style={styles.heading}
            >
              {_translate("enrollPrograms")}
            </PoppinsText>
            <TouchableOpacity
              onPress={() => {
                navigate("AllPrograms");
              }}
            >
              <PoppinsText
                semiBold
                fontSize={wp("3%")}
                color="#2E2A2A"
                style={styles.heading}
              >{`See More`}</PoppinsText>
            </TouchableOpacity>
          </Row>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
          >
            {loading ? (
              <ActivityIndicator
                size="large"
                color={Colors.primaryColor}
                style={{ marginHorizontal: wp("40%") }}
              />
            ) : programs?.length == 0 ? (
              <PoppinsText
                semiBold
                fontSize={rf(2.5)}
                color="#bbb"
                style={styles.emptyText}
              >
                {_translate("noRecommendations")}
              </PoppinsText>
            ) : (
              programs?.map((item, i) => (
                <ProgramCard {...item} key={item._id} />
              ))
            )}
          </ScrollView>
        </View> */}

        {/* <View style={{ width: wp("100%"), height: "auto" }}>
          <Row style={{ width: wp("95%"), justifyContent: "space-between" }}>
            <PoppinsText
              semiBold
              fontSize={rf(2.5)}
              color="#2E2A2A"
              style={styles.heading}
            >
              {_translate("enrollClasses")}
            </PoppinsText>
            <TouchableOpacity
              onPress={() => {
                navigate("AllClasses");
              }}
            >
              <PoppinsText
                semiBold
                fontSize={wp("3%")}
                color="#2E2A2A"
                style={styles.heading}
              >{`See More`}</PoppinsText>
            </TouchableOpacity>
          </Row>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
          >
            {loading ? (
              <ActivityIndicator
                size="large"
                color={Colors.primaryColor}
                style={{ marginHorizontal: wp("40%") }}
              />
            ) : classes?.length == 0 ? (
              <PoppinsText
                semiBold
                fontSize={rf(2.5)}
                color="#bbb"
                style={styles.emptyText}
              >
                {_translate("noClassToday")}
              </PoppinsText>
            ) : (
              classes?.map((item, i) => <ClassCard {...item} key={item._id} />)
            )}
          </ScrollView>
        </View> */}

        {/* <View style={{ width: wp("100%") }}>
          <PoppinsText
            semiBold
            fontSize={rf(2.5)}
            color="#1E2022"
            style={styles.heading}
          >
            {_translate("topTrainers")}
          </PoppinsText>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.primaryColor}
              style={{ marginHorizontal: wp("40%") }}
            />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 20,
                marginVertical: 16,
              }}
            >
              {trainers?.map((item, i) => (
                <Avatar
                  key={`${item.uri}-${i}`}
                  source={{ uri: item.image }}
                  containerStyle={styles.avatar}
                  avatarStyle={{
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE,
                    borderRadius: AVATAR_SIZE,
                    margin: 1,
                  }}
                  rounded
                  onPress={() => {
                    navigate("TrainerProfile", { trainer: item });
                  }}
                />
              ))}
            </ScrollView>
          )}
        </View> */}

        {/* <View
          style={{
            width: wp("100%"),
            //  height: 230,

            marginBottom: 10,
          }}
        >
          <PoppinsText
            semiBold
            fontSize={rf(2.5)}
            color="#2E2A2A"
            style={{ marginLeft: 22, marginBottom: 20 }}
          >
            {_translate("yourNearbyTrainers")}
          </PoppinsText>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.primaryColor}
              style={{ marginHorizontal: wp("40%") }}
            />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollView}
            >
              {trainers?.map((item) => (
                <TrainerCard {...item} key={item._id} />
              ))}
            </ScrollView>
          )}
        </View> */}
      </ScrollView>
    </View>
  );
}

const WelcomeHeader = ({ name }) => (
  <ListItem
    containerStyle={{
      width: wp("90%"),
      backgroundColor: "transparent",
      padding: 0,
      marginVertical: 20,
      marginLeft: 20,
    }}
  >
    <ListItem.Content>
      <ListItem.Title>
        <PoppinsText semiBold fontSize={rf(3.5)} color={"#000"}>
          {`${_translate("welcome")}`}
          {name?.length ? `, ${firstName(name)}` : ""}
        </PoppinsText>
      </ListItem.Title>
      <ListItem.Subtitle>
        <PoppinsText fontSize={rf(2)} color={"#7D7D7D"}>
          {_translate("findYourWorkoutTrainer")}
        </PoppinsText>
      </ListItem.Subtitle>
    </ListItem.Content>
    <View style={[CommonStyles.row, {}]}>
      <TouchableOpacity
        onPress={() => {
          // navigate("OnlineClasses");
          navigate("AllPrograms");
        }}
      >
        <View
          style={{
            width: wp("18%"),
            height: 50,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Search />
          <MulishText
            bold
            fontSize={rf(1.25)}
            style={{ textAlign: "center" }}
          >{`${_translate("lookForPrograms")}`}</MulishText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigate("TrainersList");
        }}
      >
        <View
          style={{
            width: wp("18%"),
            height: 50,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Search />
          <MulishText
            bold
            fontSize={rf(1.25)}
            style={{ textAlign: "center" }}
          >{`${_translate("lookForTrainers")}`}</MulishText>
        </View>
      </TouchableOpacity>
    </View>
  </ListItem>
);

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
    alignItems: "center",
  },
  heading: {
    marginLeft: 22,
    marginVertical: 10,
  },
  emptyText: {
    marginLeft: 22,
    marginVertical: 10,
    width: wp("90%"),
    textAlign: "center",
  },
  avatar: {
    width: AVATAR_SIZE + 10,
    height: AVATAR_SIZE + 10,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: wp("0.5%"),
    marginBottom: 16,
  },
});

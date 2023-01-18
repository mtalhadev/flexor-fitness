import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Avatar,
  Badge,
  Chip,
  FAB,
  ListItem,
  SearchBar,
} from "react-native-elements";
import BadgedAvatar from "../../../components/BadgedAvatar";
import ClientModal from "../../../components/ClientModal";
import LogoHeader from "../../../components/LogoHeader";
import PoppinsText from "../../../components/PoppinsText";
import RobotoText from "../../../components/RobotoText";
import StyledSearchBar from "../../../components/StyledSearchBar";
import Colors from "../../../constants/Colors";
import { hp, rf, wp } from "../../../constants/Constants";
import Icon from "../../../constants/Icon";
import { navigate } from "../../../navigations/NavigationService";
import { fetchTrainerData } from "../../../redux/actions/TrainerActions";
import {
  useClients,
  useIsLoading,
  useRequests,
} from "../../../redux/reducers/TrainerReducer";
import { useDispatchEffect } from "../../../utilities/hooks";
import { _translate } from "../../../localization";

export default function HomeScreen() {
  const [modalProps, setModalProps] = useState({
    visible: false,
    data: { name: "", image: null },
  });

  const clients = useClients();
  const requests = useRequests();
  const isLoading = useIsLoading();

  const isFocused = useIsFocused();

  const onRefresh = useDispatchEffect(fetchTrainerData, null, isFocused);

  const [filtered, setFiltered] = useState([]);
  const [value, setValue] = useState("");

  const onSearch = (text) => {
    setValue(text);
    const items = clients.filter((item) => item.name.includes(text));
    setFiltered(items);
  };
  const onSearchClear = () => {
    setFiltered([]);
  };

  return (
    <View style={styles.container}>
      <LogoHeader />

      <SearchBar
        placeholder={_translate("searchClient")}
        placeholderTextColor="rgba(0,0,0,0.53)"
        onChangeText={onSearch}
        onCancel={onSearchClear}
        onClear={onSearchClear}
        value={value}
        showCancel={true}
        searchIcon={{ name: "search", size: 24, type: "feather" }}
        containerStyle={{
          width: wp("100%"),
          height: 50,
          backgroundColor: "#FFF",
          borderBottomColor: "#FFF",
          borderTopColor: "#FFF",
          paddingHorizontal: wp("6%"),
          marginBottom: 20,
        }}
        inputContainerStyle={{ backgroundColor: "#C4C4C430", borderRadius: 50 }}
        inputStyle={{ fontSize: 15, color: "#000" }}
      />

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primaryColor}
          style={{ marginHorizontal: wp("40%"), marginTop: hp("40%") }}
        />
      ) : (
        <>
          {/* {
          requests.length > 0 && 
          <TouchableOpacity onPress={() => { navigate('ClientRequests') }}>
          <View style={{ width: wp('88%'),  flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
            <RobotoText color="#000" fontSize={17}> {_translate("clientRequests")}</RobotoText>
              <Badge
                value={<PoppinsText color="#FFF" fontSize={15}>{requests.length}</PoppinsText>}
                badgeStyle={{ width: 34, height: 34, borderRadius: 34 }}
                />
          </View>
          </TouchableOpacity>
          } */}

          <FlatList
            data={filtered.length ? filtered : clients}
            renderItem={({ item, index }) => (
              <Client
                {...item}
                onPress={(data) => {
                  setModalProps({ visible: true, data });
                }}
              />
            )}
            keyExtractor={(item, i) => item._id}
            style={{ width: "100%", height: "100%", padding: 5 }}
            ListEmptyComponent={() => (
              <View
                style={{
                  height: hp("70%"),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PoppinsText
                  fontSize={rf(2.5)}
                  color="#999"
                  style={styles.text}
                >
                  {_translate("youHaveNoClients")}
                </PoppinsText>
              </View>
            )}
            ListFooterComponent={() => <View style={{ height: 80 }} />}
          />
        </>
      )}

      <FAB
        color={Colors.primaryColor}
        size="large"
        placement="right"
        icon={{ name: "plus", type: "feather", color: "#FFF", size: 24 }}
        onPress={() => {
          navigate("AddClient");
        }}
      />

      <ClientModal
        isModalVisible={modalProps.visible}
        closeModal={() => {
          setModalProps({ ...modalProps, visible: false });
        }}
        item={modalProps.data}
      />
    </View>
  );
}

const Client = (item) => (
  <ListItem onPress={() => item.onPress(item)} Component={TouchableOpacity}>
    <BadgedAvatar source={{ uri: item.image }} />
    <ListItem.Content>
      <ListItem.Title>{item.name}</ListItem.Title>
      {/* <ListItem.Subtitle>
          <PoppinsText fontSize={12}>
            {item.amount}  <PoppinsText color='#000' fontSize={10}>{`Last charge: ${item.date}`}</PoppinsText>
          </PoppinsText>
        </ListItem.Subtitle> */}
    </ListItem.Content>
    <Icon.Feather
      name="calendar"
      size={24}
      color="#AFAFAF"
      style={{ marginRight: 10 }}
    />
  </ListItem>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    marginHorizontal: wp("5%"),
  },
});

import React, { useState } from "react";
import { FlatList, LayoutAnimation, StyleSheet, View } from "react-native";
import { Header, Icon, SearchBar } from "react-native-elements";
import images from "../../assets/images";
import Group from "../../assets/svg/Group";
import ChatCard from "../../components/ChatCard";
import MulishText from "../../components/MulishText";
import Row from "../../components/Row";
import Colors from "../../constants/Colors";
import { AUTH_TOKEN, wp } from "../../constants/Constants";
import { navigate } from "../../navigations/NavigationService";
import { useIstrainer, useUser } from "../../redux/reducers/AuthReducer";
import { getUserInbox } from "../../services/FetchApiService";
import LocalStorage from "../../services/LocalStorage";
import { _translate } from "../../localization";
import NavigationHeader from "../../components/NavigationHeader";

// const CHATS_LIST = [
//   { image: images.jane, name: "Alice Mica", message: "Really? that’s great…", time: '13:43', unreadCount: 2, onPress: () => navigate('PrivateChat')},
//   { image: images.brooklyn, name: "Monica Max", message: "Hi, please make an exercise", time: '12:03', unreadCount: 2, onPress: () => navigate('PrivateChat')  },
//   { image: images.wade, name: "James Arthur", message: "I like your idea", time: '16:50', unreadCount: 0,onPress: () => navigate('PrivateChat')  },
//   { image: images.wade, name: "Trainers Squad", message: "Do you make good classes?", time: '21:00', unreadCount: 0, onPress: () => navigate('GroupChat')  },
//   { image: images.wade, name: "Lionel Alex", message: "Alex? Please come here", time: '02:34', unreadCount: 0, onPress: () => navigate('PrivateChat')  },

// ];
export default function Conversations({ navigation }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const user = useUser();
  const istrainer = useIstrainer();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action
      getUserChats();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const getUserChats = async () => {
    const token = await LocalStorage.getData(AUTH_TOKEN);
    getUserInbox(user._id, token, (res) => {
      if (res.success) {
        setData(res.conversation);
      }
    });
  };
  const onSearch = (text) => {
    setSearchText(text);
  }
  return (
    <View style={styles.container}>
      {/* <ChatHeader
        title={_translate("Conversations")}
        backArrow={true}
        showRightMenu={true}
      /> */}
      <NavigationHeader
        title={_translate("conversations")}
        rightComponent={
          istrainer ? (
            <Row style={{ width: 80, justifyContent: "space-between" }}>
              <Icon
                name={"settings-sharp"}
                type="ionicon"
                color={Colors.primaryColor}
                size={30}
                onPress={() => {
                  navigate("Settings");
                }}
              />
              <Group onPress={() => navigate("CreateGroup")} />
            </Row>
          ) : null
        }
      />

      <SearchBar
        placeholder={_translate("searchInTheChat")}
        placeholderTextColor="#918FB7"
        onChangeText={onSearch}
        value={searchText}
        showCancel={true}
        searchIcon={{
          name: "search",
          size: 24,
          type: "feather",
          color: "#000",
        }}
        containerStyle={{
          width: wp("100%"),
          height: 60,
          backgroundColor: "transparent",
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
          paddingHorizontal: 20,
          justifyContent: "center",
          marginBottom: 20,
          marginTop: 5,
        }}
        inputContainerStyle={{
          height: 50,
          backgroundColor: "#F5F6FA",
          borderRadius: 12,
        }}
        inputStyle={{
          fontSize: 14,
          color: "#1E2022",
          fontFamily: "Mulish-SemiBold",
        }}
      />

      <View style={{ width: wp("100%"), marginBottom: wp("5%") }}>
        <MulishText bold fontSize={19} style={styles.heading}>
          {_translate("chats")}
        </MulishText>
      </View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <ChatCard
            item={item}
            navigate={navigate}
            searchText={searchText}
            // onDelete={(name) => {
            //   LayoutAnimation.configureNext(
            //     LayoutAnimation.Presets.easeInEaseOut
            //   );
            //   setData((data) => data.filter((e) => e.name !== name));
            // }}
          />
        )}
        keyExtractor={(item, i) => item._id}
        style={{
          width: "100%",
          paddingHorizontal: wp("5%"),
          paddingVertical: wp("10%"),
          backgroundColor: "#F5F6FA",
          borderRadius: 20,
        }}
        ListFooterComponent={<View style={{ height: 30 }} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <MulishText color="#999">{_translate("noChatsYet")}</MulishText>
          </View>
        )}
      />
    </View>
  );
}

const ChatHeader = () => {
  const istrainer = useIstrainer();
  return (
    <Header
      leftComponent={
        <MulishText extraBold fontSize={24} style={{ lineHeight: 40 }}>
          {_translate("conversations")}
        </MulishText>
      }
      rightComponent={
        istrainer ? (
          <Row style={{ width: 80, justifyContent: "space-between" }}>
            <Icon
              name={"settings-sharp"}
              type="ionicon"
              color={Colors.primaryColor}
              size={30}
              onPress={() => {
                navigate("Settings");
              }}
            />
            <Group onPress={() => navigate("CreateGroup")} />
          </Row>
        ) : null
      }
      leftContainerStyle={{ flex: 0.6 }}
      centerContainerStyle={{ flex: 0 }}
      rightContainerStyle={{
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginRight: 0,
        flex: 0.4,
      }}
      containerStyle={{ backgroundColor: "#FFF", paddingHorizontal: 20 }}
      statusBarProps={{ backgroundColor: "#FFF", barStyle: "dark-content" }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.background2,
  },
  scrollView: {
    height: 60,
    paddingLeft: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  heading: {
    marginLeft: 22,
  },
  avatar: {
    width: 47,
    height: 47,
    borderRadius: 47,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

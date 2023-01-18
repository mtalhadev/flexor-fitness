import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar, Header, Icon, Input, ListItem } from "react-native-elements";
import images from "../../assets/images";
import MulishText from "../../components/MulishText";
import Row from "../../components/Row";
import TextMessage from "../../components/TextMessage";
import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { hp, wp } from "../../constants/Constants";
import { GiftedChat, Send, Bubble } from "react-native-gifted-chat";
import SocketManager from "../../socketManager";
import {
  useIstrainer,
  useToken,
  useUser,
} from "../../redux/reducers/AuthReducer";
import { loadGroupChat, loadOldChat } from "../../services/FetchApiService";
import { useNavigation } from "@react-navigation/core";

export default function PrivateChat({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const user = useUser();
  const token = useToken();
  const otherUser = route?.params?.otherUser;
  const group = route?.params?.group;
  const isTrainer = useIstrainer();

  console.log('otherUser: ', otherUser);
  console.log('group: ', group);
  useEffect(() => {
    if (otherUser) {
      SocketManager.instance.listenNewMessage((message) => {
        console.log('listenNewMessage message: ', message)
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, message)
        );
      });
      SocketManager.instance.emitIsUserOnline(otherUser._id);
      SocketManager.instance.listenIsUserOnline((status) => {
        setIsOnline(status.isOnline);
      });

      loadOldChat(
        { sender: user._id, recevier: otherUser._id },
        token,
        (res) => {
          if (res.success) {
            if (res.chat.length > 0) {
              setMessages(res.chat.reverse());
            } else {
              setMessages([]);
            }
          } else {
            setMessages([]);
            alert(res.message);
          }
        }
      );
    }

    if (group?.groupId?._id) {
      // listenLiveGroupMessage
      SocketManager.instance.listenLiveGroupMessage((message) => {
        if (isTrainer && !message?.trainerSenderId) {
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, message)
          );
        }

        if (!isTrainer && !message?.senderId) {
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, message)
          );
        }
        console.log(message);
      });
      SocketManager.instance.emitJoinGroup(group?.groupId?._id);
      loadGroupChat(group?.groupId?._id, token, (res) => {
        if (res.success) {
          setMessages(res.chat.reverse());
        }
        console.log(res);
      });
    }
  }, []);

  const onSend = useCallback((messages = []) => {
    if (otherUser) {
      const _message = {
        senderId: user._id,
        text: messages[0].text,
        reciverId: otherUser._id,
        user: messages[0].user,
      };
      // console.log(messages)
      SocketManager.instance.emitNewMessage(_message);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    }
    if (group?.groupId?._id) {
      // const _message = {
      //   trainerSenderId: user._id,
      //   text: messages[0].text,
      //   groupId: group?.groupId?._id,
      // }
      const _message = {
        groupId: group?.groupId?._id,
        text: messages[0].text,
        trainerSenderId: user._id,
        senderId: user._id,
        user: messages[0].user,
      };
      isTrainer ? delete _message.senderId : delete _message.trainerSenderId;
      SocketManager.instance.emitGroupMessage(_message);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <PrivateChatHeader
        name={otherUser ? otherUser.name : group?.name ? group.name : ""}
        onlineStatus={isOnline ? "Online" : null}
        image={otherUser ? otherUser.image : group?.image ? group.image : false}
      />

      {/* <FlatList
            data={CHAT_HISTORY}
            renderItem={({item, index}) => ( <TextMessage  {...item}/>)}
            keyExtractor={(item, i) => item.name}
            style={{ width: '100%', height: hp('100%')-100, padding: wp('5%'), backgroundColor: '#F5F6FA', borderRadius: 20 }}
            ListFooterComponent={<View style={{height: 30 }}/>}/>  

          <MessageComposer /> */}
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        textInputProps={{ color: "black" }}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: Colors.primaryColor,
              },
            }}
          />
        )}
        renderSend={(props) => (
          <Send {...props}>
            <View
              style={{
                justifyContent: "center",
                height: "100%",
                marginRight: 10,
              }}
            >
              <Icon
                name="send"
                type="ionicon"
                size={24}
                color={Colors.primaryColor}
              />
            </View>
          </Send>
        )}
        user={{
          _id: user._id,
          name: user.name,
          avatar: user.image ? user.image : "",
          token: user.token ? otherUser.token : "",
          from: user.name,
        }}
      />
    </View>
  );
}

const PrivateChatHeader = ({ name, image, onlineStatus }) => {
  const navigation = useNavigation();

  return (
    <Header
      leftComponent={
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            name={"arrow-back-ios"}
            type="material"
            color={"#000"}
            size={20}
            containerStyle={styles.iconBack}
            onPress={() => navigation?.goBack()}
            Component={TouchableWithoutFeedback}
          />
          <ListItem containerStyle={{ width: wp("60%"), height: 55 }}>
            {image ? (
              <Avatar source={{ uri: image }} size={50} rounded />
            ) : (
              <Avatar source={images.gym} size={50} rounded />
            )}
            <ListItem.Content style={{ height: 55, marginLeft: -wp("1%") }}>
              <ListItem.Title>
                <MulishText bold fontSize={24} color={"#221F60"}>
                  {name}
                </MulishText>
              </ListItem.Title>
              {onlineStatus ? (
                <ListItem.Subtitle>
                  <MulishText fontSize={14} color={"#918FB7"}>
                    {onlineStatus}
                  </MulishText>
                </ListItem.Subtitle>
              ) : (
                <></>
              )}
            </ListItem.Content>
          </ListItem>
        </View>
      }
      rightComponent={
        <Row style={{ width: wp("28%"), justifyContent: "space-between" }}>
          {/* <Icon name={'call-sharp'} type='ionicon' color={'#000'} size={wp('8%')} backgroundColor="#F5F6FA" containerStyle={styles.iconStyle} />
                <Icon name={'videocam-sharp'} type='ionicon' color={'#000'} size={wp('8%')} backgroundColor="#F5F6FA" containerStyle={styles.iconStyle} /> */}
        </Row>
      }
      leftContainerStyle={{ width: wp("60%"), height: 60 }}
      centerContainerStyle={{ width: 0 }}
      rightContainerStyle={{
        width: wp("40%"),
        height: 60,
        justifyContent: "center",
        alignItems: "flex-end",
        marginRight: 0,
      }}
      containerStyle={{ backgroundColor: "#FFF", paddingHorizontal: wp("1%") }}
      statusBarProps={{ backgroundColor: "#FFF", barStyle: "dark-content" }}
    />
  );
};

const MessageComposer = () => (
  <View style={styles.inputContainerStyle}>
    <Icon
      name={"add"}
      type="ionicon"
      size={wp("8%")}
      color={Colors.primaryColor}
      containerStyle={{
        width: wp("14%"),
        height: wp("14%"),
        borderRadius: wp("3%"),
        backgroundColor: "#FFF",
        justifyContent: "center",
      }}
    />
    {/* <Icon
        name={'mic'}
        type='ionicon'
        size={wp('8%')}
        color={Colors.primaryColor}
        containerStyle={{ width: wp('14%'), height: wp('14%'), borderRadius: wp('3%'), backgroundColor: '#FFF', justifyContent: 'center', }}
      /> */}

    <Input
      containerStyle={styles.inputContainer}
      inputContainerStyle={styles.inputView}
      inputStyle={styles.inputText}
      rightIcon={() => (
        <Icon
          name="send"
          type="ionicon"
          size={24}
          color={Colors.primaryColor}
          containerStyle={{}}
          onPress={() => {}}
        />
      )}
      // onChangeText={(text) => {  }}
      // onEndEditing={() => {  }}
      // value={text}
      placeholder="Write now…"
      placeholderTextColor="#918FB7"
      returnKeyType={"done"}
      multiline={false}
      numberOfLines={1}
      maxLength={50}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    backgroundColor: Colors.background,
  },

  inputContainerStyle: {
    flexDirection: "row",
    width: wp("100%"),
    height: wp("20%"),
    backgroundColor: "#F5F6FA",
    borderTopWidth: 0,
    alignItems: "center",
    justifyContent: "space-around",
  },
  inputContainer: {
    width: wp("75%"),
    height: wp("14%"),
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  inputView: {
    backgroundColor: "#FFF",
    width: wp("75%"),
    height: wp("14%"),
    borderRadius: wp("3%"),
    paddingLeft: 16,
    margin: 0,
    borderBottomWidth: 0,
  },
  inputText: {
    color: "#333",
    fontSize: 15,
    fontFamily: "Poppins-Regular",
  },
  iconStyle: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F6FA",
  },
  iconBack: {
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import PrimaryButton from "../../../components/PrimaryButton";
import Colors from "../../../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import Client from "./Client";
import { _translate } from "../../../localization";

const index = ({
  onTextChange,
  onSubmit,
  visible,
  value,
  toggle,
  clients,
  addClient,
  state,
}) => {
  // console.log(clients)
  return (
    <Modal
      visible={visible}
      animationType={"slide"}
      transparent={true}
      style={{ justifyContent: "center" }}
    >
      <View style={styles.backDrop}>
        <View style={styles.container}>
          <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={toggle}>
            <Ionicons name={"close"} size={25} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <View style={styles.inputContainer}>
              <TextInput
                value={value}
                placeholderTextColor={"#000"}
                style={{ color: Colors.primaryColor, paddingHorizontal: 10 }}
                onChangeText={onTextChange}
                placeholder={_translate("PleaseEnterFileName")}
              />
            </View>
            <FlatList
              data={clients}
              keyExtractor={(client) => client._id}
              renderItem={({ item }) => (
                <Client
                  item={item}
                  addClient={() => addClient(item)}
                  clients={state.clients}
                />
              )}
            />
          </View>
          <PrimaryButton
            title={_translate("createGroup")}
            containerStyle={{ alignItems: "center", justifyContent: "center" }}
            buttonStyle={{ height: 45, borderRadius: 10, width: "100%" }}
            onPress={onSubmit}
            disabled={state.clients.length < 1 || state.groupName.length == 0}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backDrop: {
    flex: 1,
    backgroundColor: "rgba(3,3,3,.5)",
    justifyContent: "flex-end",
  },
  container: {
    flex: 0.9,
    backgroundColor: Colors.background,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 15,
  },
  inputContainer: {
    backgroundColor: Colors.background2,
    marginVertical: 20,
    borderRadius: 10,
  },
});

export default index;

import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import CommonStyles from "../constants/CommonStyles";
import { wp } from "../constants/Constants";
import Icon from "../constants/Icon";
import ListModal from "./ListModal";
import MulishText from "./MulishText";

export default function StyledDropdown2({
  placeholder,
  listTitle,
  initialItems = [],
  items = [],
  popularItems = [],
  multiple = false,
  onSelectItem,
  containerStyle,
}) {
  const [showModal, setShowModal] = useState(false);

  const initialTitle = () =>
    initialItems.length
      ? initialItems.reduce((prev, next, index, initialItems) => {
          let temp = [prev, next].join(", ");
          if (temp.length <= 15) {
            return temp;
          } else if (temp.length > 15) {
            let count = initialItems.length - (index + 1);
            return prev.includes("more")
              ? prev
              : `${prev} and ${count + 1} more`;
          }
        })
      : "";
  const [DropdownText, setDropdownText] = useState(initialTitle());

  useEffect(() => {
    setDropdownText(initialTitle());
  }, [initialTitle()]);

  let initialSelected = new Map();
  initialItems.forEach((item) => {
    initialSelected.set(item, true);
  });

  const onSelectItems = (selectedItems) => {
    let newTitle = "";
    if (Array.isArray(selectedItems) && selectedItems.length) {
      newTitle = selectedItems.reduce((prev, next, index, selectedItems) => {
        let temp = [prev, next].join(", ");
        if (temp.length <= 15) {
          return temp;
        } else if (temp.length > 15) {
          let count = selectedItems.length - (index + 1);
          return prev.includes("more") ? prev : `${prev} and ${count + 1} more`;
        }
      });
    }
    setDropdownText(newTitle);
    onSelectItem(multiple ? selectedItems : selectedItems[0] || "");
  };
  return (
    <View style={[CommonStyles.input3, containerStyle]}>
      <ListItem
        onPress={() => {
          setShowModal(true);
        }}
        Component={TouchableOpacity}
        containerStyle={styles.inputContainerStyle}
      >
        <ListItem.Content>
      <MulishText semiBold color={"#000"} fontSize={16}>
        <Text>Country</Text>
      </MulishText>
          {/* <ListItem.Title style={{marginTop: 10}}> */}
          {/* </ListItem.Title> */}
          <ListItem.Title>
            {DropdownText.length ? (
              <MulishText semiBold color={"#000"} fontSize={14}>
                {DropdownText}
              </MulishText>
            ) : (
              <MulishText semiBold color={"rgba(0,0,0,0.55)"} fontSize={14}>
                {placeholder}
              </MulishText>
            )}
          </ListItem.Title>
        </ListItem.Content>
        <Icon.Material
          name="keyboard-arrow-down"
          size={22}
          color={"#00000070"}
        />
      </ListItem>

      <ListModal
        isModalVisible={showModal}
        title={listTitle}
        items={items}
        popularItems={popularItems}
        selectedItems={initialSelected}
        isMultiple={multiple}
        onSelectItems={onSelectItems}
        closeModal={() => {
          setShowModal(false);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  containerStyle: {
    width: wp("86%"),
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  inputContainerStyle: {
    // backgroundColor: "rgba(240,242,246,0.76)",
    height: 56,
    borderRadius: 10,
    paddingLeft: 18,
    borderColor: "black",
    borderBottomWidth: 0.5,
  },
});

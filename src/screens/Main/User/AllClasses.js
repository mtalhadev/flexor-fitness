import React from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import NavigationHeader from "../../../components/NavigationHeader";
import PoppinsText from "../../../components/PoppinsText";
import ClassCard from "../../../components/ClassCard";
import Row from "../../../components/Row";
import PrimaryButton from "../../../components/PrimaryButton";
import StyledSearchBar from "../../../components/StyledSearchBar";
import Colors from "../../../constants/Colors";
import { wp } from "../../../constants/Constants";
import { usePrograms, useClasses } from "../../../redux/reducers/ClientReducer";
import { navigate } from "../../../navigations/NavigationService";
import { _translate } from '../../../localization';
const AVATAR_SIZE = wp("12%");

function AllClasses({}) {
  const programs = useClasses();

  return (
    <View style={styles.container}>
      <NavigationHeader title={_translate("allClasses")} backArrow={true} />

      <ScrollView
        contentContainerStyle={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <StyledSearchBar
              placeholder={_translate("search")+"..."}
              containerStyle={{ width: wp("66%"), paddingRight: 15 }}
            />
          <PrimaryButton
            buttonStyle={{ width: wp("30%"), height: 40, borderRadius: 10 }}
            title={_translate("category")}
            onPress={() => {
              navigate("CategoryList");
            }}
          />
        </View>

        <View style={{ width: wp("100%") }}>
          <Row style={{ width: wp("95%"), justifyContent: "space-between" }}>
            <PoppinsText
              semiBold
              fontSize={wp("5%")}
              color="#2E2A2A"
              style={styles.heading}
            >{_translate("recommendedForToday")}</PoppinsText>
          </Row>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
          >
            {programs.map((item, i) => (
              //   <ProgramCard {...item} key={item._id} />
              <ClassCard {...item} key={item._id} />
            ))}
          </ScrollView>
        </View>
        <View style={{ width: wp("100%") }}>
          <Row style={{ width: wp("95%"), justifyContent: "space-between" }}>
            <PoppinsText
              semiBold
              fontSize={wp("5%")}
              color="#2E2A2A"
              style={styles.heading}
            >{_translate("bestPurchasing")}</PoppinsText>
          </Row>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
          >
            {programs.map((item, i) => (
              <ClassCard {...item} key={item._id} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  scrollView: {
    height: 240,
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
});

export default AllClasses;

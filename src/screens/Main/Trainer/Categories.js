import { Picker } from "@react-native-picker/picker";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import images from "../../../assets/images";
import MulishText from "../../../components/MulishText";
import PrimaryButton from "../../../components/PrimaryButton";
import SecondaryButton from "../../../components/SecondaryButton";
import Colors from "../../../constants/Colors";
import { _translate } from "../../../localization";
import { AUTH_TOKEN, hp, wp } from "../../../constants/Constants";
import { navigate, reset } from "../../../navigations/NavigationService";
import { updateProfile } from "../../../redux/actions/ProfileActions";
import { useIsLoading } from "../../../redux/reducers/ProfileReducer";
import {
  loadCategories,
  loadTrainerCategories,
} from "../../../services/FetchApiService";
import LocalStorage from "../../../services/LocalStorage";

function Categories({ insets, route }) {
  const isLoading = useIsLoading();

  const dispatch = useDispatch();

  const submitForm = () => {
    console.log("submitting form .....", { category });
    dispatch(
      updateProfile({
        expertise: [category],
      })
    )
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        // navigate("Membership", { from: "Categories" });
        reset("Main");
      })
      .catch((rejectedValue) => {
        console.log("rejectedValue: ", rejectedValue);
      });
  };

  const [category, setCategory] = useState(1);
  const [categories, setCategories] = useState(false);

  useEffect(() => {
    getCategoriesHandler();
  }, []);

  const getCategoriesHandler = async () => {
    const token = await LocalStorage.getData(AUTH_TOKEN);
    loadTrainerCategories(token, (res) => {
      if (res.success) {
        setCategories(res.categories);
      } else {
        setCategories([]);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={images.logo}
        style={[styles.logo, { marginTop: insets.top }]}
      />

      <View style={styles.formContainer}>
        <MulishText semiBold style={styles.heading}>
          {_translate("categories")}
        </MulishText>
        <MulishText style={styles.text}>
          {_translate("selectTheCategory")}
        </MulishText>
        {Array.isArray(categories) ? (
          <Picker
            prompt={_translate("selectCategory")}
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => {
              setCategory(itemValue);
            }}
            dropdownIconColor="#3C444C"
            mode="dropdown"
            style={{
              width: wp("90%"),
              height: 50,
              backgroundColor: "#F0F2F6",
              borderRadius: 5,
            }}
          >
            {categories?.map((c) => (
              <Picker.Item
                label={c.title}
                value={c._id}
                fontFamily="Mulish-Regular"
              />
            ))}
          </Picker>
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator color={Colors.primaryColor} />
          </View>
        )}
      </View>
      <PrimaryButton
        title={`Next`}
        buttonStyle={{
          width: wp("80%"),
          height: 56,
          borderRadius: 7,
          marginBottom: hp("1%"),
        }}
        onPress={submitForm}
        loading={isLoading}
      />
      <SecondaryButton
        title={`Skip For Later`}
        buttonStyle={{
          width: wp("80%"),
          height: 56,
          borderRadius: 10,
          marginBottom: hp("1%"),
          borderWidth: 0,
        }}
        onPress={() => {
          // reset("Membership");
          reset('Main')
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.background,
  },
  logo: {
    width: wp("80%"),
    height: hp("20%"),
    resizeMode: "contain",
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: wp("10%"),
    // backgroundColor: '#ddd',
  },
  heading: {
    color: "#3D374F",
    fontSize: wp("6%"),
    textAlign: "center",
    marginHorizontal: wp("10%"),
    marginTop: -hp("3%"),
  },
  text: {
    color: "rgba(0,0,0,0.53)",
    fontSize: wp("4%"),
    textAlign: "center",
    marginHorizontal: wp("12%"),
    marginVertical: hp("3%"),
  },
  input: {
    width: wp("90%"),
    height: 56,
    marginTop: hp("2%"),
  },
  google: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default withSafeAreaInsets(Categories);

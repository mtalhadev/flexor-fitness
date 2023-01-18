/* eslint-disable react-native/no-raw-text */
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { _translate } from "../localization";
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { showAlert } from "react-native-customisable-alert";
import { Avatar } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import images from "../assets/images";
import ImageUpload from "../components/ImageUpload";
import NavigationHeader from "../components/NavigationHeader2";
import PrimaryButton from "../components/PrimaryButton";
import RNToast from "../components/RNToast";
import StyledDropdown from "../components/StyledDropdown";
import StyledInput from "../components/StyledInput";
import Colors from "../constants/Colors";
import CommonStyles from "../constants/CommonStyles";
import { hp, WIDTH, wp } from "../constants/Constants";
import { COUNTRIES, EXPERIENCE, LANGUAGES } from "../constants/Data";
import { updateProfile } from "../redux/actions/ProfileActions";
import { useIstrainer } from "../redux/reducers/AuthReducer";
import {
  setProfile,
  setProfileImage,
  useProfile,
  useIsLoading,
} from "../redux/reducers/ProfileReducer";
import { validateProfile, validateSignup } from "../services/AuthValidation";
import { titleCase } from "../utilities/utils";

const AVATAR_SIZE = wp("35%");
const inputRef = {
  name: React.createRef(),
  username: React.createRef(),
  country: React.createRef(),
  languages: React.createRef(),
  // secondLanguage: React.createRef(),
  experience: React.createRef(),
};

export default function EditProfile() {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setTranslucent(true);
  }, []);

  const isTrainer = useIstrainer();
  const isLoading = useIsLoading();
  const profile = useProfile();

  const [formValues, setFormValues] = useState({
    name: profile.name,
    username: profile.username,
    bio: profile.bio,
    country: profile.country,
    languages: profile.languages,
    experience: profile.experience,
  });

  console.log("formValues: ", formValues);

  const onSubmitValue = (key, value) => {
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  const submitForm = () => {
    console.log("submitting form .....", formValues);
    if (validateProfile(formValues)) {
      const payload = {
        name: formValues.name,
        username: formValues.username,
        country: formValues.country,
        languages: formValues.languages,
      };
      if (formValues.image) payload.image = formValues.image;
      if (isTrainer) {
        payload.experience = formValues.experience;
        payload.bio = formValues.bio;
      }
      dispatch(updateProfile(payload))
        .then(unwrapResult)
        .then((originalPromiseResult) => {
          if (originalPromiseResult?._id) RNToast.showShort("Profile updated");
        })
        .catch((rejectedValue) => {
          console.log("rejectedValue: ", rejectedValue);
          showAlert({
            title: "Error",
            message: rejectedValue,
            alertType: "error",
          });
        });
    }
  };

  const [showImagePicker, setShowImagePicker] = useState(false);

  const onUploadPhoto = (uri) => {
    setShowImagePicker(false);
    if (uri) {
      onSubmitValue("image", uri);
      dispatch(setProfileImage(uri));
    }
  };
  return (
    <KeyboardAvoidingView
      //keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{
          width: wp("100%"),
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: hp("4%"),
        }}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={images.profileBkgd}
          style={styles.container}
          imageStyle={styles.background}
        >
          <NavigationHeader title={""} statusBarColor={"transparent"} />
          <Avatar
            containerStyle={{
              borderColor: Colors.background,
              borderWidth: 5,
              zIndex: 1,
              marginTop: wp("0%"),
              marginBottom: wp("20%"),
              padding: 0,
              backgroundColor: "#FFF",
            }}
            imageProps={{ resizeMode: "cover" }}
            size={AVATAR_SIZE}
            rounded
            source={{ uri: profile.image }}
            renderPlaceholderContent={<ActivityIndicator />}
          >
            <Avatar.Accessory
              name="edit"
              type="feather"
              size={20}
              color={Colors.primaryColor}
              iconStyle={{ margin: 1 }}
              containerStyle={{
                backgroundColor: "#FFF",
                height: 30,
                width: 30,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setShowImagePicker(true);
              }}
            />
          </Avatar>

          <View style={styles.formContainer}>
            <StyledInput
              ref={inputRef["name"]}
              containerStyle={CommonStyles.input}
              placeholder={_translate("fullName")}
              value={formValues["name"]}
              keyboardType="default"
              returnKeyType="next"
              onEndEditing={(text) => onSubmitValue("name", text)}
              onSubmitEditing={() => inputRef.username.current.focus()}
            />
            <StyledInput
              ref={inputRef["username"]}
              containerStyle={CommonStyles.input}
              placeholder={_translate("Username")}
              value={formValues["username"]}
              returnKeyType="next"
              onEndEditing={(text) => onSubmitValue("username", text)}
            />
            {isTrainer && (
              <StyledInput
                placeholder={_translate("bio")}
                value={formValues["bio"]}
                onEndEditing={(text) => onSubmitValue("bio", text)}
                containerStyle={{ ...CommonStyles.input, height: 130 }}
                inputContainerStyle={{ height: 130 }}
                multiline={true}
                numberOfLines={3}
              />
            )}

            <StyledDropdown
              placeholder={_translate("country")}
              listTitle="Country"
              items={COUNTRIES}
              initialItems={[formValues["country"]]}
              onSelectItem={(text) => onSubmitValue("country", text)}
              containerStyle={{ ...CommonStyles.input, width: wp("86%") }}
            />

            <StyledDropdown
              placeholder={_translate("spokenLanguages")}
              listTitle="Languages"
              initialItems={formValues["languages"]}
              items={LANGUAGES}
              multiple
              onSelectItem={(items) => onSubmitValue("languages", items)}
              containerStyle={{ ...CommonStyles.input, width: wp("86%") }}
            />

            {isTrainer && (
              <StyledDropdown
                placeholder={_translate("totalExperience")}
                listTitle={"Experience"}
                items={EXPERIENCE}
                initialItems={[formValues["experience"]]}
                onSelectItem={(text) => onSubmitValue("experience", text)}
                containerStyle={{ ...CommonStyles.input, width: wp("86%") }}
              />
            )}

            <PrimaryButton
              title={_translate("saveChanges")}
              buttonStyle={{
                width: wp("90%"),
                height: 56,
                borderRadius: 10,
                marginVertical: hp("6%"),
              }}
              onPress={submitForm}
              loading={isLoading}
            />
          </View>
        </ImageBackground>

        <ImageUpload
          showPicker={showImagePicker}
          closePicker={() => setShowImagePicker(false)}
          onUpload={onUploadPhoto}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  background: {
    width: wp("100%"),
    resizeMode: "cover",
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  circle: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#DEE1E6",
    borderWidth: 1,
    borderRadius: 60,
    backgroundColor: "#FFF",
  },
  manWithPhone: {
    width: 125,
    height: 125,
    resizeMode: "cover",
    marginTop: hp("3%"),
    borderRadius: 30,
  },
  whiteBackground: {
    width: wp("100%"),
    height: hp("70%"),
    alignItems: "center",
    justifyContent: "flex-start",
    margin: hp("10%"),
  },
  textContainer: {
    width: WIDTH,
    height: 150,
    justifyContent: "space-between",
    //  backgroundColor: '#aaa',
  },
  heading: {
    color: "#222222",
    fontSize: 26,
    textAlign: "center",
    marginBottom: 5,
  },
  text: {
    color: "#222222",
    fontSize: 16,
  },
  btnContainer: {
    width: WIDTH,
    height: 110,
    alignItems: "center",
    justifyContent: "space-between",
  },
  rating: {
    width: wp("80%"),
    justifyContent: "space-between",
  },
  scrollView: {
    height: 200,
    paddingLeft: 10,
    paddingBottom: 50,
  },
});

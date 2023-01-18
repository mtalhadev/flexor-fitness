import { unwrapResult } from "@reduxjs/toolkit";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { showAlert } from "react-native-customisable-alert";
import { Image } from "react-native-elements";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import images from "../../assets/images";
import MulishText from "../../components/MulishText";
import PasswordInput from "../../components/PasswordInput";
import PrimaryButton from "../../components/PrimaryButton";
import StyledDropdown from "../../components/StyledDropdown";
import StyledInput from "../../components/StyledInput";
import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { hp, WIDTH, wp } from "../../constants/Constants";
import {
  COUNTRIES,
  COUNTRIES_POPULAR,
  EXPERIENCE,
  LANGUAGES,
} from "../../constants/Data";
import { navigate, reset } from "../../navigations/NavigationService";
import { signUp } from "../../redux/actions/AuthActions";
import { useIsLoading, useIstrainer } from "../../redux/reducers/AuthReducer";
import { setProfile } from "../../redux/reducers/ProfileReducer";
import {
  validateSignup1,
  validateSignup2,
} from "../../services/AuthValidation";
import { _translate } from "../../localization";
const inputRef = {
  name: React.createRef(),
  username: React.createRef(),
  email: React.createRef(),
  password: React.createRef(),
  confirmPassword: React.createRef(),
};
const formFields = [
  "name",
  "email",
  "username",
  "password",
  "confirmPassword",
  "country",
  "language",
  // 'secondLanguage',
  "experience",
];
function SignupScreen({ insets, route }) {
  const isTrainer = useIstrainer();
  const isLoading = useIsLoading();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    country: "",
    language: "",
    // secondLanguage: "",
    experience: "",
    bio: "",
  });

  console.log({ formValues });

  const onSubmitValue = (key, value) => {
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  const dispatch = useDispatch();

  const submitForm = () => {
    console.log(formValues.language);
    if (validateSignup2(formValues)) {
      dispatch(
        isTrainer
          ? signUp({
              name: formValues.name,
              email: formValues.email,
              username: formValues.username,
              password: formValues.password,
              country: formValues.country,
              languages: formValues.language,
              experience: formValues.experience,
              bio: formValues.bio,
            })
          : signUp({
              name: formValues.name,
              email: formValues.email,
              username: formValues.username,
              password: formValues.password,
              country: formValues.country,
              languages: formValues.language,
              trainer: formValues.referralCode || "",
            })
      )
        .then(unwrapResult)
        .then((originalPromiseResult) => {
          const { user, token } = originalPromiseResult;
          console.log(token, user, "token-user");
          if (token && user) {
            dispatch(setProfile(user));
            isTrainer ? reset("Categories") : reset("Main");
          }
        })
        .catch((rejectedValue) => {
          console.log("rejectedValue: ", rejectedValue);
          if (rejectedValue === "Email already exists")
            showAlert({
              title: "Email Error",
              message:
                "Email already exists in database. \nPlease enter a different email.",
              alertType: "error",
              onPress: () => {
                goToSlide(0);
                inputRef.email.current?.focus();
              },
            });
          else
            showAlert({
              title: "Something went wrong!!",
              message: rejectedValue,
              alertType: "error",
            });
        });
    }
  };

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollView = useRef();

  const _onMomentumScrollEnd = (e) => {
    const offset = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offset / dimensions.width);
    if (newIndex === activeIndex) {
      return;
    }
    const lastIndex = activeIndex;
    setActiveIndex(newIndex);
  };
  const _onLayout = ({ nativeEvent }) => {
    const { width, height } = nativeEvent.layout;
    if (width !== dimensions.width || height !== dimensions.height) {
      // Set new width to update rendering of pages
      setDimensions({ width, height });
      // Set new scroll position
      const func = () => {
        scrollView.current?.scrollTo({
          x: activeIndex * width,
          animated: false,
        });
      };
      setTimeout(func, 0);
    }
  };
  const onNext = () => {
    if (validateSignup1(formFields, formValues)) goToSlide(1);
  };

  const goToSlide = (pageNum) => {
    const prevNum = activeIndex;
    setActiveIndex(pageNum);
    scrollView.current?.scrollTo({
      x: pageNum * dimensions.width,
    });
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
        <Image
          source={images.logo}
          style={[styles.logo, { marginTop: insets.top }]}
        />

        <MulishText semiBold style={styles.heading}>
          {_translate("signUp")}
        </MulishText>
        <MulishText style={styles.text}>
          {isTrainer
            ? `${_translate("welcomeFlexorTrainerMessage")}`
            : `${_translate("welcomeFlexorClientMessage")}`}
        </MulishText>

        <ScrollView
          ref={scrollView}
          contentContainerStyle={{}}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onMomentumScrollEnd={_onMomentumScrollEnd}
          onLayout={_onLayout}
        >
          <View style={styles.slide}>
            <StyledInput
              ref={inputRef["name"]}
              containerStyle={CommonStyles.input}
              placeholder={_translate("fullName")}
              keyboardType="default"
              returnKeyType="next"
              onEndEditing={(text) => onSubmitValue("name", text)}
              onSubmitEditing={() => inputRef.username.current.focus()}
            />
            <StyledInput
              ref={inputRef["username"]}
              containerStyle={CommonStyles.input}
              placeholder={_translate("userName")}
              keyboardType="default"
              returnKeyType="next"
              onEndEditing={(text) => onSubmitValue("username", text)}
              onSubmitEditing={() => inputRef.email.current.focus()}
            />

            <StyledInput
              ref={inputRef["email"]}
              containerStyle={CommonStyles.input}
              placeholder={_translate("emailAddress")}
              keyboardType="email-address"
              returnKeyType="next"
              onEndEditing={(text) => onSubmitValue("email", text)}
              onSubmitEditing={() => inputRef.password.current.focus()}
            />
            <PasswordInput
              ref={inputRef["password"]}
              placeholder={_translate("password")}
              onEndEditing={(text) => onSubmitValue("password", text)}
              onChangeText={(text) => onSubmitValue("password", text)}
              onSubmitEditing={() => inputRef.confirmPassword.current.focus()}
            />
            <PasswordInput
              ref={inputRef["confirmPassword"]}
              placeholder={_translate("confirmPassword")}
              onEndEditing={(text) => onSubmitValue("confirmPassword", text)}
              onChangeText={(text) => onSubmitValue("confirmPassword", text)}
            />
          </View>
          <View style={styles.slide}>
            {isTrainer && (
              <StyledInput
                placeholder={_translate("bio")}
                returnKeyType="done"
                onEndEditing={(text) => onSubmitValue("bio", text)}
                containerStyle={CommonStyles.input2}
                inputContainerStyle={{ height: 130 }}
                multiline={true}
                numberOfLines={3}
              />
            )}

            <StyledDropdown
              placeholder={_translate("country")}
              listTitle="Country"
              items={COUNTRIES}
              onSelectItem={(text) => onSubmitValue("country", text)}
            />

            <StyledDropdown
              placeholder={_translate("spokenLanguages")}
              listTitle="Languages"
              items={LANGUAGES}
              multiple
              onSelectItem={(items) => onSubmitValue("language", items)}
            />
            {/* <StyledDropdown
                  placeholder={'Another Spoken Language'}
                  items = {LANGUAGES}
                  listTitle='Language'
                  onSelectItem={(text) => onSubmitValue('secondLanguage', text)}
                  /> */}
            {isTrainer && (
              <StyledDropdown
                placeholder={_translate("totalExperience")}
                listTitle={"Experience"}
                items={EXPERIENCE}
                onSelectItem={(text) => onSubmitValue("experience", text)}
              />
            )}
            {!isTrainer && (
              <StyledInput
                ref={inputRef["experience"]}
                containerStyle={[CommonStyles.input, { width: wp("95%") }]}
                placeholder={_translate("trainerCode")}
                keyboardType="default"
                returnKeyType="done"
                onEndEditing={(text) => onSubmitValue("referralCode", text)}
                onSubmitEditing={() => {}}
              />
            )}
          </View>
        </ScrollView>

        <View style={styles.btnContainer}>
          <View style={[CommonStyles.row]}>
            {activeIndex == 0 ? <ActiveDot /> : <InactiveDot />}
            {activeIndex == 1 ? <ActiveDot /> : <InactiveDot />}
          </View>
          <PrimaryButton
            title={activeIndex == 0 ? "Next" : "Sign Up"}
            buttonStyle={{
              width: wp("85%"),
              height: 56,
              borderRadius: 10,
              marginVertical: hp("6%"),
            }}
            onPress={() => {
              activeIndex == 0 ? onNext() : submitForm();
            }}
            loading={activeIndex == 0 ? false : isLoading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const ActiveDot = () => <View style={styles.activeDot} />;
const InactiveDot = () => <View style={styles.inactiveDot} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
  activeDot: {
    width: 10,
    height: 10,
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  inactiveDot: {
    width: 10,
    height: 10,
    backgroundColor: "#C4C4C4",
    borderRadius: 5,
    marginHorizontal: 4,
  },
  btnContainer: {
    width: wp("100%"),
    height: hp("15%"),
    alignItems: "center",
    justifyContent: "space-between",
  },
  slide: {
    width: WIDTH,
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default withSafeAreaInsets(SignupScreen);

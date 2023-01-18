import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { showAlert } from "react-native-customisable-alert";
import { Image } from "react-native-elements";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import images from "../../assets/images";
import MulishText from "../../components/MulishText";
import PasswordInput from "../../components/PasswordInput";
import PrimaryButton from "../../components/PrimaryButton";
import RNToast from "../../components/RNToast";
import StyledInput from "../../components/StyledInput";
import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { hp, wp, AUTH_TOKEN, USER_DATA } from "../../constants/Constants";
import Icon from "../../constants/Icon";
import { navigate, reset } from "../../navigations/NavigationService";
import { signIn } from "../../redux/actions/AuthActions";
import { useIsLoading, useIstrainer } from "../../redux/reducers/AuthReducer";
import { setProfile } from "../../redux/reducers/ProfileReducer";
import { validateLoginForm } from "../../services/AuthValidation";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
// import {
//   LoginManager,
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
// } from 'react-native-fbsdk';
import { LoginManager, Profile, AccessToken } from "react-native-fbsdk-next";
import { socialLogin } from "../../services/FetchApiService";
import ApiService from "../../services/ApiService";
import LocalStorage from "../../services/LocalStorage";
import { translate } from "i18n-js";
import { _translate } from "../../localization";

const inputRef = {
  email: React.createRef(),
  password: React.createRef(),
};

function SigninScreen({ insets, route }) {
  const isTrainer = useIstrainer();
  const isLoading = useIsLoading();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const onSubmitValue = (key, value) => {
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  const dispatch = useDispatch();

  const submitForm = () => {
    if (validateLoginForm(formValues)) {
      dispatch(signIn(formValues))
        .then(unwrapResult)
        .then((originalPromiseResult) => {
          const { user, token } = originalPromiseResult;
          if (token && user) {
            RNToast.showShort("Signed In Successfully");
            dispatch(setProfile(user));
            reset("Main");
          }
        })
        .catch((rejectedValue) => {
          console.log("rejectedValue: ", rejectedValue);
          setFormValues({ ...formValues });
          showAlert({
            title: rejectedValue,
            message: rejectedValue,
            alertType: "error",
            onPress: () => {
              setFormValues({ ...formValues });
            },
          });
        });
    }
  };

  const googleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //   const tokens   = await GoogleSignin.getTokens()
      const { email, name, id, photo } = userInfo.user;

      socialLogin(
        isTrainer ? "trainer" : "client",
        {
          name,
          email,
          userId: id,
          image: photo,
        },
        (res) => {
          console.log(res);
          if (res) {
            if (res.token && res.user) {
              ApiService.setAuthHeader(res.token);
              LocalStorage.storeData(AUTH_TOKEN, res.token);
              LocalStorage.storeData(USER_DATA, res.user);
              RNToast.showShort("Signed In Successfully");
              dispatch(setProfile(res.user));
              reset("Main");
            } else {
              alert(res.message);
            }
          }
        }
      );
      // socialLoginHandler(email,name,id,photo)
    } catch (error) {
      console.log("errror", error);
    }
  };

  const _fbLogin = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.

    LoginManager.logInWithPermissions(["email", "public_profile"]).then(
      (result) => {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
              result.grantedPermissions.toString()
          );

          /*
          Profile.getCurrentProfile().then(
            function(currentProfile) {
              if (currentProfile) {
                const {imageURL,firstName,name, userID} =currentProfile
                // socialLogin(isTrainer?"trainer":"client",{
                //   name, email, userId: id, image: photo
                // },(res)=>{
                //   console.log(res)
                //   if(res){
                //     if(res.token && res.user){
                //       RNToast.showShort('Signed In Successfully')
                //       dispatch(setProfile(res.user))
                //       reset('Main')
                //     }else{
                //       alert(res.message)
                //     }
                //   }
                // })
                console.log("The current logged user is: " +
                  currentProfile.name
                  + ". His profile id is: " +
                  currentProfile.userID
                );
              }
            }
          );
          
          */

          AccessToken.getCurrentAccessToken().then((data) => {
            const { accessToken } = data;
            let token = accessToken.toString();
            return fetch(
              "https://graph.facebook.com/v2.5/me?fields=email,name,first_name,last_name,picture,id&access_token=" +
                token,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
              .then((response) =>
                response.json().then((facebookData) => {
                  // const fbData = JSON.stringify(facebookData);
                  const { url, firstName, name, id, email } = facebookData;
                  console.log(facebookData);
                  socialLogin(
                    isTrainer ? "trainer" : "client",
                    {
                      name,
                      email,
                      userId: id,
                      image: url,
                    },
                    (res) => {
                      if (res) {
                        if (res.token && res.user) {
                          ApiService.setAuthHeader(res.token);
                          LocalStorage.storeData(AUTH_TOKEN, res.token);
                          LocalStorage.storeData(USER_DATA, res.user);
                          RNToast.showShort("Signed In Successfully");
                          dispatch(setProfile(res.user));
                          reset("Main");
                        } else {
                          alert(res.message);
                        }
                      }
                    }
                  );
                })
              )
              .catch((err) => {
                console.log("FBERROR", err.message);
              });
          });
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  };

  // console.log({ formValues });
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

        <View style={styles.formContainer}>
          <MulishText semiBold style={styles.heading}>
            {_translate(`helloWelcome`)}
          </MulishText>
          <MulishText style={styles.text}>
            {isTrainer
              ? `${_translate("welcomeFlexorTrainerMessage")} `
              : `${_translate("welcomeFlexorClientMessage")}`}
          </MulishText>

          <StyledInput
            placeholder={_translate("emailAddress")}
            keyboardType="email-address"
            returnKeyType="next"
            onEndEditing={(text) => onSubmitValue("email", text)}
            onSubmitEditing={() => inputRef.password.current.focus()}
            containerStyle={CommonStyles.input}
          />

          <PasswordInput
            ref={inputRef["password"]}
            placeholder={_translate("password")}
            onEndEditing={(text) => onSubmitValue("password", text)}
            returnKeyType="done"
          />

          <TouchableOpacity
            style={{ alignSelf: "flex-end", marginVertical: hp("3%") }}
            onPress={() => {
              // navigate("ForgetPassword");
              navigate(_translate("ForgetPassword"));
            }}
          >
            <MulishText color="#0A2049">{`Forgot Password?`}</MulishText>
          </TouchableOpacity>

          <PrimaryButton
            title={"Login"}
            buttonStyle={{
              width: wp("80%"),
              height: 56,
              borderRadius: 10,
              marginBottom: hp("1%"),
            }}
            onPress={submitForm}
            loading={isLoading}
          />

          <Pressable
            style={{ marginVertical: hp("3%") }}
            onPress={() => {
              navigate("Signup", { isTrainer });
            }}
          >
            <MulishText color="rgba(0,0,0,0.76)">
              {`Dont have an account?  `}
              <MulishText bold fontSize={16}>
                {"Sign Up"}
              </MulishText>
            </MulishText>
          </Pressable>

          <MulishText color="#0A2049" bold>
            {"OR"}
          </MulishText>

          <View style={CommonStyles.row}>
            <Pressable
              style={{ marginVertical: hp("3%"), marginRight: 20 }}
              onPress={googleSignin}
            >
              <Image source={images.google} style={styles.google} />
            </Pressable>
            <Pressable style={{ marginVertical: hp("3%") }} onPress={_fbLogin}>
              <Icon.Evil name="sc-facebook" size={30} color="#4F85ED" />
            </Pressable>
          </View>
        </View>
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

export default withSafeAreaInsets(SigninScreen);

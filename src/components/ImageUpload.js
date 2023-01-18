import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ReactNativeModal from 'react-native-modal';
import { _translate } from "../localization"

import {
  requestStoragePermission,
  checkCameraPermission,
} from '../services/AppPermissions';
import Colors from '../constants/Colors';
import {AUTH_TOKEN, IS_TRAINER, WIDTH} from '../constants/Constants';
import {Icon, LinearProgress, ListItem} from 'react-native-elements';
import MulishText from './MulishText';
import { showAlert } from 'react-native-customisable-alert';
import LocalStorage from '../services/LocalStorage';

const PICTURE_OPTIONS = ['Take Picture', 'Open Image Gallery'];

export default function ImageUpload({
  showPicker,
  closePicker,
  onUpload,
}) {

  const [cameraPermission, setCameraPermission] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (Platform.OS == 'android') {
      (async () => {
        const granted = await checkCameraPermission();
        setCameraPermission(granted);
      })();
    }
  }, []);

  const openCamera = () => {
    if (Platform.OS == 'ios') {
      launchCamera(
        {
          noData: true,
          cameraType: 'front',
          mediaType: 'photo',
          tintColor: Colors.primaryColor,
          maxWidth     : 500,
          maxHeight    : 500,
          includeBase64: true,
          storageOptions: {
            skipBackup: true,
            cameraRoll: true,
          },
        },
        (response) => {
          console.log('Image Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled CAMERA');
          } else if (response.errorMessage) {
            console.log('LAUNCH CAMERA Error: ', response.errorMessage);
            alert(response.errorMessage);
          } else if(response.assets){
            onPickImage(response.assets[0]);
          }
        },
      );
    } else {
      if (cameraPermission) {
        launchCamera(
          {
            noData: true,
            cameraType: 'front',
            mediaType: 'photo',
            tintColor: Colors.primaryColor,
            maxWidth     : 500,
            maxHeight    : 500,
            includeBase64: true,
            storageOptions: {
              skipBackup: true,
              cameraRoll: true,
            },
          },
          (response) => {
            console.log('Image Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled CAMERA');
            } else if (response.errorMessage) {
              console.log('LAUNCH CAMERA Error: ', response.errorMessage);
              alert(response.errorMessage);
            } else if(response.assets){
              onPickImage(response.assets[0]);
            }
          },
        );
      } else alert('Permission not granted!');
    }
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        noData: true,
        cameraType: 'front',
        mediaType: 'photo',
        tintColor: Colors.primaryColor,
        maxWidth     : 500,
        maxHeight    : 500,
        includeBase64: true,
        storageOptions: {
          skipBackup: true,
          cameraRoll: true,
        },
      },
      (response) => {
        console.log('Image Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled GALLERY');
        } else if (response.errorMessage) {
          console.log('OPEN GALLERY Error: ', response.errorMessage);
          alert(response.errorMessage);
        } else if(response.assets){
          onPickImage(response.assets[0]);
        }
      },
    );
  };

  const onPickImage = async (image) => {
    console.log('image: ', image);
    if(image){
        const formData = new FormData();
        const uriParts = image.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('image',{
          uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
          name: image.fileName,
          type: `image/${fileType}` // or your mime type what you want
        });
      const token = await LocalStorage.getData(AUTH_TOKEN); 
      const isTrainer = await LocalStorage.getData(IS_TRAINER); 
      console.log('isTrainer: ', isTrainer);
      try {
        setUploading(true)
        let response = await fetch(
          `https://flexor.is/api/${isTrainer?'trainer':'client'}/upload-image`,
          {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'multipart/form-data',
                  'x-auth-token': token
              },
               body: formData
          }
        );
          const result = await response.json();
          console.log('data: ', result);
          if(result && result.success === true){
            onUpload(result.url)
          }
          else if(result.message){
            showAlert({
              title: 'Error!',
              message: result.message,
              alertType: 'error'
            })    
            onUpload(null)
          }
      } catch (error) {
        console.error({error});
        showAlert({
          title: `${_translate("Something went wrong!")}`,
          message: error,
          alertType: 'error'
        })
        onUpload(null);
      } finally {
        setUploading(false)
      }
    }
  }  
//   const uploadImage = async (imagebase) => {
//     setUploading(true)    
//     const clientId = "9c059832fa1e968";
//     const auth = `Client-ID ${  clientId}`;
//     const formData = new FormData();
//     formData.append("image", imagebase);
//     formData.append("type", "base64");
//     try {
//       const result = await fetch("https://api.imgur.com/3/image", {
//         method: 'POST',
//         body: formData,
//         headers: {
//           Accept: 'application/json',
//           Authorization: auth,
//         },
//       })
//       const response_body = await result.json();
//       return response_body.data.link
//     } catch (error) {
//       console.log('Error uploading image: ', error);
//       showAlert({
//         title: 'Something went wrong!',
//         message: error,
//         alertType: 'error'
//       })
//     } finally {
//       setUploading(false)
//     }
// };

  return (
    <>
      <ReactNativeModal
        isVisible={uploading}
        backdropOpacity={0.5}
      >
        <View style={styles.modal}>
          <Text style={styles.headingText}>
            {_translate("Photo Upload")}{' '}
          </Text>
          <LinearProgress
            variant="indeterminate"
            color={Colors.primaryColor}
            style={{width: WIDTH - 50, height: 6, borderRadius: 10}}
          />
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        isVisible={showPicker}
        backdropOpacity={0.5}
        onBackButtonPress={closePicker}
        onBackdropPress={closePicker}>
        <View style={styles.modal2}>
          <Text style={styles.headingText2}>{_translate("Select Image")} </Text>
          <ListItem style={{ width: WIDTH - 60, height: 40 }}
            onPress={() => {
              closePicker();
              openCamera();
            }}
            Component={TouchableOpacity}
            >
                <Icon name={'camera'} type='font-awesome' color={'#bbb'} size={18} containerStyle={{width: 22, height: 20}}/>
                <ListItem.Content>
                <ListItem.Title><MulishText semiBold fontSize={15} color='#333'>{PICTURE_OPTIONS[0]}</MulishText></ListItem.Title>
                </ListItem.Content>
          </ListItem>
          <ListItem style={{ width: WIDTH - 60, height: 40 }}
            onPress={() => {
              // closePicker();
              openGallery();
            }}
            Component={TouchableOpacity}
            >
                <Icon name={'image'} type='font-awesome' color={'#bbb'} size={20} containerStyle={{width: 22, height: 20}}/>
                <ListItem.Content>
                <ListItem.Title><MulishText semiBold fontSize={15} color='#333'>{PICTURE_OPTIONS[1]}</MulishText></ListItem.Title>
                </ListItem.Content>
          </ListItem>
        </View>
      </ReactNativeModal>
    </>
  );
}
const styles = StyleSheet.create({
  modal: {
    width: WIDTH - 30,
    height: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 14,
    padding: 10,
    elevation: 8,
  },
  modal2: {
    width: WIDTH - 30,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 14,
    padding: 10,
    elevation: 8,
  },
  headingText: {
    color: Colors.primaryColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headingText2: {
    color: Colors.primaryColor,
    fontSize: 20,
    fontWeight: 'bold',
    width: WIDTH - 80,
    height: 30,
  },
});

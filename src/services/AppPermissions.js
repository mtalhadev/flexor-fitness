import {PERMISSIONS, request, check, RESULTS, checkMultiple} from 'react-native-permissions';
import { PermissionsAndroid, Platform } from 'react-native';

export async function isLocationPermissionGranted() {
  try {
    const result = await check(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      })
    )
    switch (result) {
      case RESULTS.UNAVAILABLE:
        alert('This feature is not available on this device.');
        return;
      case RESULTS.DENIED:
        return (await requestPermission())==='granted'
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        return true
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        return false
    }
  } catch (error) {
      console.log('Check permission error: ', error);
      return false
  }
}
  export const requestPermission = async () => {
    const status = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      })
    );
    return status
  };

  export function checkContactsPermission(callback) {
    check(PERMISSIONS.ANDROID.READ_CONTACTS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            alert('This feature is not available on this device.');
            break;
          case RESULTS.DENIED:
            requestContactsPermission(callback);
          break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            callback();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log('Check permission error: ', error);
      });
  }
  const requestContactsPermission = async (callback) => {
    const status = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.READ_CONTACTS,
        ios: PERMISSIONS.IOS.CONTACTS,
      }),
    );
    if(status==='granted') callback && callback();
  };

  // SMS
  export const requestSMSPermission = async (callback) => {
    const status = await request(PERMISSIONS.ANDROID.READ_SMS);
    if(status==='granted') callback &&callback();
  };

  export function checkSMSPermission(callback) {
    check(PERMISSIONS.ANDROID.READ_SMS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            alert('This feature is not available on this device.');
            break;
          case RESULTS.DENIED:
            requestSMSPermission(callback);
          break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            callback();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log('Check permission error: ', error);
      });
  }

  const requestCameraPermission = async () => {
    const status = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      })
    );
    return status
  };
  export const requestStoragePermission = async () => {
    const status = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    return status
  };
  export const checkAllPermissions = async () => {
    try {
        await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]);
        if ((await PermissionsAndroid.check('android.permission.CAMERA')) &&
            (await PermissionsAndroid.check('android.permission.READ_EXTERNAL_STORAGE')) &&
            (await PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE'))) {
            console.log('You can use the camera');
            return true;
        } else {
            console.log('all permissions denied');
            return false;
        }
    } catch (err) {
        console.warn(err);
    }
};

  export async function  checkCameraPermission() {
    let permissionGranted1 = false, permissionGranted2=false;
    try {
      const status = await checkMultiple(
        Platform.select({
          android: [PERMISSIONS.ANDROID.CAMERA,PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE],
          ios: [PERMISSIONS.IOS.CAMERA,],
        })
      );
      switch (status["android.permission.CAMERA"]) {
        case RESULTS.UNAVAILABLE:
          alert('This feature is not available on this device.');
          break;
        case RESULTS.DENIED:
          console.log('Camera permission is denied');
          permissionGranted1 = (await requestCameraPermission())==='granted';
        break;
        case RESULTS.GRANTED:
          console.log('Camera permission is granted');
          permissionGranted1=true;
            break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
      switch (status["android.permission.WRITE_EXTERNAL_STORAGE"]) {
        case RESULTS.UNAVAILABLE:
          alert('This feature is not available on this device.');
          break;
        case RESULTS.DENIED:
          console.log('Storage permission is denied');
          permissionGranted2 = (await requestStoragePermission()) === 'granted';
        break;
        case RESULTS.GRANTED:
          console.log('Storage permission is granted');
          permissionGranted2=true
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
      return permissionGranted1 && permissionGranted2;
    } catch (error) {
      console.log('Check permission error: ', error);
    }

  }

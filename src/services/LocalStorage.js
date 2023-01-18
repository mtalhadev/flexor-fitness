import AsyncStorage from "@react-native-async-storage/async-storage";

const LocalStorage = {
    storeData: async (KEY, data) => {
        try {
          await AsyncStorage.setItem(KEY, JSON.stringify(data))
        } catch (e) {
          // saving error
          console.log('Storage error: ', e);
        }
      },
    getData: async (KEY) => {
        try {
          const value = await AsyncStorage.getItem(KEY)
          // console.log(value);
          if(value !== null) {
              return JSON.parse(value);
            }
            else {
                return null
            }
        } catch(e) {
            console.log('Storage retrieve error: ', e);
        }
        return null;
      },
    updateArrayData: async (KEY, newData=[]) => {
      let newArray = [];
      try {
        const value = await AsyncStorage.getItem(KEY)
        if(value !== null) {
            newArray = JSON.parse(value);
        }
      } catch (e) {
        // saving error
        console.log('Storage error: ', e);
        return e;
      }
      newArray = newArray.concat(newData);
      try {
        AsyncStorage.setItem(KEY, JSON.stringify(newArray))
      } catch (e) {
      // saving error
        console.log('Storage error: ', e);
        return e;
      }
      return null;
    },
    removeFromArray: async (KEY, shopId) => {
      let newArray = [];
      try {
        const value = await AsyncStorage.getItem(KEY)
        if(value !== null) {
            newArray = JSON.parse(value);
        }
      } catch (e) {
        // saving error
        console.log('Storage error: ', e);
        return e;
      }
      newArray = newArray.filter(item => item.shopId !== shopId);
      try {
        AsyncStorage.setItem(KEY, JSON.stringify(newArray))
      } catch (e) {
      // saving error
        console.log('Storage error: ', e);
        return e;
      }
      return null;
    },
    updateObject: async (KEY, field, value) => {
      let object;
      try {
        const value = await AsyncStorage.getItem(KEY)
        if(value !== null) {
            object = JSON.parse(value);
        }
      } catch (e) {
        // saving error
        console.log('Storage error: ', e);
      }
      if(object) object[field] = value;
      AsyncStorage.setItem(KEY, JSON.stringify(object))
    },
    delete: async (KEY) => {
      AsyncStorage.removeItem(KEY);
    }
}

export default LocalStorage

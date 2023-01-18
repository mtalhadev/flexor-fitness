import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiService from '../../services/ApiService';
import LocalStorage from '../../services/LocalStorage';
import { USER_DATA } from '../../constants/Constants'

export const fetchMyProfile = createAsyncThunk(
  'profile/fetchMyProfile',
  async (payload, thunkAPI) => {
    const isTrainer = thunkAPI.getState().Auth.isTrainer
    const user = thunkAPI.getState().Auth.user;
    const userId = user?._id; 
    try {
      let res = isTrainer ? await ApiService.trainer.getProfile(userId) : await ApiService.client.getProfile(userId);
      if (res.data) {
        const { success,  user } = res.data;
        if(success == true) {
            return user;
        } else {
            return thunkAPI.rejectWithValue(res.data.message)
        }
      }
      else {
        return thunkAPI.rejectWithValue(`Request failed with status code: ${res.status}`)
      }  
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
    }
  }
)

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (payload, thunkAPI) => {
    console.log('payload: ', payload);
    const isTrainer = thunkAPI.getState().Auth.isTrainer
    try {
      let res = isTrainer ? await ApiService.trainer.updateProfile(payload) : await ApiService.client.updateProfile(payload);
      if (res.status === 200) {
        const { success,  updatedUser } = res.data;
        if(success == true) {
            return updatedUser;
        } else {
            return thunkAPI.rejectWithValue(res.data.message)
        }
      }
      else {
        return thunkAPI.rejectWithValue(`Request failed with status code: ${res.status}`)
      }  
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed: ${error}`)
    }
  }
)
export const updateMembership = createAsyncThunk(
  "profile/updateMembership",
  async (payload, thunkAPI) => {
    console.log("payload: ", payload);
    try {
      let res = await ApiService.trainer.updateMembership(payload);
      if (res.data && res.data.success) {
        const { updatedUser } = res.data;
        LocalStorage.storeData(USER_DATA, updatedUser);
        return updatedUser;
      } else {
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed: ${error}`);
    }
  }
);
export const fetchMemberships = createAsyncThunk(
  'profile/fetchMemberships',
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.trainer.getMemberships();
      if (res.data && res.data.success) {
          return res.data.membership;
      } else {
          return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
    }
  }
)

export const fetchTrainerProfile = createAsyncThunk(
  'profile/fetchTrainerProfile',
  async (payload, thunkAPI) => {
    const trainerId = payload; 
    let user;
    try {
      let res = await ApiService.client.get(trainerId);
      let res2 = await ApiService.client.getReviews(trainerId);
      if (res.data && res.data.success) {
          user = res.data.user;
      } else {
          return thunkAPI.rejectWithValue(res.data.message)
      }
      if (res2.data && res2.data.success) {
        user.reviews = res2.data.reviews;
      } else {
          return thunkAPI.rejectWithValue(res2.data.message)
      }
      return user;
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
    }
  }
)

////////////////// Client Actions \\\\\\\\\\\\\\\\\

export const fetchMyPrograms = createAsyncThunk(
  'profile/fetchMyPrograms',
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.client.getMyPrograms();
      if (res.data) {
        const { success, programs } = res.data;
        
        if(success == true) {
          const myPrograms = programs?.filter(item => item.isClass === false); 
          const myClasses = programs?.filter(item => item.isClass === true);         
          return { myPrograms, myClasses };
        } else {
            return thunkAPI.rejectWithValue(res.data.message)
        }
      }
      else {
        return thunkAPI.rejectWithValue(`Request failed with status code: ${res.status}`)
      }  
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed: ${error}`)
    }
  }
  )


  /////////////// Trainer Profile Actions \\\\\\\\\\\\\\\\

  export const fetchPrograms = createAsyncThunk(
    'profile/fetchPrograms',
    async (payload, thunkAPI) => {
      try {
        let res = await ApiService.trainer.getPrograms();
        if (res.data && res.data.success) {
          return res.data.programs || [];
        } else {
          return thunkAPI.rejectWithValue(res.data.message);
        }
      } catch (error) {
        console.log({ error });
        return thunkAPI.rejectWithValue(`Request failed with error: ${error}`);
      }
    }
  )
  export const fetchClasses = createAsyncThunk(
    'profile/fetchClasses',
    async (payload, thunkAPI) => {
      try {
        let res = await ApiService.trainer.getClasses()
        if (res.data && res.data.success) {
          return res.data.classes || [];
        } else {
          return thunkAPI.rejectWithValue(res.data.message)
        }
      } catch (error) {
        console.log({ error });
        return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
      }
    }
  )
  export const fetchReviews = createAsyncThunk(
    'profile/fetchReviews',
    async (payload, thunkAPI) => {
      try {
        let res = await ApiService.trainer.getReviews();
        if (res.data && res.data.success) {
          const { reviews } = res.data;
          console.log({ reviews });
          if(reviews)
            return typeof (reviews) === 'object' ? [reviews] : Array.isArray(reviews) ? reviews : [];
          else return [];
        }
        else {
          return thunkAPI.rejectWithValue(res.data.message)
        }  
      } catch (error) {
        console.log({ error });
        return thunkAPI.rejectWithValue(`Request failed. ${error}`)
      }
    }
  )

    
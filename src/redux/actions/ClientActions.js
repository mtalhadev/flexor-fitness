import { createAsyncThunk } from '@reduxjs/toolkit'
import RNToast from '../../components/RNToast';
import ApiService from '../../services/ApiService';
import { loadCategories } from '../../services/FetchApiService';
import { setProfile, updateSubscribedTrainers } from '../reducers/ProfileReducer';


export const fetchHomeData = createAsyncThunk(
  'client/fetchHomeData',
  async (payload, thunkAPI) => {
    const pg = payload;
    let classes = [];
    try {
      let res = await ApiService.client.getAllClasses(pg); 
      if (res.data && res.data.success == true) {
        classes = res.data.classes;
      }
      return { page: pg, classes };
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed: ${error}`)
    }
  }
)


/////////////////////// get All Programs \\\\\\\\\\\\\\\\\\\\\\\\\\

export const fetchProgramData = createAsyncThunk(
  'client/fetchProgramData',
  async (payload, thunkAPI) => {
    const pg = payload;
    let programs = [];
    try {
      let res = await ApiService.client.getAllPrograms(pg);
      if (res.data && res.data.success == true) {
        programs  = res.data.programs;
      }
      return { page: pg, programs };
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed: ${error}`)
    }
  }
)


/////////////////////// Program Purchasing \\\\\\\\\\\\\\\\\\\\\\\\\\

export const purchaseProgram = createAsyncThunk(
  'client/purchaseProgram',
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.client.purchaseProgram(payload);
      if (res.data) {
        console.log('purchaseProgram res.data: ', res.data);
        const { success, raypdRedirectUrl } = res.data;
        if (success == true && raypdRedirectUrl) {
          return raypdRedirectUrl;
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
/////////////////////// Class Purchasing \\\\\\\\\\\\\\\\\\\\\\\\\\

export const purchaseClass = createAsyncThunk(
  'client/purchaseClass',
  async (payload, thunkAPI) => {
    const { trainerId } = payload;
    console.log('payload: ', payload);
    try {
      let res = await ApiService.client.purchaseClass(payload);
      if (res.data) {
        console.log('purchaseClass res.data: ', res.data);
        const { success, raypdRedirectUrl } = res.data;
        if (success == true && raypdRedirectUrl) {
          return raypdRedirectUrl;
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
export const cancelSubscription = createAsyncThunk(
  'client/cancelSubscription',
  async (payload, thunkAPI) => {
    const trainerId = payload;
    console.log('payload: ', payload);
    try {
      let res = await ApiService.client.cancelSubscription(trainerId);
      if (res.data) {
        console.log('cancelSubscription res.data: ', res.data);
        const { success } = res.data;
        if (success) {
          RNToast.showShort('Subscription Cancelled');
          return true;
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

/////////////////////// Payment History \\\\\\\\\\\\\\\\\\\\\\\\\\

export const fetchPaymentHistory = createAsyncThunk(
  'client/fetchPaymentHistory',
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.client.getPayments();
      console.log('client/fetchPaymentHistory res.data: ', res.data);
      if (res.data && res.data.success) {
        return res.data.orders || [];
      } else {
        return thunkAPI.rejectWithValue(res.data?.message)
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
    }
  }
)


/////////////////////// Trainer Search \\\\\\\\\\\\\\\\\\\\\\\\\\

export const searchTrainers = createAsyncThunk(
  'client/searchTrainers',
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.client.searchTrainers(payload);
      console.log("FILTERED RES", res.data)
      if (res.data && res.data.success == true) {
        return res.data.users || [];
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed: ${error}`)
    }
  }
)

/////////////////////// Trainer Booking \\\\\\\\\\\\\\\\\\\\\\\\\\

export const toggleSendRequest = createAsyncThunk(
  'client/toggleSendRequest',
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.client.bookTrainer(payload);
      if (res.data) {
        const { success } = res.data;
        if (success == true) {
          return true;
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


//////////////////// Training Schedule & Booking \\\\\\\\\\\\\\\\\\\\\\\

export const fetchTrainerSchedule = createAsyncThunk(
  'client/fetchTrainerSchedule',
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.client.getTrainerSlots(payload);
      if (res.data && res.data.success) {
        const { booking } = res.data;
        return booking?.schedule || [];
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed: ${error}`)
    }
  }
)

export const bookTrainingSlot = createAsyncThunk(
  'client/bookTrainingSlot',
  async (payload, thunkAPI) => {
    const { trainerId, slot } = payload;
    try {
      let res = await ApiService.client.bookSlot(trainerId, slot);
      if (res.data && res.data.success) {
        const { updatedCalendar } = res.data;
        return updatedCalendar?.schedule || [];
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed: ${error}`)
    }
  }
)

/////////////////////// Workout Exercises \\\\\\\\\\\\\\\\\\\\\\\\\\

export const fetchExercises = createAsyncThunk(
  'client/fetchExercises',
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.client.getExercises();
      if (res.data && res.data.success == true) {
        return res.data.exercises || [];
      }
      else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed: ${error}`)
    }
  }
)

export const searchExercise = createAsyncThunk(
  'client/searchExercise',
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.client.searchExercise(payload);
      if (res.data && res.data.success == true) {
        return res.data.exercises || [];
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed: ${error}`)
    }
  }
)

/////////////////////// Client Own Workout \\\\\\\\\\\\\\\\\\\\\\\\\\

export const fetchWorkout = createAsyncThunk(
  'client/fetchWorkout',
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.client.getWorkouts();
      if (res.data && res.data.success == true) {
        return res.data.workouts || [];
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed: ${error}`)
    }
  }
)

export const createWorkout = createAsyncThunk(
  'client/createWorkout',
  async (payload, thunkAPI) => {
    try {
      console.log('=========> workout: ', JSON.stringify(payload));
      let res = await ApiService.client.addWorkout(payload);
      if (res.data && res.data.success == true) {
        return res.data.workouts || [];
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed: ${error}`)
    }
  }
)



// Program Category List

export const fetchCategoryList = createAsyncThunk(
  'client/fetchCategoryList',
  async (payload, thunkAPI) => {
    try {
      let res = await loadCategories(payload);
      res = JSON.parse(res)
      if (res.success) {
        return res.categories || [];
      } else {
        return thunkAPI.rejectWithValue(res.message)
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed: ${error}`)
    }
  }
)

// Trainer Programs List

export const fetchTrainerPrograms = createAsyncThunk(
  'client/fetchTrainerPrograms',
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.client.getTrainerPrograms(payload);
      if (res.data) {
        const { success, programs } = res.data;
        console.log('fetchTrainerPrograms res.data: ', res.data)
        if (success == true) {
          return programs;
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
// Trainer Classes List

export const fetchTrainerClasses = createAsyncThunk(
  'client/fetchTrainerClasses',
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.client.getTrainerClasses(payload);
      if (res.data) {
        const { success, programs } = res.data;
        console.log('fetchTrainerClasses res.data: ', res.data)
        if (success == true) {
          return programs;
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

// Trainer Reviews

export const fetchTrainerReviews = createAsyncThunk(
  'client/fetchTrainerReviews',
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.client.getTrainerReviews(payload);
      if (res.data) {
        const { success, reviews } = res.data;
        console.log('fetchTrainerReviews res.data: ', res.data)
        if (success == true) {
          if (!reviews) return [];
          else return typeof (reviews) === 'object' ? [reviews] : Array.isArray(reviews) ? reviews : [];
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

export const addReview = createAsyncThunk(
  'client/addReview',
  async (payload, thunkAPI) => {
    try {
      console.log('=========> review: ', JSON.stringify(payload));
      let res = await ApiService.client.addReview(payload);
      if (res.data && res.data.success == true && res.data.message === 'Review Added successfully') {
        RNToast.showShort('Successfully Submitted')
        return true;
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed: ${error}`)
    }
  }
)

export const updateVideoViewed = createAsyncThunk(
  'client/updateVideoViewed',
  async (payload, thunkAPI) => {
    console.log('payload: ', payload)
    try {
      let res = await ApiService.client.updateVideoView(payload);
      if (res.data) {
        const { success } = res.data;
        if (success == true) {
          return true;
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


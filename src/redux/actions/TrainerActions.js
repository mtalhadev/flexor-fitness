import { createAsyncThunk } from '@reduxjs/toolkit'
import RNToast from '../../components/RNToast';
import ApiService from '../../services/ApiService';

export const fetchTrainerData = createAsyncThunk(
  'trainer/fetchTrainerData',
  async (payload, thunkAPI) => {
    const user = thunkAPI.getState().Auth.user
    const userId = user?._id; 
    try {
      let res = await ApiService.trainer.getProfile(userId);
      if (res.data && res.data.success) {
        const user = res.data.user;
        const { clients, requests } = user || { clients: [], requests: [] }; 
        return { clients, requests }
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
    }
  }
)

export const deleteClient = createAsyncThunk(
  'trainer/deleteClient',
  async (payload, thunkAPI) => {
    console.log('payload: ', payload);
    const clientID = payload; 
    try {
      let res = await ApiService.trainer.deleteClient(clientID);
      if (res.data) {
        const { success } = res.data;
        if(success == true) {
            return clientID;
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

  export const handleClientRequest = createAsyncThunk(
    'trainer/handleClientRequest',
    async (payload, thunkAPI) => {
      try {
        let res = await ApiService.trainer.handleRequest(payload);
        if (res.data && res.data.success) {
          const updatedTrainer = res.data.updatedTrainer;
          const { clients, requests } = updatedTrainer || { clients: [], requests: [] }; 
          return { clients, requests }
        } else {
          return thunkAPI.rejectWithValue(res.data.message)
        }
      } catch (error) {
        console.log({ error });
        return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
      }
    }
  )
  
  export const fetchPaymentHistory = createAsyncThunk(
    'trainer/fetchPaymentHistory',
    async (payload, thunkAPI) => {
      const isTrainer = thunkAPI.getState().Auth.isTrainer;
      try {
        let res = isTrainer ? await ApiService.trainer.getPayments() : ApiService.client.getPayments();
        if (res.data && res.data.success) {
          return res.data.charges || [];
        } else {
          return thunkAPI.rejectWithValue(res.data.message)
        }
      } catch (error) {
        console.log({ error });
        return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
      }
    }
  )
    
  export const fetchTrainerSchedule = createAsyncThunk(
    'trainer/fetchTrainerSchedule',
    async (payload, thunkAPI) => {
      try {
        let res = await ApiService.trainer.getClasses()
        let res2 = await ApiService.trainer.getReminder()
        let res3 = await ApiService.trainer.getTrainingTime()
        
        let classes = [], trainingTimes = [], reminders = [];
        if (res.data && res.data.success == true) {
          classes = res.data.classes || [];
        }
        if (res2.data && res2.data.success == true) {
          reminders = res2.data.reminders || [];
        } 
        if (res3.data && res3.data.success == true) {
          trainingTimes = res3.data.trainingTimes;
        } 
        return { classes, reminders, trainingTimes };
      } catch (error) {
        console.log({ error });
        return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
      }
    }
  )
    
  export const postReminder = createAsyncThunk(
    'trainer/postReminder',
    async (payload, thunkAPI) => {
      console.log('payload: ', payload);
      try {
        let res = await ApiService.trainer.addReminder(payload);
        if (res.data && res.data.success) {
          RNToast.showShort(res.data.message);
          return res.data.reminder;
        } else {
            return thunkAPI.rejectWithValue(res.data.message)
        }
      } catch (error) {
        console.log({ error });
        return thunkAPI.rejectWithValue(`Request failed: ${error}`)
      }
    }
  )
  
  // export const fetchTrainingTime = createAsyncThunk(
  //   'trainer/fetchTrainingTime',
  //   async (payload, thunkAPI) => {
  //     try {
  //       let res = await ApiService.trainer.getTrainingTime()
  //       if (res.data && res.data.success) {
  //         return res.data.trainingTimes || [];
  //       } else {
  //         return thunkAPI.rejectWithValue(res.data.message)
  //       }
  //     } catch (error) {
  //       console.log({ error });
  //       return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
  //     }
  //   }
  // )
  
  export const postTrainingTime = createAsyncThunk(
    'trainer/postTrainingTime',
    async (payload, thunkAPI) => {
      console.log('payload: ', payload);
      try {
        let res = await ApiService.trainer.addTrainingTime(payload);
        if (res.data && res.data.success) {
          RNToast.showShort(res.data.message);   
          return res.data.trainingTime;
        } else {
            return thunkAPI.rejectWithValue(res.data.message)
        }
      } catch (error) {
        console.log({ error });
        return thunkAPI.rejectWithValue(`Request failed: ${error}`)
      }
    }
  )

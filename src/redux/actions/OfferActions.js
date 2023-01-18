import { createAsyncThunk } from '@reduxjs/toolkit'
import RNToast from '../../components/RNToast';
import ApiService from '../../services/ApiService';

export const fetchOffers = createAsyncThunk(
    'offers/fetchOffers',
    async (payload, thunkAPI) => {
      const isTrainer = thunkAPI.getState().Auth.isTrainer
      try {
        let res = isTrainer ?  await ApiService.trainer.getOffers() : await ApiService.client.getOffers();
        if (res.data && res.data.success) {
          const { offers  } = res.data;
          console.log({offers});
          return offers
        }
        else {
          return thunkAPI.rejectWithValue(res.data.message)
        }  
      } catch (error) {
        console.log({ error });
        return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
      }
    }
  )
  export const purchaseOffer = createAsyncThunk(
    'client/purchaseOffer',
    async (payload, thunkAPI) => {
      console.log('payload: ', payload);
      try {
        let res = await ApiService.client.purchaseOffer(payload);
        if (res.data) {
          console.log('purchaseOffer res.data: ', res.data);
          const { success, raypdRedirectUrl } = res.data;
          if(success == true && raypdRedirectUrl) {
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
    
  
import { createAsyncThunk } from "@reduxjs/toolkit";
import RNToast from "../../components/RNToast";
import { goBack } from "../../navigations/NavigationService";
import ApiService from "../../services/ApiService";

// export const addPaymentDetails = createAsyncThunk(
//   "trainer/raypd-make-wallet",
//   async (payload, thunkAPI) => {
//     console.log("payload", payload);
//     const isTrainer = thunkAPI.getState().Auth.isTrainer;
//     if (!isTrainer) {
//       return;
//     }
//     try {
//       let res = isTrainer
//         ? await ApiService.trainer.addPaymentDetail(payload)
//         : await ApiService.client.addPaymentDetail(payload);
//       if (res.data && res.data.success) {
//         const { data } = res.data;
//         console.log({ data });
//       } else {
//         return thunkAPI.rejectWithValue(res.data.message);
//       }
//     } catch (error) {
//       console.log({ error });
//       return thunkAPI.rejectWithValue(`Request failed with error: ${error}`);
//     }
//   }
// );

export const addPaymentDetails = createAsyncThunk(
  "trainer/raypd-make-wallet",
  async (payload, thunkAPI) => {
    console.log("addPaymentDetails payload: ", payload);
    try {
      let res = await ApiService.trainer.addPaymentDetail(payload);
      if (res.data && res.data.success) {
        console.log(res.data.message);
        RNToast.showShort(res.data.message);
        return res.data;
      } else {
        console.log("error response",res);
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(`Request failed: ${JSON.parse(error.request._response).error}`);
    }
  }
);

export const getWalletDetail = createAsyncThunk(
  "trainer/wallet-details",
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.trainer.getPaymentDetail();
      if (res.data && res.data.success) {
        const { walletDetails } = res.data;
        console.log("walletDetails", { walletDetails });
        return walletDetails;
      } else {
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed. ${error}`);
    }
  }
);

export const changeWalletDetails = createAsyncThunk(
  "/trainer/raypd-update-wallet/",
  async (payload, thunkAPI) => {
    console.log("payload: ", payload);
    try {
      let res = await ApiService.trainer.changePaymentDetail(payload);
      if (res.data && res.data.success) {
        console.log(res.data.message);
        RNToast.showShort(res.data.message);
        goBack();
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed: ${JSON.parse(error.request._response).error}`);
    }
  }
);

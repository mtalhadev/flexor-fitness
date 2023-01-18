import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  addPaymentDetails,
  getWalletDetail,
  changeWalletDetails,
} from "../actions/PaymentAction";

export const paymentDetailSlice = createSlice({
  name: "paymentDetail",
  initialState: {
    isLoading: false,
    getWalletLoading: false,
    error: null,
    walletDetail: {},
  },
  reducers: {},
  extraReducers: {
    // addPaymentDetal action type
    [addPaymentDetails.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addPaymentDetails.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addPaymentDetails.rejected]: (state, action) => {
      state.isLoading = false;
      //   state.data = null;
      //   state.error = action.payload;
    },

    //getWalletDetail Action Type
    [getWalletDetail.pending]: (state, action) => {
      state.getWalletLoading = true;
    },
    [getWalletDetail.fulfilled]: (state, action) => {
      state.walletDetail = action.payload || {};
      state.getWalletLoading = false;
      state.error = null;
    },
    [getWalletDetail.rejected]: (state, action) => {
      state.getWalletLoading = false;
      state.error = action.payload;
    },

    //changeWalletDetails Action Type
    [changeWalletDetails.pending]: (state, action) => {
      state.isLoading = true;
    },
    [changeWalletDetails.fulfilled]: (state, action) => {
      // state.walletDetail = action.payload || {};
      state.isLoading = false;
      // state.error = null;
    },
    [changeWalletDetails.rejected]: (state, action) => {
      state.isLoading = false;
      // state.error = action.payload;
    },
  },
});

export const useIsLoading = () =>
  useSelector((state) => state.PaymentDetail.isLoading);
export const useGetWalletLoading = () =>
  useSelector((state) => state.PaymentDetail.getWalletLoading);
export const useWalletDetail = () =>
  useSelector((state) => state.PaymentDetail.walletDetail);

export default paymentDetailSlice.reducer;

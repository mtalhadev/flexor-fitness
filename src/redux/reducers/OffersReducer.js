import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { fetchOffers } from '../actions/OfferActions';

export const offerSlice = createSlice({
    name: 'offers',
    initialState: {
      isLoading: false,
      error: null,
      data: [],
    },
    reducers: {
    },
    extraReducers: {    
      // fetchOffers action types
      [fetchOffers.pending]: (state, action) => {
        state.isLoading = true;
      },
      [fetchOffers.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.data = action.payload
      },
      [fetchOffers.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      },

    }
});  

export const useOffers =  () => useSelector(state => state.Offer.data)
export const useIsLoading =  () => useSelector(state => state.Offer.isLoading)

export default offerSlice.reducer

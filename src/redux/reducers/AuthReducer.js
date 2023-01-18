// Reducer that changes the state based on the action

import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { signIn, signUp, forgetPassword, confirmCode, signOut, changePassword, resetPassword } from '../actions/AuthActions';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    error: null,
    authToken: null,
    isTrainer: false,
    user: null,
    language: 'en'
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setIsTrainer: (state, action) => {
      state.isTrainer = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthData: (state, action) => {
      state.authToken = action.payload.authToken;
      state.isTrainer = action.payload.isTrainer;
      state.user = action.payload.user;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
  extraReducers: {    
      // signUp action types
      [signUp.pending]: (state, action) => {
        state.isLoading = true;
      },
      [signUp.fulfilled]: (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.authToken = action.payload.token;
        }
        state.isLoading = false;
      },
      [signUp.rejected]: (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = action.payload
      },
      // signIN action types
      [signIn.pending]: (state, action) => {
        state.isLoading = true;
      },
      [signIn.fulfilled]: (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.authToken = action.payload.token;
        }
        state.isLoading = false;
      },
      [signIn.rejected]: (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = action.payload
      },
      // forgetPassword action types
      [forgetPassword.pending]: (state, action) => {
        state.isLoading = true;
      },
      [forgetPassword.fulfilled]: (state, action) => {
        state.isLoading = false;
      },
      [forgetPassword.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      },
     // confirmCode action types
      [confirmCode.pending]: (state, action) => {
        state.isLoading = true;
      },
      [confirmCode.fulfilled]: (state, action) => {
        state.isLoading = false;
      },
      [confirmCode.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      },
     // resetPassword action types
     [resetPassword.pending]: (state, action) => {
      state.isLoading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [resetPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
      // changePassword action types
      [changePassword.pending]: (state, action) => {
        state.isLoading = true;
      },
      [changePassword.fulfilled]: (state, action) => {
        state.isLoading = false;
      },
      [changePassword.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      },

     // signOut action types
      [signOut.pending]: (state, action) => {
        state.isLoading = true;
      },
      [signOut.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.authToken = null;
        state.error=null
      },
      [signOut.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      },
  }

})

export const { setAuthToken, setIsTrainer, setUser, setAuthData, setLanguage} = authSlice.actions;

export const useToken =  () => useSelector(state => state.Auth.authToken)
export const useIstrainer =  () => useSelector(state => state.Auth.isTrainer)
export const useUser =  () => useSelector(state => state.Auth.user)
export const useLanguage =  () => useSelector(state => state.Auth.language)
export const useIsLoading =  () => useSelector(state => state.Auth.isLoading)

export default authSlice.reducer

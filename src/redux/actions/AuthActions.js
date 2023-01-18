import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../../services/ApiService";
import LocalStorage from "../../services/LocalStorage";
import { AUTH_TOKEN, IS_TRAINER, USER_DATA } from "../../constants/Constants";
import { setProfile } from "../reducers/ProfileReducer";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (payload, thunkAPI) => {
    console.log("payload: ", payload);
    const isTrainer = thunkAPI.getState().Auth.isTrainer;
    try {
      let res = isTrainer
        ? await ApiService.trainer.signup(payload)
        : await ApiService.client.signup(payload);
      if (res.data && res.data.success) {
        const { token, user } = res.data;
        console.log({ token, user });
        if (token) {
          ApiService.setAuthHeader(token);
          LocalStorage.storeData(AUTH_TOKEN, token);
          LocalStorage.storeData(USER_DATA, user);
          return { token, user };
        }
      } else {
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload, thunkAPI) => {
    console.log("payload: ", payload);
    const isTrainer = thunkAPI.getState().Auth.isTrainer;
    try {
      let res = isTrainer
        ? await ApiService.trainer.login(payload)
        : await ApiService.client.login(payload);
      if (res.data && res.data.success) {
        const { token, user } = res.data;
        if (token) {
          ApiService.setAuthHeader(token);
          LocalStorage.storeData(AUTH_TOKEN, token);
          LocalStorage.storeData(USER_DATA, user);
          return { token, user };
        }
      } else {
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (payload, thunkAPI) => {
    console.log("payload: ", payload);
    try {
      let res = await ApiService.client.forgetPassword(payload);
      if (res.status == 200 && res.data) {
        const { success, userid } = res.data;
        if (success == true) {
          return userid;
        } else {
          return thunkAPI.rejectWithValue(res.data.message);
        }
      } else {
        return thunkAPI.rejectWithValue(
          `Request failed with status code: ${res.status}`
        );
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`);
    }
  }
);

export const confirmCode = createAsyncThunk(
  "auth/confirmCode",
  async (payload, thunkAPI) => {
    console.log("payload: ", payload);
    try {
      let res = await ApiService.client.confirmCode(payload);
      if (res.status == 200 && res.data) {
        const { success, userid } = res.data;
        if (success == true) {
          return true;
        } else {
          return thunkAPI.rejectWithValue(res.data.message);
        }
      } else {
        return thunkAPI.rejectWithValue(
          `Request failed with status code: ${res.status}`
        );
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload, thunkAPI) => {
    console.log("payload: ", payload);
    try {
      let res = await ApiService.client.confirmPassword(payload);
      if (res.status == 200 && res.data) {
        const { success } = res.data;
        if (success == true) {
          return true;
        } else {
          return thunkAPI.rejectWithValue(res.data.message);
        }
      } else {
        return thunkAPI.rejectWithValue(
          `Request failed with status code: ${res.status}`
        );
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`);
    }
  }
);
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload, thunkAPI) => {
    console.log("payload: ", payload);
    const { password, newPassword } = payload;
    const isTrainer = thunkAPI.getState().Auth.isTrainer;
    try {
      let res = isTrainer
        ? await ApiService.trainer.changePassword({ password, newPassword })
        : await ApiService.client.changePassword({ password, newPassword });
      if (res.data) {
        const { success } = res.data;
        if (success == true) {
          return true;
        } else {
          return thunkAPI.rejectWithValue(res.data.message);
        }
      } else {
        return thunkAPI.rejectWithValue(
          `Request failed with status code: ${res.status}`
        );
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`);
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (payload, thunkAPI) => {
    try {
      await LocalStorage.delete(AUTH_TOKEN);
      await LocalStorage.delete(IS_TRAINER);
      await LocalStorage.delete(USER_DATA);
      ApiService.setAuthHeader(null);
      thunkAPI.dispatch({ type: "RESET" });
      return true;
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(error);
    }
  }
);

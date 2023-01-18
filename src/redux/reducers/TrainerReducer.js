import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  deleteClient,
  fetchClasses,
  fetchPaymentHistory,
  fetchPrograms,
  fetchTrainerData,
  fetchTrainerSchedule,
  handleClientRequest,
  postReminder,
  postTrainingTime,
} from "../actions/TrainerActions";

export const trainerSlice = createSlice({
  name: "trainer",
  initialState: {
    isLoading: false,
    error: null,
    clients: [],
    requests: [],
    paymentHistory: [],
    reminders: [],
    trainingTimes: [],
  },
  setRequests: (state, action) => {
    state.requests = action.payload;
  },
  extraReducers: {
    // fetchTrainerData action types
    [fetchTrainerData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchTrainerData.fulfilled]: (state, action) => {
      state.clients = action.payload.clients;
      state.requests = action.payload.requests;
      state.isLoading = false;
      state.error = null;
    },
    [fetchTrainerData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // deleteClient action types
    [deleteClient.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteClient.fulfilled]: (state, action) => {
      const clientID = action.payload;
      const index = state.clients.findIndex((c) => c._id == clientID);
      if (index > -1) state.clients.splice(index, 1);
      state.isLoading = false;
      state.error = null;
    },
    [deleteClient.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // handleClientRequest action types
    [handleClientRequest.pending]: (state, action) => {
      state.isLoading = true;
    },
    [handleClientRequest.fulfilled]: (state, action) => {
      state.clients = action.payload.clients;
      state.requests = action.payload.requests;
      state.isLoading = false;
      state.error = null;
    },
    [handleClientRequest.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // fetchPaymentHistory action types
    [fetchPaymentHistory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchPaymentHistory.fulfilled]: (state, action) => {
      state.paymentHistory = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchPaymentHistory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // fetchTrainerSchedule action types
    [fetchTrainerSchedule.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchTrainerSchedule.fulfilled]: (state, action) => {
      state.classes = action.payload.classes;
      state.reminders = action.payload.reminders;
      state.trainingTimes = action.payload.trainingTimes;
      state.isLoading = false;
      state.error = null;
    },
    [fetchTrainerSchedule.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // postReminder action types
    [postReminder.pending]: (state, action) => {
      state.isLoading = true;
    },
    [postReminder.fulfilled]: (state, action) => {
      state.reminders.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    [postReminder.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // postTrainingTime action types
    [postTrainingTime.pending]: (state, action) => {
      state.isLoading = true;
    },
    [postTrainingTime.fulfilled]: (state, action) => {
      state.trainingTimes.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    [postTrainingTime.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setClients, setRequests } = trainerSlice.actions;

export const useClients = () => useSelector((state) => state.Trainer.clients);
export const useRequests = () => useSelector((state) => state.Trainer.requests);
export const usePaymentHistory = () =>
  useSelector((state) => state.Trainer.paymentHistory);
export const useReminders = () =>
  useSelector((state) => state.Trainer.reminders);
export const useTrainingTime = () =>
  useSelector((state) => state.Trainer.trainingTimes);
export const useIsLoading = () =>
  useSelector((state) => state.Trainer.isLoading);

export default trainerSlice.reducer;

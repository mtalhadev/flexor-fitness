// Reducer that changes the state based on the action

import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  fetchClasses,
  fetchMemberships,
  fetchMyProfile,
  fetchMyPrograms,
  fetchPrograms,
  fetchReviews,
  updateMembership,
  updateProfile,
} from "../actions/ProfileActions";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isLoading: false,
    error: null,
    profile: {},
    reviews: [],
    myTrainers: [],
    myPrograms: [],
    myClasses: [],
    programDetails: {},
    classDetails: {},
    memberships: [],
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setProfileImage: (state, action) => {
      state.profile.image = action.payload;
    },
    setMyProgramDetails: (state, action) => {
      const programId = action.payload;
      state.programDetails =
        state.myPrograms.find((p) => p._id === programId) || {};
    },
    setMyClassDetails: (state, action) => {
      const classId = action.payload;
      state.classDetails = state.myClasses.find((c) => c._id === classId) || {};
    },
    updateSubscribedTrainers: (state, action) => {
      const trainerId = action.payload;
      state.profile.subscribedTrainers &&
        state.profile.subscribedTrainers.push(trainerId);
    },
  },
  extraReducers: {
    // fetchMyProfile action types
    [fetchMyProfile.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchMyProfile.fulfilled]: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchMyProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // updateProfile action types
    [updateProfile.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [updateProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // fetchMyPrograms action types
    [fetchMyPrograms.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchMyPrograms.fulfilled]: (state, action) => {
      state.myPrograms = action.payload.myPrograms;
      state.myClasses = action.payload.myClasses;
      state.isLoading = false;
      state.error = null;
    },
    [fetchMyPrograms.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // fetchMemberships action types
    [fetchMemberships.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchMemberships.fulfilled]: (state, action) => {
      state.memberships = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchMemberships.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // updateMembership action types
    [updateMembership.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateMembership.fulfilled]: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [updateMembership.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // fetchPrograms action types
    [fetchPrograms.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchPrograms.fulfilled]: (state, action) => {
      state.myPrograms = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchPrograms.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // fetchClasses action types
    [fetchClasses.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchClasses.fulfilled]: (state, action) => {
      state.myClasses = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchClasses.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // fetchReviews action types
    [fetchReviews.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchReviews.fulfilled]: (state, action) => {
      state.reviews = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchReviews.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setProfile,
  setProfileImage,
  setMyProgramDetails,
  setMyClassDetails,
  updateSubscribedTrainers,
} = profileSlice.actions;

export const useProfile = () => useSelector((state) => state.Profile.profile);
export const useMyPrograms = () =>
  useSelector((state) => state.Profile.myPrograms);
export const useMyClasses = () =>
  useSelector((state) => state.Profile.myClasses);
export const useMyReviews = () => useSelector((state) => state.Profile.reviews);
export const useProgramDetails = () =>
  useSelector((state) => state.Profile.programDetails);
export const useClassDetails = () =>
  useSelector((state) => state.Profile.classDetails);
export const useMyTrainers = () =>
  useSelector((state) => state.Profile.myTrainers);
export const useMembership = () =>
  useSelector((state) => state.Profile.profile.membership);
export const useMemberships = () =>
  useSelector((state) => state.Profile.memberships);
export const useIsLoading = () =>
  useSelector((state) => state.Profile.isLoading);

export default profileSlice.reducer;

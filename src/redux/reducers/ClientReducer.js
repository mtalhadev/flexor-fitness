import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {
  fetchCategoryList,
  bookTrainingSlot,
  createWorkout,
  fetchExercises,
  fetchHomeData,
  fetchTrainerSchedule,
  fetchWorkout,
  purchaseProgram,
  purchaseClass,
  fetchTrainerPrograms,
  fetchTrainerClasses,
  fetchTrainerReviews,
  addReview,
  cancelSubscription,
  fetchPaymentHistory,
  // fetchTrainerData
  fetchProgramData
} from '../actions/ClientActions';


export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    isLoading: false,
    error: null,
    programs: [],
    classes: [],
    categories: [],
    programDetails: {},
    classDetails: {},
    trainers: [],
    trainerSchedule: [],
    exercises: [],
    workouts: [],
    videoDetails: {},
    programCategories: [],
    trainerPrograms: [],
    trainerClasses: [],
    trainerReviews: [],
    paymentSuccess: false,
    paymentHistory: [],
    searchText: '',
    searchCategory: []
  },
  reducers: {
    setProgramDetails: (state, action) => {
      state.programDetails = action.payload;
    },
    setClassDetails: (state, action) => {
      state.classDetails = action.payload;
    },
    setVideoDetails: (state, action) => {
      state.videoDetails = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSearchCategory: (state, action) => {
      state.searchCategory = action.payload;
    },
    setPaymentSuccess: (state, action) => {
      state.paymentSuccess = action.payload;
    },
  },

  extraReducers: {
    // fetchHomeData action types
    [fetchHomeData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchHomeData.fulfilled]: (state, action) => {
      const { page, classes } = action.payload; 
      if(page > 1)
        state.classes = state.classes.concat(classes);
      else 
        state.classes = classes;
      state.isLoading = false;
      state.error = null
    },
    [fetchHomeData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },


    // fetchProgramData
    [fetchProgramData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchProgramData.fulfilled]: (state, action) => {
      const { page, programs } = action.payload; 
      if(page > 1)
        state.programs = state.programs.concat(programs);
      else 
        state.programs = programs;
      state.isLoading = false;
      state.error = null
    },
    [fetchProgramData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },

    // purchaseProgram action types
    [purchaseProgram.pending]: (state, action) => {
      state.isLoading = true;
    },
    [purchaseProgram.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null
    },
    [purchaseProgram.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    // purchaseClass action types
    [purchaseClass.pending]: (state, action) => {
      state.isLoading = true;
    },
    [purchaseClass.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null
    },
    [purchaseClass.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    // cancelSubscription action types
    [cancelSubscription.pending]: (state, action) => {
      state.isLoading = true;
    },
    [cancelSubscription.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null
    },
    [cancelSubscription.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    // fetchTrainerSchedule action types
    [fetchTrainerSchedule.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchTrainerSchedule.fulfilled]: (state, action) => {
      state.trainerSchedule = action.payload;
      state.isLoading = false;
      state.error = null
    },
    [fetchTrainerSchedule.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    // bookTrainingSlot action types
    [bookTrainingSlot.pending]: (state, action) => {
      state.isLoading = true;
    },
    [bookTrainingSlot.fulfilled]: (state, action) => {
      state.trainerSchedule = action.payload;
      state.isLoading = false;
      state.error = null
    },
    [bookTrainingSlot.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    // fetchExercises action types
    [fetchExercises.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchExercises.fulfilled]: (state, action) => {
      state.exercises = action.payload;
      state.isLoading = false;
      state.error = null
    },
    [fetchExercises.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    // fetchWorkout action types
    [fetchWorkout.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchWorkout.fulfilled]: (state, action) => {
      state.workouts = action.payload;
      state.isLoading = false;
      state.error = null
    },
    [fetchWorkout.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    // createWorkout action types
    [createWorkout.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createWorkout.fulfilled]: (state, action) => {
      state.workouts = action.payload;
      state.isLoading = false;
      state.error = null
    },
    [createWorkout.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    // createWorkout action types
    [fetchCategoryList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchCategoryList.fulfilled]: (state, action) => {
      state.programCategories = action.payload;
      state.isLoading = false;
      state.error = null
    },
    [fetchCategoryList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    // fetchTrainerPrograms action types
    [fetchTrainerPrograms.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchTrainerPrograms.fulfilled]: (state, action) => {
      state.trainerPrograms = action.payload;
      state.isLoading = false;
      state.error = null
    },
    [fetchTrainerPrograms.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    // fetchTrainerClasses action types
    [fetchTrainerClasses.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchTrainerClasses.fulfilled]: (state, action) => {
      state.trainerClasses = action.payload;
      state.isLoading = false;
      state.error = null
    },
    [fetchTrainerClasses.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    // fetchTrainerReviews action types
    [fetchTrainerReviews.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchTrainerReviews.fulfilled]: (state, action) => {
      state.trainerReviews = action.payload;
      state.isLoading = false;
      state.error = null
    },
    [fetchTrainerReviews.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },

    // addReview action types
    [addReview.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addReview.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null
    },
    [addReview.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
    // fetchPaymentHistory action types
    [fetchPaymentHistory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchPaymentHistory.fulfilled]: (state, action) => {
      state.paymentHistory = action.payload;
      state.isLoading = false;
      state.error = null
    },
    [fetchPaymentHistory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
  }
})




export const {
  setProgramDetails,
  setClassDetails,
  setVideoDetails,
  setPaymentSuccess,
  setSearchText,
  setSearchCategory
} = clientSlice.actions;

export const usePrograms = () => useSelector(state => state.Client.programs)
export const useClasses = () => useSelector(state => state.Client.classes)
export const useCategories = () => useSelector(state => state.Client.categories)
export const useSearchText = () => useSelector(state => state.Client.searchText)
export const useSearchCategory = () => useSelector(state => state.Client.searchCategory)
export const useProgramCategories = () => useSelector(state => state.Client.programCategories)
export const useTrainers = () => useSelector(state => state.Client.trainers)
export const useProgramDetails = () => useSelector(state => state.Client.programDetails)
export const useClassDetails = () => useSelector(state => state.Client.classDetails)
export const useVideoDetails = () => useSelector(state => state.Client.videoDetails)
export const useTrainerSchedule = () => useSelector(state => state.Client.trainerSchedule)
export const useTrainerPrograms = () => useSelector(state => state.Client.trainerPrograms)
export const useTrainerClasses = () => useSelector(state => state.Client.trainerClasses)
export const useTrainerReviews = () => useSelector(state => state.Client.trainerReviews)
export const useExercises = () => useSelector(state => state.Client.exercises)
export const useWorkouts = () => useSelector(state => state.Client.workouts)
export const useIsLoading = () => useSelector(state => state.Client.isLoading)
export const usePaymentSuccess = () => useSelector(state => state.Client.paymentSuccess)
export const usePaymentHistory = () => useSelector(state => state.Client.paymentHistory)

export default clientSlice.reducer

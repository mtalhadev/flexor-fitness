import axios from "axios";

axios.defaults.baseURL = "https://flexor.is/api";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = 3000;
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

const post = (url, body = {}) => axios.post(url, body);
const get = (url, params = {}) => axios.get(url, { params });
const put = (url, body = {}) => axios.put(url, body);
const del = (url, params = {}) => axios.delete(url, { params });

export default {
  axios,
  setAuthHeader: (token) => {
    axios.defaults.headers.common["x-auth-token"] = token;
  },
  trainer: {
    signup: (params) => post("/trainer/signup", params),
    login: (params) => post(`/trainer/login`, params),
    changePassword: (params) => put(`/trainer/changepassword/`, params),

    getProfile: (userId) => get(`/trainer/getuserprofile/${userId}`),
    updateProfile: (params) => put(`/trainer/updateprofile`, params),

    deleteClient: (clientId) => put("/trainer/deleteclient", { clientId }),
    handleRequest: (params) => put(`/trainer/requesthandle`, params),

    getOffers: () => get(`/trainer/offers`),
    getPayments: () => get(`/trainer/orders`),
    getPrograms: () => get(`/trainer/programs`),
    getClasses: () => get(`/trainer/classes`),
    getReviews: () => get(`/trainer/reviews`),

    getMemberships: () => get(`/trainer/membership`),
    updateMembership: (id) => put(`/trainer/membership/${id}`),

    getReminder: () => get(`/trainer/reminder`),
    addReminder: (params) => post(`/trainer/reminder`, params),

    getTrainingTime: () => get(`/trainer/trainingtime`),
    addTrainingTime: (params) => post(`/trainer/trainingtime`, params),

    addPaymentDetail: (params) => post("/trainer/raypd-make-wallet", params),
    getPaymentDetail: () => get("/trainer/wallet-details"),
    changePaymentDetail: (params) =>
      put(`/trainer/raypd-update-wallet/${params.wallet_id}`, params.values),
  },
  client: {
    signup: (params) => post("/client/signup", params),
    login: (params) => post(`/client/login`, params),
    forgetPassword: (params) => put(`/client/forgot-password`, params),
    confirmCode: (params) =>
      put(`/client/confirmtoken/${params.userid}`, params),
    confirmPassword: (params) =>
      put(`/client/confirmpassword/${params.userid}`, params),
    changePassword: (params) => put(`/client/changepassword/`, params),

    getProfile: (userId) => get(`/client/getuserprofile/${userId}`),
    updateProfile: (params) => put(`/client/updateprofile`, params),
    uploadPhoto: (params) => post("/client/upload-image", params),

    getMyPrograms: () => get(`/client/myprograms`),

    getAllPrograms: (pg) => get(`/client/programs/${pg}`),
    purchaseProgram: (params) => post(`/client/placeorder`, params),
    updateVideoView: (params) => put(`/client/view`, params),

    getAllTrainers: (pg) => get(`/client/trainers/${pg}`),
    searchTrainers: (trainerName) =>
      get(`/client/trainersearch/${trainerName}`),
    bookTrainer: (trainerId) => put(`/client/booktrainer`, { trainerId }),

    getWorkouts: () => get(`/client/workout`),
    addWorkout: (params) => post("/client/workout", params),
    apdWorkout: (id, updates) => put(`/client/workout/${id}`, updates),
    delWorkout: (id) => del(`/client/workout/${id}`),

    getExercises: () => get(`/client/exercise`),
    searchExercise: (text) => get(`/client/exercise/${text}`),

    getTrainerSlots: (trainerId) => get(`/client/trainerslots/${trainerId}`),
    bookSlot: (trainerId, slot) => post(`/client/workout`, { trainerId, slot }),

    getOffers: () => get(`/client/offers`),
    purchaseOffer: (params) => post(`/client/orderoffer`, params),

    getAllClasses: (pg) => get(`/client/classes/${pg}`),
    purchaseClass: (params) => post(`/client/placeorder`, params),
    cancelSubscription: (trainerId) =>
      put(`/client/cancelsubscription/${trainerId}`),

    getTrainerPrograms: (trainerId) =>
      get(`/client/trainerprograms/${trainerId}`),
    getTrainerClasses: (trainerId) =>
      get(`/client/trainerclasses/${trainerId}`),
    getTrainerReviews: (trainerId) =>
      get(`/client/trainerreviews/${trainerId}`),
    addReview: (params) => post("/client/addreview", params),

    getPayments: () => get(`/client/orders`),

    addPaymentDetail: (params) => post("trainer/raypd-make-wallet", params),
  },
};

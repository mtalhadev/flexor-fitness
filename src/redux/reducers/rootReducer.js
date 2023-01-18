import AuthReducer from "../reducers/AuthReducer";
import ProfileReducer from "../reducers/ProfileReducer";
import ClientReducer from "../reducers/ClientReducer";
import OffersReducer from "../reducers/OffersReducer";
import TrainerReducer from "../reducers/TrainerReducer";
import PaymentReducer from "../reducers/PaymentReducer";

export default {
  Auth: AuthReducer,
  Profile: ProfileReducer,
  Client: ClientReducer,
  Trainer: TrainerReducer,
  Offer: OffersReducer,
  PaymentDetail: PaymentReducer,
};

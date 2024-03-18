import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./reducers/alertReducer";
import userReducer from "./reducers/userReducer";
import authReducers from "./reducers/authReducers";

const store = configureStore({
  reducer: {
    alerts: alertReducer,
    auth: authReducers,
    users: userReducer,
  },
});

export default store;

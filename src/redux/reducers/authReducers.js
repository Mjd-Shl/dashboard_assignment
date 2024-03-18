// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      // Check if token is available in the payload and store it in session storage
      if (action.payload.token) {
        sessionStorage.setItem("accessToken", action.payload.token);
      }
    },
    autoLogin(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      sessionStorage.removeItem("accessToken");
    },
  },
});

export const { login, autoLogin, logout } = authSlice.actions;

export default authSlice.reducer;

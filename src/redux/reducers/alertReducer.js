import { createSlice } from "@reduxjs/toolkit";

// State on app load and refresh
const initialState = {
  value: null,
  sweet: false,
};

// Create the Users Slice
const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    pop: (state) => {
      state.value = null;
    },
    set: (state, { payload }) => {
      state.value = payload;
    },
    setSweet: (state) => {
      state.sweet = !state.sweet;
    },
  },
});

// Export the slice actions
export const { pop, set, setSweet } = alertSlice.actions;

// Export the slice reducer
export default alertSlice.reducer;

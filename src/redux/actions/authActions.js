// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     isLoggedIn: false,
//     user: null,
//     redirect: "",
//   },
//   reducers: {
//     login(state, action) {
//       state.isLoggedIn = true;
//       state.user = action.payload.user;
//       if (action.payload.rememberMe) {
//         localStorage.setItem("token", action.payload.token);
//         sessionStorage.removeItem("token");
//       } else {
//         if (action.payload.token) {
//           sessionStorage.setItem("token", action.payload.token);
//           localStorage.removeItem("token");
//         }
//       }
//     },
//     logout(state) {
//       localStorage.removeItem("token");
//       sessionStorage.removeItem("token");
//       sessionStorage.removeItem("session_id");

//       return {
//         ...state,
//         isLoggedIn: false,
//         user: {},
//       };
//     },
//   },
// });

// export const authActions = authSlice.actions;
// export default authSlice;

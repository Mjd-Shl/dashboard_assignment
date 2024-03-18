import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userList");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userList", serializedState);
  } catch {
    console.log("Error saving the data, Please tru again later.");
  }
};

const usersSlice = createSlice({
  name: "users",
  initialState: {
    usersList: loadState() || [],
  },
  reducers: {
    addUser(state, action) {
      state.usersList.push(action.payload);
      saveState(state.usersList);
    },
    updateUser(state, action) {
      const updatedUser = action.payload;
      state.usersList = state.usersList.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      saveState(state.usersList);
    },
    removeUser(state, action) {
      const userIdToRemove = action.payload;
      state.usersList = state.usersList.filter(
        (user) => user.id !== userIdToRemove
      );
      saveState(state.usersList);
    },
  },
});

export const userActions = usersSlice.actions;
export default usersSlice;

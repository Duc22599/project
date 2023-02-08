import { createSlice } from "@reduxjs/toolkit";

const currentUser = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    removeDataUser: (state) => {
      return { currentUser: [] };
    },
  },
});

export const { setCurrentUser, removeDataUser } = currentUser.actions;

export default currentUser.reducer;

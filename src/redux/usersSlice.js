import { createSlice } from "@reduxjs/toolkit";

const users = createSlice({
  name: "users",
  initialState: {
    isReload: false,
    user: {},
    userAction: {
      type: "",
      data: {},
    },
  },

  reducers: {
    swictchReaload: (state, action) => {
      state.isReload = action.payload;
    },
    logginSucces: (state, action) => {
      state.user = action.payload;
    },
    handleUserAction: (state, action) => {
      state.userAction = action.payload;
    },
  },
});
export const { swictchReaload, logginSucces, handleUserAction } = users.actions;
export default users.reducer;

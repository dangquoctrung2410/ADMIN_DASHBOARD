import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: [],
  isLogIn: false,
};

export const getListUser = createAsyncThunk(
  "user/getListUser",
  async (data) => {
    const response = await axios?.get(
      "http://localhost:8080/api/user/v1/get-all-user-limit?page=1&limit=5"
    );
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getListUser.fulfilled, (state, action) => {
      return {
        user: action.payload.data,
      };
    });
  },
});

export default userSlice.reducer;

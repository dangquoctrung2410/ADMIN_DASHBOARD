import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSucces: (state, actions) => {
            state.isLogin = true;
            state.user = actions.payload;
        },
        changeUserLogin: (state, actions) => {
            state.isLogin = actions.payload;
        },
        logOut: (state, actions) => {
            state.isLogin = false;
            state.user = {};
        },
        upDateUser: (state, actions) => {
            state.user = actions.payload;
        },
    },
});

export const { loginSucces, logOut, changeUserLogin, upDateUser } =
    authSlice.actions;

export default authSlice.reducer;

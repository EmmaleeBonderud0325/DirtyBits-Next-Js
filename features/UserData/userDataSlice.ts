import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    user: null,
    error: null,
    isLoggedIn: false,
    token: null,
}

export const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers : {
        setUserData: (state, action) => {
            state.user = action.payload.user;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        logout: (state) => {
            Cookies.remove('access')
            Cookies.remove('refresh')
            state.user = null;
            state.isLoggedIn = false;
            state.token = null;
        }
    }
})

export const {setUserData, logout} = userDataSlice.actions;

export default userDataSlice.reducer;
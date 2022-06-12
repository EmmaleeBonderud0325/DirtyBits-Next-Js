import { createReducer } from "@reduxjs/toolkit";
import {
  getUserData,
  setSigninError,
  setUserData as setUserDataAction,
} from "./actions";
import { setUserData } from "helper/setUserData";

export type userData = {
  is_logged_in: boolean;
  is_admin: boolean;
  is_verified: boolean;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  profile_pic: string;
};

export type userState = {
  data: userData;
  pending: boolean;
  error: boolean;
  errorString: string;
};

const initialState: userState = {
  data: {
    is_logged_in: false,
    is_admin: false,
    is_verified: false,
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    profile_pic: "",
  },
  pending: false,
  error: false,
  errorString: "",
};

export const userDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getUserData.pending, (state) => {
      state.pending = true;
    })
    .addCase(getUserData.fulfilled, (state, { payload }) => {
      setUserData(state, payload);
    })
    .addCase(getUserData.rejected, (state) => {
      state.pending = false;
      state.error = true;
      state.errorString = "Invalid Token !";
    })
    .addCase(setUserDataAction, (state, action) => {
      const { access, refresh, remember_me } = action.payload;
      setUserData(state, { access, refresh }, remember_me);
    })
    .addCase(setSigninError, (state, action) => {
      state.error = true;
      state.errorString = action.payload.errorString;
    });
});

export default userDataReducer;

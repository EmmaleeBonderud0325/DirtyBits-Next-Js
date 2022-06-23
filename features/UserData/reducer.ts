import { createReducer } from "@reduxjs/toolkit";
import {
  // getUserData,
  googleLogin,
  setSigninError,
  setUserData as setUserDataAction,
  githubLogin,
  tokens,
  setCredentials,
  logOut,
  loginUser,
  getUserData,
} from "./actions";
import { setUserData } from "helper/setUserData";
import Cookies from "js-cookie";
import parseToken from "helper/parseToken";
import { refreshTokenApi } from "components/api/apis";

export type userData = {
  is_admin: boolean;
  is_verified: boolean;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  profile_pic: string;
};

export type userState = {
  user: userData;
  isLoading: boolean;
  error: string | null;
  is_logged_in: boolean;
};

const initialState: userState = {
  user: {
    is_admin: false,
    is_verified: false,
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    profile_pic: "",
  },
  is_logged_in: false,
  isLoading: false,
  error: null,
};

export const userDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginUser.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.user = payload.user;
        state.is_logged_in = true;
        state.error = null;
      } else {
        state.error = payload.error;
      }
      state.isLoading = false;
    })
    .addCase(loginUser.rejected, (state) => {
      state.error = "Login failed";
      state.isLoading = false;
    })
    .addCase(googleLogin.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(googleLogin.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.user = payload.user;
        state.is_logged_in = true;
        state.error = null;
      } else {
        state.error = payload.error;
      }
      state.isLoading = false;
    })
    .addCase(googleLogin.rejected, (state) => {
      state.error = "Login failed";
      state.isLoading = false;
    })
    .addCase(githubLogin.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(githubLogin.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.user = payload.user;
        state.is_logged_in = true;
        state.error = null;
      } else {
        state.error = payload.error;
      }
      state.isLoading = false;
    })
    .addCase(githubLogin.rejected, (state) => {
      state.error = "Login failed";
      state.isLoading = false;
    })
    .addCase(logOut.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(logOut.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.user = {
          is_admin: false,
          is_verified: false,
          email: "",
          first_name: "",
          last_name: "",
          username: "",
          profile_pic: "",
        };
        state.is_logged_in = false;
        state.error = null;
      }
      state.isLoading = false;
    })
    .addCase(logOut.rejected, (state) => {
      state.error = "Logout failed";
      state.isLoading = false;
    })
    .addCase(getUserData.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getUserData.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.user = payload.user;
        state.is_logged_in = true;
        state.error = null;
      } else {
        state.error = payload.error;
      }
      state.isLoading = false;
    })
    .addCase(getUserData.rejected, (state) => {
      state.error = "Login failed";
      state.isLoading = false;
    });
});

export default userDataReducer;

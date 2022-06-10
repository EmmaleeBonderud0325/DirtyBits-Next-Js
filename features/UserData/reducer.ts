import { createReducer } from "@reduxjs/toolkit";
import { getUserData } from "./actions";
import Cookies from "js-cookie";
import { Parsetoken } from "imports/Signin";
import parseToken from "helper/parseToken";
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
      // state.pending = false;
      // const { access, refresh } = payload;
      // var inTwentyMinutes = new Date(new Date().getTime() + 20 * 60 * 1000);
      // Cookies.set("access", access, { expires: inTwentyMinutes });
      // Cookies.set("refresh", refresh, { expires: 14 });
      // const data = parseToken(access);
      // if (data.is_verified) {
      //   state.data.email = data.email;

      // } else {
      //   state.error = true;
      //   state.errorString = "User Not Verified !";
      // }
      setUserData(state, { payload });
    })
    .addCase(getUserData.rejected, (state) => {
      state.pending = false;
      state.error = true;
      state.errorString = "Invalid Token !";
    });
});

export default userDataReducer;

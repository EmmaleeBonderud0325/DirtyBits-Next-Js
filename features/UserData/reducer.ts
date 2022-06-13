import { createReducer } from "@reduxjs/toolkit";
import {
  getUserData,
  googleLogin,
  setSigninError,
  setUserData as setUserDataAction,
  githubLogin,
  tokens,
} from "./actions";
import { setUserData } from "helper/setUserData";
import Cookies from "js-cookie";
import parseToken from "helper/parseToken";
import { refreshTokenApi } from "components/api/apis";

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

const getToken = async (refresh: string) => {
  await refreshTokenApi
    .post<tokens>("/", { refresh })
    .then((result) => {
      var inTwentyMinutes = new Date(new Date().getTime() + 20 * 60 * 1000);
      Cookies.set("access", result.data.access, { expires: inTwentyMinutes });
      Cookies.set("refresh", result.data.refresh, { expires: 14 });
      const data: userData = parseToken(access);
      if (data.is_verified) {
        (initialState.data.is_logged_in = true),
          (initialState.data.is_admin = data.is_admin),
          (initialState.data.is_verified = data.is_verified),
          (initialState.data.email = data.email),
          (initialState.data.first_name = data.first_name),
          (initialState.data.last_name = data.last_name),
          (initialState.data.username = data.username),
          (initialState.data.profile_pic = data.profile_pic);
        if (initialState.error) {
          initialState.error = false;
          initialState.errorString = "";
        }
      } else {
        initialState.error = true;
        initialState.errorString = "User Not Verified !";
      }
    })
    .catch(() => {
      initialState.error = true;
      initialState.errorString = "Invalid Token !";
    });
};

const refresh: string = Cookies.get("refresh");
const access: string = Cookies.get("access");

if (typeof access != "undefined") {
  const data: userData = parseToken(access);
  if (data.is_verified) {
    (initialState.data.is_logged_in = true),
      (initialState.data.is_admin = data.is_admin),
      (initialState.data.is_verified = data.is_verified),
      (initialState.data.email = data.email),
      (initialState.data.first_name = data.first_name),
      (initialState.data.last_name = data.last_name),
      (initialState.data.username = data.username),
      (initialState.data.profile_pic = data.profile_pic);
    if (initialState.error) {
      initialState.error = false;
      initialState.errorString = "";
    }
  } else {
    initialState.error = true;
    initialState.errorString = "User Not Verified !";
  }
} else {
  if (typeof refresh != "undefined") {
    getToken(refresh);
  }
}

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
    .addCase(setSigninError, (state, action) => {
      state.error = true;
      state.errorString = action.payload.errorString;
    })
    .addCase(googleLogin.pending, (state) => {
      state.pending = true;
    })
    .addCase(googleLogin.fulfilled, (state, { payload }) => {
      setUserData(state, payload, true);
    })
    .addCase(googleLogin.rejected, (state) => {
      state.pending = false;
      state.error = true;
      state.errorString = "Invalid Token !";
    })
    .addCase(githubLogin.pending, (state) => {
      state.pending = true;
    })
    .addCase(githubLogin.fulfilled, (state, { payload }) => {
      setUserData(state, payload, true);
    })
    .addCase(githubLogin.rejected, (state) => {
      state.pending = false;
      state.error = true;
      state.errorString = "Invalid Token !";
    })
    .addCase(setUserDataAction, (state, action) => {
      const { access, refresh, remember_me } = action.payload;
      setUserData(state, { access, refresh }, remember_me);
    });
});

export default userDataReducer;

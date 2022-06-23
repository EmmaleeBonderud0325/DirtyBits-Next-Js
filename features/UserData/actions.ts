import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  githubLoginApi,
  googleLoginApi,
  refreshTokenApi,
} from "components/api/apis";
import { userData } from "./reducer";
import { setGithubSpinner, setGoogleSpinner } from "features/Spinners";
import axios from "axios";

export type tokens = {
  access: string;
  refresh: string;
};

export type setUserDataType = {
  user: null | userData;
  token: null | string;
};

export type Error = {
  errorString: string;
};

export type LoginUserData = {
  email: string;
  password: string;
  remember_me: boolean | undefined;
};

type LoginUser = {
  success: boolean;
  error?: string;
  user?: userData;
};

type LogOutUser = {
  success: boolean;
};

export const setCredentials = createAction<setUserDataType>(
  "user/setUserCredentials"
);

export const setUserData = createAction<setUserDataType>("user/setUserData");
export const setSigninError = createAction<Error>("user/setSigninError");

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password, remember_me }: LoginUserData) => {
    const response = await axios.post<LoginUser>("/api/auth/login", {
      email,
      password,
      remember_me,
    });
    console.log(response.data);
    return response.data;
  }
);

export const googleLogin = createAsyncThunk(
  "user/googleLogin",
  async ({ auth_token }: { auth_token: string }, thunkAPI) => {
    const response = await axios.post<LoginUser>("/api/auth/googleLogin", {
      auth_token,
    });
    thunkAPI.dispatch(setGoogleSpinner(false));
    return response.data;
  }
);

export const githubLogin = createAsyncThunk(
  "user/githubLogin",
  async ({ auth_token }: { auth_token: string }, thunkAPI) => {
    const response = await axios.post<LoginUser>("api/auth/githubLogin", {
      auth_token,
    });
    thunkAPI.dispatch(setGithubSpinner(false));
    return response.data;
  }
);

export const logOut = createAsyncThunk("user/logOut", async () => {
  const response = await axios.post<LogOutUser>("/api/auth/logout");
  return response.data;
});


export const getUserData = createAsyncThunk("user/getUserData", async () => {
  const response = await axios.get<LoginUser>("/api/auth/getUser");
  return response.data;
});


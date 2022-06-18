import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  githubLoginApi,
  googleLoginApi,
  refreshTokenApi,
} from "components/api/apis";
import { userData } from "./reducer";
import { setGithubSpinner, setGoogleSpinner } from "features/Spinners";

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

export const setCredentials = createAction<setUserDataType>(
  "user/setUserCredentials"
);
export const logOut = createAction("user/logOut");

export const setUserData = createAction<setUserDataType>("user/setUserData");
export const setSigninError = createAction<Error>("user/setSigninError");

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async ({ refresh }: { refresh: string }) => {
    const response = await refreshTokenApi.post<tokens>("/", { refresh });
    return response.data;
  }
);

export const googleLogin = createAsyncThunk(
  "user/googleLogin",
  async ({ auth_token }: { auth_token: string }, thunkAPI) => {
    const response = await googleLoginApi.post<tokens>("/", {
      auth_token,
    });
    thunkAPI.dispatch(setGoogleSpinner(false));
    return response.data;
  }
);

export const githubLogin = createAsyncThunk(
  "user/githubLogin",
  async ({ auth_token }: { auth_token: string }, thunkAPI) => {
    const response = await githubLoginApi.post<tokens>("/", { auth_token });
    thunkAPI.dispatch(setGithubSpinner(false));
    return response.data;
  }
);

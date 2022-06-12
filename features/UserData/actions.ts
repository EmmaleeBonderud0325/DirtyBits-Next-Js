import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { googleLoginApi, refreshTokenApi } from "components/api/apis";

export type tokens = {
  access: string;
  refresh: string;
};

export type setUserDataType = {
  access: string;
  refresh: string;
  remember_me: boolean;
};

export type Error = {
  errorString: string;
};

type GoogleApiResponseType = {
  access: string;
  refresh: string;
};

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
  async ({ auth_token }: { auth_token: string }) => {
    const response = await googleLoginApi.post<GoogleApiResponseType>("/", {
      auth_token,
    });
    return response.data;
  }
);

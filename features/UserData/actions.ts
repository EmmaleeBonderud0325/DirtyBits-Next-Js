import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { refreshTokenApi } from "components/api/apis";

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

export const setUserData = createAction<setUserDataType>("user/setUserData");
export const setSigninError = createAction<Error>("user/setSigninError");

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async ({ refresh }: { refresh: string }) => {
    const response = await refreshTokenApi.post<tokens>("/", { refresh });
    return response.data;
  }
);

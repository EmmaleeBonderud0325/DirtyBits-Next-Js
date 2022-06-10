import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { refreshTokenApi } from "components/api/apis";

export type tokens = {
  access: string;
  refresh: string;
};

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async ({ refresh }: { refresh: string }) => {
    const response = await refreshTokenApi.post<tokens>("/", { refresh });
    return response.data;
  }
);

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "app/store";
import { setCredentials, logOut } from "features/UserData";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).userData.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

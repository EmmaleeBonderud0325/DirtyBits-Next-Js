import { combineReducers } from "@reduxjs/toolkit";
import { problemSetApi } from "apis/problemSet";
import { submissionListApi } from "apis/ProblemPage/submissionList";
import { problemDataApi } from "apis/ProblemPage/problemData";
import { spinnerReducer } from "./Spinners";
import { userDataReducer } from "./UserData";

export const reducers = combineReducers({
  userData: userDataReducer,
  spinners: spinnerReducer,
  [problemSetApi.reducerPath]: problemSetApi.reducer,
  [submissionListApi.reducerPath]: submissionListApi.reducer,
  [problemDataApi.reducerPath]: problemDataApi.reducer,
});

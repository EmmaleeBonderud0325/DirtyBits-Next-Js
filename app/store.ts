import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { reducers } from "features/reducers";
import {problemSetApi} from 'apis/problemSet'
import {submissionListApi} from 'apis/ProblemPage/submissionList'
import {problemDataApi} from 'apis/ProblemPage/problemData'

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(problemSetApi.middleware).concat(submissionListApi.middleware).concat(problemDataApi.middleware),
  // reducer: reducers,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

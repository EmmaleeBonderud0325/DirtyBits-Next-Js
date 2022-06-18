import { RootState } from "../../app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectUserData = (state: RootState) => state.userData;

export type UserStateType = ReturnType<typeof selectUserData>;

export const userDataSelector = createSelector(
  selectUserData,
  (state) => state
);

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;

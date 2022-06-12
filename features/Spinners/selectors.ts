import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectSprinnerData = (state: RootState) => state.spinners;

export const spinnerDataSelector = createSelector(
  selectSprinnerData,
  (state) => state
);

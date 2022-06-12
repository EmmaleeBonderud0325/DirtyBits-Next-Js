import { createReducer } from "@reduxjs/toolkit";
import { setGoogleSpinner, setGithubSpinner } from "./actions";

type InitialState = {
  googleSpinner: boolean;
  githubSpinner: boolean;
};

const initialState: InitialState = {
  googleSpinner: false,
  githubSpinner: false,
};

export const spinnerReducer = createReducer(initialState, (builder) => {
  builder.addCase(setGoogleSpinner, (state, acttion) => {
    state.googleSpinner = acttion.payload;
  });
  builder.addCase(setGithubSpinner, (state, action) => {
    state.githubSpinner = action.payload;
  });
});

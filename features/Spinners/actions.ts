import { createAction } from "@reduxjs/toolkit";

export const setGoogleSpinner = createAction<boolean>("spinner/googleSpinner");
export const setGithubSpinner = createAction<boolean>("spinner/githubSpinner");

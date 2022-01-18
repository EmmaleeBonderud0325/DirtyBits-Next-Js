import {
  GithubLoginSpinner,
  GoogleLoginSpinner,
  SimpleLoginSpinner,
} from "../types";

const signIn_initialState = false;
const githubLogin_initialState = false;
const googleLogin_initialState = false;

export const simpleLoginSpinnerReducer = (
  state = signIn_initialState,
  action
) => {
  switch (action.type) {
    case SimpleLoginSpinner:
      return action.payload;
    default:
      return state;
  }
};

export const githubLoginSpinnerReducer = (
  state = githubLogin_initialState,
  action
) => {
  switch (action.type) {
    case GithubLoginSpinner:
      return action.payload;
    default:
      return state;
  }
};

export const googleLoginSpinnerReducer = (
  state = googleLogin_initialState,
  action
) => {
  switch (action.type) {
    case GoogleLoginSpinner:
      return action.payload;
    default:
      return state;
  }
};

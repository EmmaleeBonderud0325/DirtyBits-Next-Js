import {
  GithubLoginSpinner,
  GoogleLoginSpinner,
  SimpleLoginSpinner,
} from "../types";

const signIn_initialState: boolean = false;
const githubLogin_initialState: boolean = false;
const googleLogin_initialState: boolean = false;

type Action = {
  type: string;
  payload: boolean;
};

export const simpleLoginSpinnerReducer = (
  state: boolean = signIn_initialState,
  action: Action
): boolean => {
  switch (action.type) {
    case SimpleLoginSpinner:
      return action.payload;
    default:
      return state;
  }
};

export const githubLoginSpinnerReducer = (
  state: boolean = githubLogin_initialState,
  action: Action
): boolean => {
  switch (action.type) {
    case GithubLoginSpinner:
      return action.payload;
    default:
      return state;
  }
};

export const googleLoginSpinnerReducer = (
  state: boolean = googleLogin_initialState,
  action: Action
): boolean => {
  switch (action.type) {
    case GoogleLoginSpinner:
      return action.payload;
    default:
      return state;
  }
};

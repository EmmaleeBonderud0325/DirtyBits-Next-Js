import { getProblemsList } from "../../components/api/apis";
import {
  updateConstraints,
  updateNote,
  updateInputFormat,
  updateOutputFormat,
  updateLevel,
  updateStatement,
  updateTitle,
  updateUserData,
  updateTags,
  FirstNameError,
  LastNameError,
  UsernameError,
  EmailError,
  PasswordError,
  ConfirmPasswordError,
  UpdateProblemList,
  updateMemoryLimit,
  updateTimeLimit,
} from "../types";

import { Updateproblemsstatus } from "../../components/Helper/Updateproblemsstatus";
import Cookies from "js-cookie";
import { initial_state as userInitialState } from "../reducers/UserDataReducer";

export const updateUserinfo = (newState) => {
  return {
    type: updateUserData,
    payload: newState,
  };
};

export const updateProblemTitle = (newState) => {
  return {
    type: updateTitle,
    payload: newState,
  };
};

export const updateProblemNote = (newState) => {
  return {
    type: updateNote,
    payload: newState,
  };
};

export const updateProblemStatement = (newState) => {
  return {
    type: updateStatement,
    payload: newState,
  };
};

export const updateProblemInputFormat = (newState) => {
  return {
    type: updateInputFormat,
    payload: newState,
  };
};

export const updateProblemContraints = (newState) => {
  return {
    type: updateConstraints,
    payload: newState,
  };
};

export const updateProblemOutputFormat = (newState) => {
  return {
    type: updateOutputFormat,
    payload: newState,
  };
};

export const updateProblemLevel = (newState) => {
  const mapping = {
    Easy: "E",
    Medium: "M",
    Hard: "H",
  };
  return {
    type: updateLevel,
    payload: mapping[newState],
  };
};

export const updateProblemTags = (newState) => {
  return {
    type: updateTags,
    payload: newState,
  };
};

export const updateProblemMemoryLimit = (newState) => {
  return {
    type: updateMemoryLimit,
    payload: newState,
  };
};

export const updateProblemTimeLimit = (newState) => {
  return {
    type: updateTimeLimit,
    payload: newState,
  };
};

export const updateFirstNameError = (newState) => {
  return {
    type: FirstNameError,
    payload: newState,
  };
};

export const updateLastNameError = (newState) => {
  return {
    type: LastNameError,
    payload: newState,
  };
};

export const updateUsernameError = (newState) => {
  return {
    type: UsernameError,
    payload: newState,
  };
};

export const updateEmailError = (newState) => {
  return {
    type: EmailError,
    payload: newState,
  };
};

export const updatePasswordError = (newState) => {
  return {
    type: PasswordError,
    payload: newState,
  };
};

export const updateConfirmPasswordError = (newState) => {
  return {
    type: ConfirmPasswordError,
    payload: newState,
  };
};

export const updateProblemList = (newState) => {
  return {
    type: UpdateProblemList,
    payload: newState,
  };
};

export const updateProblemsStatus = () => async (dispatch, getState) => {
  let state = getState();
  const data = await Updateproblemsstatus(state.problemList);
  dispatch(updateProblemList(data));
};

export const getProblems = () => async (dispatch, getState) => {
  try {
    const result = await getProblemsList.get("/");
    dispatch(updateProblemList(result.data));
    if (getState().userData.is_logged_in) {
      dispatch(updateProblemsStatus());
    }
  } catch {
    console.error("Server Error in Problems List Fetching");
  }
};

export const logoutUser = () => async (dispatch, getState) => {
  try {
    await logoutUser
      .post("/", { refresh_token: Cookies.get("refresh") })
      .then(() => {
        dispatch(updateUserinfo(userInitialState));
      });
  } catch {
    console.error("Server Error in Problems List Fetching");
  }
};

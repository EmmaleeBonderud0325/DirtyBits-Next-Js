import {
  UpdateEditorValue,
  UpdateEditorTheme,
  UpdateEditorLanguage,
  UpdateEditorFontSize,
  UpdateProblemPageProblemId,
  UpdateProblemPageProblemData,
} from "../types";

import { getProblem } from "../../components/api/apis";

export const changeEditorValue = (newState) => {
  return {
    type: UpdateEditorValue,
    payload: newState,
  };
};

export const changeTheme = (newState) => {
  return {
    type: UpdateEditorTheme,
    payload: newState,
  };
};

export const changeLanguage = (newState) => {
  return {
    type: UpdateEditorLanguage,
    payload: newState,
  };
};

export const changeFont = (newState) => {
  return {
    type: UpdateEditorFontSize,
    payload: newState,
  };
};

export const changeProblemData = (newState) => {
  return {
    type: UpdateProblemPageProblemData,
    payload: newState,
  };
};

export const getProblemPageProblemData = (id) => async (dispatch, getState) => {
  try {
    const { data } = await getProblem.get(`/${id}/`);
    dispatch(changeProblemData(data));
  } catch (err) {
    console.log("error");
  }
};

export const changeProblemPageProblemId = (newState) => {
  return {
    type: UpdateProblemPageProblemId,
    payload: newState,
  };
};

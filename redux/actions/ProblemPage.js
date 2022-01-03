import {
  UpdateEditorValue,
  UpdateEditorTheme,
  UpdateEditorLanguage,
  UpdateEditorFontSize,
  UpdateProblemPageProblemId,
} from "../types";

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

export const changeProblemPageProblemId = (newState) => {
  return {
    type: UpdateProblemPageProblemId,
    payload: newState,
  };
};

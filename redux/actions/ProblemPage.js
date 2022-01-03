import {
  UpdateEditorValue,
  UpdateEditorTheme,
  UpdateEditorLanguage,
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

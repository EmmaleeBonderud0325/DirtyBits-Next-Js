import {
  UpdateEditorValue,
  UpdateEditorTheme,
  UpdateEditorLanguage,
  UpdateEditorFontSize,
  UpdateProblemPageProblemId,
  UpdateProblemPageProblemData,
} from "../types";
import { getProblem, getSavedCode } from "../../components/api/apis";
const jsonData = require("../../components/ProblemPage/data.json");

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
    if (getState().userData.is_logged_in) {
      const res = await getSavedCode.get(`/${id}/`);
      dispatch(changeEditorValue(res.data[0].code));
      const currLang = getState().editorLanguage;
      for (let i = 0; i < jsonData.language.length; i++) {
        if (jsonData.language[i].label === res.data[0].language) {
          dispatch(
            changeLanguage({
              currLang,
              value: jsonData.language[i].value,
              label: jsonData.language[i].label,
              ext: jsonData.language[i].ext,
              icon: jsonData.language[i].icon,
            })
          );
          break;
        }
      }
    }
  } catch (err) {
    console.error("error");
  }
};

export const changeProblemPageProblemId = (newState) => {
  return {
    type: UpdateProblemPageProblemId,
    payload: newState,
  };
};

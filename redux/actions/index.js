import {
  updateConstraints,
  updateDescription,
  updateInputFormat,
  updateOutputFormat,
  updateLevel,
  updateStatement,
  updateTitle,
  updateUserData,
  updateTags,
} from "../types";

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

export const updateProblemDescription = (newState) => {
  return {
    type: updateDescription,
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
  return {
    type: updateLevel,
    payload: newState,
  };
};

export const updateProblemTags = (newState) => {
  return {
    type: updateTags,
    payload: newState,
  };
};

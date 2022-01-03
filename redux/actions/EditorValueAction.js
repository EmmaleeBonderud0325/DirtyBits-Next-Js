import { UpdateEditorValue } from "../types";

export const changeEditorValue = (newState) => {
  return {
    type: UpdateEditorValue,
    payload: newState,
  };
};

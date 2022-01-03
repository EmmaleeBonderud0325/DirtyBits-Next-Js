import { UpdateEditorValue } from "../types";

let initial = "";

export const EditorValueReducer = (state = initial, action) => {
  switch (action.type) {
    case UpdateEditorValue:
      return action.payload;
    default:
      return state;
  }
};

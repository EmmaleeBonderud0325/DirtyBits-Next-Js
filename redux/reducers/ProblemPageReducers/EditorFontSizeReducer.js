import { UpdateEditorFontSize } from "../../types";

let initial = "15px";

export const FontSizeReducer = (state = initial, action) => {
  switch (action.type) {
    case UpdateEditorFontSize:
      return action.payoad;
    default:
      return state;
  }
};

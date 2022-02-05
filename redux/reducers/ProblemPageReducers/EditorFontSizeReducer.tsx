import { UpdateEditorFontSize } from "../../types";

type Action = {
  type: string;
  payload: string;
};

let initial: string = "15px";

export const FontSizeReducer = (
  state: string = initial,
  action: Action
): string => {
  switch (action.type) {
    case UpdateEditorFontSize:
      return action.payload;
    default:
      return state;
  }
};

import { themeI } from "../../interfaces";
import { UpdateEditorTheme } from "../../types";

type Action = {
  type: string;
  payload: themeI;
};

let initial: themeI = {
  label: "Dracula",
  value: "dracula",
  type: "dark",
};

export const ThemeReducer = (
  state: themeI = initial,
  action: Action
): themeI => {
  switch (action.type) {
    case UpdateEditorTheme:
      return action.payload;
    default:
      return state;
  }
};

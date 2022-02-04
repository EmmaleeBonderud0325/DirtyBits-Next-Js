import { themeType } from "../../interfaces";
import { UpdateEditorTheme } from "../../types";

type Action = {
  type: string;
  payload: themeType;
};

let initial: themeType = {
  label: "Dracula",
  value: "dracula",
  type: "dark",
};

export const ThemeReducer = (
  state: themeType = initial,
  action: Action
): themeType => {
  switch (action.type) {
    case UpdateEditorTheme:
      return action.payload;
    default:
      return state;
  }
};

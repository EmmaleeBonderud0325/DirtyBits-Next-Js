import { UpdateEditorTheme } from "../types";

let initial = {
  label: "Dracula",
  value: "dracula",
  type: "dark",
};

export const ThemeReducer = (state = initial, action) => {
  switch (action.type) {
    case UpdateEditorTheme:
      return action.payload;
    default:
      return state;
  }
};

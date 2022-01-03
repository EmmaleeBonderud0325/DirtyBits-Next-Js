import { UpdateEditorLanguage } from "../../types";

let initial = {
  label: "C++",
  value: "text/x-c++src",
  ext: ".cpp",
};

export const EditorLanguageReducer = (state = initial, action) => {
  switch (action.type) {
    case UpdateEditorLanguage:
      return action.payload;
    default:
      return state;
  }
};

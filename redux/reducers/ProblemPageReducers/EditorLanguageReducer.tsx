import { editorLanguage } from "../../interfaces";
import { UpdateEditorLanguage } from "../../types";

type Action = {
  type: string;
  payload: editorLanguage;
};

let initial: editorLanguage = {
  label: "C++",
  value: "text/x-c++src",
  ext: ".cpp",
};

export const EditorLanguageReducer = (
  state: editorLanguage = initial,
  action: Action
): editorLanguage => {
  switch (action.type) {
    case UpdateEditorLanguage:  
      return action.payload;
    default:
      return state;
  }
};

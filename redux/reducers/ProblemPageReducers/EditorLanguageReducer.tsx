import { editorLanguageI } from "../../interfaces";
import { UpdateEditorLanguage } from "../../types";

type Action = {
  type: string;
  payload: editorLanguageI;
};

let initial: editorLanguageI = {
  label: "C++",
  value: "text/x-c++src",
  ext: ".cpp",
  icon: "SiCplusplus",
};

export const EditorLanguageReducer = (
  state: editorLanguageI = initial,
  action: Action
): editorLanguageI => {
  switch (action.type) {
    case UpdateEditorLanguage:
      return action.payload;
    default:
      return state;
  }
};

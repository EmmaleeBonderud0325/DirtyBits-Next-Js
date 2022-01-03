import { UpdateEditorValue } from "../types";

let initial =
  "#include<iostream>\nusing namespace std;\n\nint main(){\n\n  return 0;\n}";

export const EditorValueReducer = (state = initial, action) => {
  switch (action.type) {
    case UpdateEditorValue:
      return action.payload;
    default:
      return state;
  }
};

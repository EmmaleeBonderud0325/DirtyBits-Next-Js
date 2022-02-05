import { UpdateEditorValue } from "../../types";

type Action = {
  type: string;
  payload: string;
};

let initial: string =
  "#include<iostream>\nusing namespace std;\n\nint main(){\n\n  return 0;\n}";

export const EditorValueReducer = (
  state: string = initial,
  action: Action
): string => {
  switch (action.type) {
    case UpdateEditorValue:
      return action.payload;
    default:
      return state;
  }
};

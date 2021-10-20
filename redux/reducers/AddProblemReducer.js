import {
  updateConstraints,
  updateDescription,
  updateInputFormat,
  updateOutputFormat,
  updateLevel,
  updateStatement,
  updateTags,
  updateTitle,
} from "../types";

let initial = {
  title: "",
  description: "",
  problem_statement: "",
  input_format: "",
  constraints: "",
  output_format: "",
  problem_level: "Level",
  tags: [],
};

export const AddProblemReducer = (state = initial, action) => {
  switch (action.type) {
    case updateTitle:
      return { ...state, title: action.payload };
    case updateDescription:
      return { ...state, description: action.payload };
    case updateStatement:
      return { ...state, problem_statement: action.payload };
    case updateInputFormat:
      return { ...state, input_format: action.payload };
    case updateConstraints:
      return { ...state, constraints: action.payload };
    case updateOutputFormat:
      return { ...state, output_format: action.payload };
    case updateLevel:
      return { ...state, problem_level: action.payload };
    case updateTags:
      return { ...state, tags: action.payload };
    default:
      return initial;
  }
};

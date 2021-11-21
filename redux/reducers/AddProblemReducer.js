import {
  updateConstraints,
  updateNote,
  updateInputFormat,
  updateOutputFormat,
  updateLevel,
  updateStatement,
  updateTags,
  updateTitle,
  updateMemoryLimit,
  updateTimeLimit,
} from "../types";

let initial = {
  title: "",
  problem_statement: "",
  note: "",
  input_format: "",
  constraints: "",
  output_format: "",
  problem_level: "Difficulty",
  tags: [],
  memory_Limit: null,
  time_Limit: null,
};

export const AddProblemReducer = (state = initial, action) => {
  switch (action.type) {
    case updateTitle:
      return { ...state, title: action.payload };
    case updateNote:
      return { ...state, note: action.payload };
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
    case updateMemoryLimit:
      return { ...state, memory_Limit: action.payload };
    case updateTimeLimit:
      return { ...state, time_Limit: action.payload };
    default:
      return state;
  }
};

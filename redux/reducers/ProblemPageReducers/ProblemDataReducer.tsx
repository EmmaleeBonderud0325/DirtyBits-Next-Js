import { problemDataTypes } from "../../interfaces";
import { UpdateProblemPageProblemData } from "../../types";

type Action = {
  type: string;
  payload: problemDataTypes;
};

export const initial: problemDataTypes = {
  created_by: "",
  title: "",
  problem_statement: "",
  note: "",
  input_format: "",
  constraints: "",
  output_format: "",
  max_score: 0,
  tags: "",
  problem_level: "",
  accuracy: "",
  totalSubmissions: 0,
  sample_Tc: 0,
  total_Tc: 0,
  created_At: "",
  memory_Limit: 0,
  time_Limit: 0,
  publically_visible: false,
  approved_by_admin: false,
  up_votes: 0,
  down_votes: 0,
};

export const ProblemDataReducer = (
  state: problemDataTypes = initial,
  action: Action
): problemDataTypes => {
  switch (action.type) {
    case UpdateProblemPageProblemData:
      return action.payload;
    default:
      return state;
  }
};

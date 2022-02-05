import { problemDataI } from "../../interfaces";
import { UpdateProblemPageProblemData } from "../../types";

type Action = {
  type: string;
  payload: problemDataI;
};

export const initial: problemDataI = {
  id: null,
  created_by: "",
  title: "",
  problem_statement: "",
  note: "",
  input_format: "",
  constraints: "",
  output_format: "",
  max_score: 0,
  tags: [],
  company_tags: [],
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
  state: problemDataI = initial,
  action: Action
): problemDataI => {
  switch (action.type) {
    case UpdateProblemPageProblemData:
      return action.payload;
    default:
      return state;
  }
};

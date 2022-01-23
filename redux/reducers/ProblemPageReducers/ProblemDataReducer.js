import { UpdateProblemPageProblemData } from "../../types";

export const initial = {
  created_by: "",
  title: "",
  problem_statement: "",
  note: "",
  input_format: "",
  constraints: "",
  output_format: "",
  max_score: "",
  tags: "",
  problem_level: "",
  accuracy: "",
  totalSubmissions: "",
  sample_Tc: "",
  total_Tc: "",
  created_At: "",
  memory_Limit: "",
  time_Limit: "",
  publically_visible: "",
  approved_by_admin: "",
  up_votes: "",
  down_votes: "",
};

export const ProblemDataReducer = (state = initial, action) => {
  switch (action.type) {
    case UpdateProblemPageProblemData:
      return action.payload;
    default:
      return state;
  }
};

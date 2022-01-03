import { UpdateProblemPageProblemId } from "../types";

let initial = null;

export const ProblemPageProblemIdReducer = (state = initial, action) => {
  switch (action.type) {
    case UpdateProblemPageProblemId:
      return action.payload;
    default:
      return state;
  }
};

import { UpdateProblemList } from "../types";

let initial = [];

export const ProblemListReducer = (state = initial, action) => {
  switch (action.type) {
    case UpdateProblemList:
      return action.payload;
    default:
      return state;
  }
};

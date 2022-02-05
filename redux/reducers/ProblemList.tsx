import { UpdateProblemList } from "../types";
import { problemListI } from "../interfaces";

type Action = {
  type: string;
  payload: problemListI[];
};

let initial: problemListI[] = [];

export const ProblemListReducer = (
  state: problemListI[] = initial,
  action: Action
): problemListI[] => {
  switch (action.type) {
    case UpdateProblemList:
      return action.payload;
    default:
      return state;
  }
};

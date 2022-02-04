import { UpdateProblemList } from "../types";
import { problemListType } from "../interfaces";

type Action = {
  type: string;
  payload: problemListType[];
};

let initial: problemListType[] = [];

export const ProblemListReducer = (
  state: problemListType[] = initial,
  action: Action
) => {
  switch (action.type) {
    case UpdateProblemList:
      return action.payload;
    default:
      return state;
  }
};

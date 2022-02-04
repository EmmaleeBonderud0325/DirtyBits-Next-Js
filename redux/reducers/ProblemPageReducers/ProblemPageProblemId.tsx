import { UpdateProblemPageProblemId } from "../../types";

let initial: number | null = null;

export const ProblemPageProblemIdReducer = (
  state: number | null = initial,
  action: { type: string; payload: number | null }
): number | null => {
  switch (action.type) {
    case UpdateProblemPageProblemId:
      return action.payload;
    default:
      return state;
  }
};

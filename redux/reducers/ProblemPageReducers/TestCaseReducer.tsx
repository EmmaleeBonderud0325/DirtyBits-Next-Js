import { UpdateInputTestCases, UpdateOutputTestCases } from "../../types";

let InputTestCases_initial_state: string[] = [];
let OutputTestCases_initial_state: string[] = [];

export const InputTestCasesReducer = (
  state: string[] = InputTestCases_initial_state,
  action: { type: string; payload: string[] }
): string[] => {
  switch (action.type) {
    case UpdateInputTestCases:
      return action.payload;
    default:
      return state;
  }
};

export const OutputTestCasesReducer = (
  state: string[] = OutputTestCases_initial_state,
  action: { type: string; payload: string[] }
): string[] => {
  switch (action.type) {
    case UpdateOutputTestCases:
      return action.payload;
    default:
      return state;
  }
};

import { UpdateInputTestCases, UpdateOutputTestCases } from "../../types";

let InputTestCases_initial_state = [];
let OutputTestCases_initial_state = [];

export const InputTestCasesReducer = (
  state = InputTestCases_initial_state,
  action
) => {
  switch (action.type) {
    case UpdateInputTestCases:
      return action.payload;
    default:
      return state;
  }
};

export const OutputTestCasesReducer = (
  state = OutputTestCases_initial_state,
  action
) => {
  switch (action.type) {
    case UpdateOutputTestCases:
      return action.payload;
    default:
      return state;
  }
};

import {
  UpdateSubmissionsList,
  UpdateGetSubmissionsState,
  AppendSubmissionList,
} from "../../types";
import cloneDeep from "lodash/cloneDeep";

const initial = null;

const getSubmissionsState_initial = true;

export const SubmissionsListReducer = (state = initial, action) => {
  switch (action.type) {
    case UpdateSubmissionsList:
      return action.payload;
    case AppendSubmissionList:
      if (state === null) {
        return [action.payload];
      }
      let oldState = cloneDeep(state);
      oldState.unshift(action.payload);
      return oldState;
    default:
      return state;
  }
};

export const GetSubmissionsStateReducer = (
  state = getSubmissionsState_initial,
  action
) => {
  switch (action.type) {
    case UpdateGetSubmissionsState:
      return action.payload;
    default:
      return state;
  }
};

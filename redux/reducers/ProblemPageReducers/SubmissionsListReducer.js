import {
  UpdateSubmissionsList,
  UpdateGetSubmissionsState,
} from "../../types";

const initial = null;

const getSubmissionsState_initial = true;

export const SubmissionsListReducer = (state = initial, action) => {
  switch (action.type) {
    case UpdateSubmissionsList:
      return action.payload;
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

import {
  UpdateIsUpvoted,
  UpdateIsDownvoted,
  UpdateUpvotes,
  UpdateDownvotes,
  UpdateSubmissionCount,
  UpdateIsBookmarked,
} from "../../types";

type ActionNumber = {
  type: string;
  payload: number;
};

type ActionBoolean = {
  type: string;
  payload: boolean;
};

let upvote_initial: number = 0;
let isUpvoted_initial: boolean = false;

let downvote_initial: number = 0;
let isDownvoted_initial: boolean = false;

let submissionCount_initial: number = 0;

let isBookmarked_initial: boolean = false;

export const UpvoteReducer = (
  state: number = upvote_initial,
  action: ActionNumber
): number => {
  switch (action.type) {
    case UpdateUpvotes:
      return action.payload;
    default:
      return state;
  }
};

export const SetIsUpvotedReducer = (
  state: boolean = isUpvoted_initial,
  action: ActionBoolean
): boolean => {
  switch (action.type) {
    case UpdateIsUpvoted:
      return action.payload;
    default:
      return state;
  }
};

export const DownvoteReducer = (
  state: number = downvote_initial,
  action: ActionNumber
): number => {
  switch (action.type) {
    case UpdateDownvotes:
      return action.payload;
    default:
      return state;
  }
};

export const SetIsDownvotedReducer = (
  state: boolean = isDownvoted_initial,
  action: ActionBoolean
): boolean => {
  switch (action.type) {
    case UpdateIsDownvoted:
      return action.payload;
    default:
      return state;
  }
};

export const submissionCountReducer = (
  state: number = submissionCount_initial,
  action: ActionNumber
): number => {
  switch (action.type) {
    case UpdateSubmissionCount:
      return action.payload;
    default:
      return state;
  }
};

export const SetIsBookmarkedReducer = (
  state: boolean = isBookmarked_initial,
  action: ActionBoolean
): boolean => {
  switch (action.type) {
    case UpdateIsBookmarked:
      return action.payload;
    default:
      return state;
  }
};

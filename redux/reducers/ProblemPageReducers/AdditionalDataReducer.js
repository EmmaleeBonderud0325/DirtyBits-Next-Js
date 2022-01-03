import {
  UpdateIsUpvoted,
  UpdateIsDownvoted,
  UpdateUpvotes,
  UpdateDownvotes,
  UpdateSubmissionCount,
  UpdateIsBookmarked,
} from "../../types";

let upvote_initial = 0;
let isUpvoted_initial = false;

let downvote_initial = 0;
let isDownvoted_initial = false;

let submissionCount_initial = 0;

let isBookmarked_initial = false;

export const UpvoteReducer = (state = upvote_initial, action) => {
  switch (action.type) {
    case UpdateUpvotes:
      return action.payload;
    default:
      return state;
  }
};

export const SetIsUpvotedReducer = (state = isUpvoted_initial, action) => {
  switch (action.type) {
    case UpdateIsUpvoted:
      return action.payload;
    default:
      return state;
  }
};

export const DownvoteReducer = (state = downvote_initial, action) => {
  switch (action.type) {
    case UpdateDownvotes:
      return action.payload;
    default:
      return state;
  }
};

export const SetIsDownvotedReducer = (state = isDownvoted_initial, action) => {
  switch (action.type) {
    case UpdateIsDownvoted:
      return action.payload;
    default:
      return state;
  }
};

export const submissionCountReducer = (
  state = submissionCount_initial,
  action
) => {
  switch (action.type) {
    case UpdateSubmissionCount:
      return action.payload;
    default:
      return state;
  }
};

export const SetIsBookmarkedReducer = (
  state = isBookmarked_initial,
  action
) => {
  switch (action.type) {
    case UpdateIsBookmarked:
      return action.payload;
    default:
      return state;
  }
};

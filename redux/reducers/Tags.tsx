import { tagsI } from "../interfaces";
import { UpdateTags } from "../types";

type Action = {
  type: string;
  payload: tagsI;
};

const initalState: tagsI[] = [];

export const TagsReducer = (state = initalState, action: Action) => {
  switch (action.type) {
    case UpdateTags:
      return action.payload;
    default:
      return state;
  }
};

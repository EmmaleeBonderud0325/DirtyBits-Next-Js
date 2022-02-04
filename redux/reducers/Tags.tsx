import { tagsType } from "../interfaces";

type Action = {
  type: string;
  payload: tagsType;
};

const initalState: tagsType[] = [];

export const TagsReducer = (state = initalState, action: Action) => {
  switch (action.type) {
    case "GET_TAGS":
      return action.payload;
    default:
      return state;
  }
};

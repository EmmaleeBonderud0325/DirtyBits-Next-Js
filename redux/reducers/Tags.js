const initalState = [];

export const TagsReducer = (state = initalState, action) => {
  switch (action.type) {
    case "GET_TAGS":
      return action.payload;
    default:
      return state;
  }
};

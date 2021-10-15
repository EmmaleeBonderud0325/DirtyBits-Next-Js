import { updateUserData } from "../types";

export const updateUserinfo = (newState) => {
  return {
    type: updateUserData,
    payload: newState,
  };
};

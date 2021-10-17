import { updateUserData } from "../types";
import Cookies from "js-cookie";

export const updateUserinfo = (newState) => {
  return {
    type: updateUserData,
    payload: newState,
  };
};
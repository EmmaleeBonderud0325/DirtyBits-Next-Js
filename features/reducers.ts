import { combineReducers } from "@reduxjs/toolkit";
import { userDataReducer } from "./UserData";

export const reducers = combineReducers({
  userData: userDataReducer,
});

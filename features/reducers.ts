import { combineReducers } from "@reduxjs/toolkit";
import { spinnerReducer } from "./Spinners";
import { userDataReducer } from "./UserData";

export const reducers = combineReducers({
  userData: userDataReducer,
  spinners: spinnerReducer,
});

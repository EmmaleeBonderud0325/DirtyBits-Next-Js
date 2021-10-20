import { combineReducers } from "redux";
import { userDataReducer } from "./UserDataReducer";
import { AddProblemReducer } from "./AddProblemReducer";

export default combineReducers({
  userData: userDataReducer,
  addProblemData: AddProblemReducer,
});

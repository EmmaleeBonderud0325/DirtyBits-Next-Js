import { combineReducers } from "redux";
import { userDataReducer } from "./UserDataReducer";

export default combineReducers({
  userData: userDataReducer,
});

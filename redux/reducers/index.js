import { combineReducers } from "redux";
import { userDataReducer } from "./UserDataReducer";
import { AddProblemReducer } from "./AddProblemReducer";
import { SignupErrorReducer } from "./SignupErrors";

export default combineReducers({
  userData: userDataReducer,
  addProblemData: AddProblemReducer,
  signupErrors: SignupErrorReducer,
});

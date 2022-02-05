import { combineReducers } from "redux";

import { userDataReducer } from "./UserDataReducer";
import { AddProblemReducer } from "./AddProblemReducer";
import { SignupErrorReducer } from "./SignupErrors";
import { ProblemListReducer } from "./ProblemList";
import { EditorValueReducer } from "./ProblemPageReducers/EditorValueReducer";
import { ThemeReducer } from "./ProblemPageReducers/ThemeReducer";
import { EditorLanguageReducer } from "./ProblemPageReducers/EditorLanguageReducer";
import { FontSizeReducer } from "./ProblemPageReducers/EditorFontSizeReducer";
import { ProblemPageProblemIdReducer } from "./ProblemPageReducers/ProblemPageProblemId";
import { ProblemDataReducer } from "./ProblemPageReducers/ProblemDataReducer";
import {
  DownvoteReducer,
  SetIsBookmarkedReducer,
  SetIsDownvotedReducer,
  SetIsUpvotedReducer,
  submissionCountReducer,
  UpvoteReducer,
} from "./ProblemPageReducers/AdditionalDataReducer";
import {
  GetSubmissionsStateReducer,
  SubmissionsListReducer,
} from "./ProblemPageReducers/SubmissionsListReducer";
import {
  githubLoginSpinnerReducer,
  googleLoginSpinnerReducer,
  simpleLoginSpinnerReducer,
} from "./SigninSpinnerReducer";
import {
  InputTestCasesReducer,
  OutputTestCasesReducer,
} from "./ProblemPageReducers/TestCaseReducer";
import { TagsReducer } from "./Tags";

export const rootReducer = combineReducers({
  userData: userDataReducer,
  addProblemData: AddProblemReducer,
  signupErrors: SignupErrorReducer,
  problemList: ProblemListReducer,
  editorValue: EditorValueReducer,
  themeValue: ThemeReducer,
  editorLanguage: EditorLanguageReducer,
  fontSize: FontSizeReducer,
  problemPageProblemId: ProblemPageProblemIdReducer,
  problemData: ProblemDataReducer,
  upvoteCount: UpvoteReducer,
  downvoteCount: DownvoteReducer,
  isUpvoted: SetIsUpvotedReducer,
  isDownvoted: SetIsDownvotedReducer,
  submissionCount: submissionCountReducer,
  isBookmarked: SetIsBookmarkedReducer,
  inputTestCases: InputTestCasesReducer,
  outputTestCases: OutputTestCasesReducer,
  submissionsList: SubmissionsListReducer,
  getSubmissionsState: GetSubmissionsStateReducer,
  githubLoginSpinner: githubLoginSpinnerReducer,
  googleLoginSpinner: googleLoginSpinnerReducer,
  loginInSpinner: simpleLoginSpinnerReducer,
  tags: TagsReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;

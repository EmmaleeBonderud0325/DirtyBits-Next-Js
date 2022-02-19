import { Dispatch } from "redux";
import { IRootState } from "./reducers";

export interface userDataI {
  is_logged_in: boolean;
  is_verified: boolean;
  is_admin: boolean;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  profile_pic: string;
}

export type SUErrorI = {
  error: boolean;
  details: string;
};

export interface signupErrorI {
  username: SUErrorI;
  firstname: SUErrorI;
  lastname: SUErrorI;
  email: SUErrorI;
  password: SUErrorI;
  confirmPassword: SUErrorI;
}

export interface tagsI {
  value: null | number;
  label: string;
  color: string;
}

interface problemTagsI {
  id: number;
  name: string;
}

export interface problemListI {
  id: number;
  title: string;
  tags: problemTagsI[];
  totalSubmissions: number;
  problem_level: string;
  solved: string;
}

export interface addProblemI {
  title: string;
  problem_statement: string;
  note: string;
  input_format: string;
  constraints: string;
  output_format: string;
  problem_level: string;
  tags: number[];
  memory_Limit: number | null;
  time_Limit: number | null;
}

export interface themeI {
  label: string;
  value: string;
  type: string;
}

export interface editorLanguageI {
  label: string;
  value: string;
  ext: string;
  icon: string;
}

export interface submissionsListI {
  language: string;
  status: string;
  score: number;
  total_score: number;
  submission_Date_Time: string;
}

interface CompanyTagsI {
  id: number;
  name: string;
}

export interface problemDataI {
  id: number | null;
  created_by: string;
  title: string;
  problem_statement: string;
  note: string;
  input_format: string;
  constraints: string;
  output_format: string;
  max_score: number;
  tags: problemTagsI[];
  problem_level: string;
  accuracy: string;
  totalSubmissions: number;
  sample_Tc: number;
  total_Tc: number;
  created_At: string;
  memory_Limit: null | number;
  time_Limit: null | number;
  publically_visible: boolean;
  approved_by_admin: boolean;
  up_votes: number;
  down_votes: number;
  company_tags: CompanyTagsI[];
}

export interface submissionResultI {
  created_By: string;
  problem_Id: number;
  language: string;
  task_id: string;
  code: string;
  status: string;
  error: string;
  test_Cases_Passed: number;
  total_Test_Cases: number;
  score: number;
  total_score: number;
  submission_Date_Time: string;
}

export interface ProblemPageDataI {
  upvote: boolean;
  downvote: boolean;
  bookmarked: boolean;
  submissions: null | number;
}

export interface SavedCodeI {
  code: string;
  language: string;
  submission_Date_Time: string;
}

export interface NotificationI {
  message: string;
  message_type: string;
  created_at: string;
}

export interface NotificationsI {
  last_requested: string | null;
  notifications: NotificationI[];
}

export type GetStateI = () => IRootState;
export type DispatchI = Dispatch;

export interface userDataType {
  is_logged_in: boolean;
  is_admin: boolean;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  profile_pic: string;
}

type Error = {
  error: boolean;
  details: string;
};

export interface signupErrorType {
  username: Error;
  firstname: Error;
  lastname: Error;
  email: Error;
  password: Error;
  confirmPassword: Error;
}

import jwt_decode from "jwt-decode";

interface userDataType {
  is_logged_in: boolean;
  is_admin: boolean;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  profile_pic: string;
}

const Parsetoken = (token: string) => {
  let parsedData: userDataType = jwt_decode(token);
  return parsedData;
};

export default Parsetoken;

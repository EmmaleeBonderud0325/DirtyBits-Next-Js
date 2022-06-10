import jwt_decode from "jwt-decode";
import { userState } from "features/UserData";

const Parsetoken = (token: string) => {
  let parsedData: userState = jwt_decode(token);
  return parsedData;
};

export default Parsetoken;

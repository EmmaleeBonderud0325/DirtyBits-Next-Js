import { userData } from "features/UserData";
import jwt_decode from "jwt-decode";

const parseToken = (token: string) => {
  let parsedData: userData = jwt_decode(token);
  return parsedData;
};

export default parseToken;

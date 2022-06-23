import { userData } from "features/UserData";
import jwt_decode from "jwt-decode";

const parseToken = (token: string) => {
  let parsedData: any = jwt_decode(token);
  let data: userData = parsedData.user_data;
  return data;
};

export default parseToken;

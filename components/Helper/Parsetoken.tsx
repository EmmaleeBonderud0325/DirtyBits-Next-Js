import jwt_decode from "jwt-decode";
import { userDataType } from "../../redux/interfaces";

const Parsetoken = (token: string) => {
  let parsedData: userDataType = jwt_decode(token);
  return parsedData;
};

export default Parsetoken;

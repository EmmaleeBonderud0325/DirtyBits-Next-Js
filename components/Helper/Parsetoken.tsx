import jwt_decode from "jwt-decode";
import { userDataI } from "../../redux/interfaces";

const Parsetoken = (token: string) => {
  let parsedData: userDataI = jwt_decode(token);
  return parsedData;
};

export default Parsetoken;

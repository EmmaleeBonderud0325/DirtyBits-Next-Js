import jwt_decode from "jwt-decode";

const Parsetoken = (token) => {
  return jwt_decode(token);
};

export default Parsetoken;

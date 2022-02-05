import Cookies from "js-cookie";

import { updateUserData } from "../types";
import Parsetoken from "../../components/Helper/Parsetoken";
import { userDataI } from "../interfaces";

type Action = {
  type: string;
  payload: userDataI;
};

const initial_state: userDataI = {
  is_logged_in: false,
  is_admin: false,
  is_verified: false,
  email: "",
  first_name: "",
  last_name: "",
  username: "",
  profile_pic: "",
};

let refresh_token = Cookies.get("refresh");
if (refresh_token) {
  try {
    let data: userDataI = Parsetoken(refresh_token);
    initial_state.is_logged_in = true;
    initial_state.is_verified = data.is_verified;
    initial_state.is_admin = data.is_admin;
    initial_state.email = data.email;
    initial_state.first_name = data.first_name;
    initial_state.last_name = data.last_name;
    initial_state.username = data.username;
    initial_state.profile_pic = data.profile_pic;
  } catch (e) {
    console.error("Parsing Error !");
  }
}

export const userDataReducer = (
  state: userDataI = initial_state,
  action: Action
) => {
  switch (action.type) {
    case updateUserData:
      return {
        ...state,
        is_logged_in: action.payload.is_logged_in,
        is_admin: action.payload.is_admin,
        is_verified: action.payload.is_verified,
        email: action.payload.email,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        username: action.payload.username,
        profile_pic: action.payload.profile_pic,
      };
    default:
      return state;
  }
};

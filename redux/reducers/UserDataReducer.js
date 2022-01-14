import Cookies from "js-cookie";

import { updateUserData } from "../types";
import Parsetoken from "../../components/Helper/Parsetoken";

export const initial_state = {
  is_logged_in: false,
  is_admin: false,
  email: "",
  first_name: "",
  last_name: "",
  username: "",
  profile_pic: "",
};

let refresh_token = Cookies.get("refresh");
if (refresh_token) {
  try {
    const data = Parsetoken(refresh_token);
    initial_state.is_logged_in = true;
    initial_state.is_admin = data.is_admin;
    initial_state.email = data.user_mail;
    initial_state.first_name = data.first_name;
    initial_state.last_name = data.last_name;
    initial_state.username = data.username;
    initial_state.profile_pic = data.profile_pic;
  } catch (e) {
    console.error("Parsing Error !");
  }
}

export const userDataReducer = (state = initial_state, action) => {
  switch (action.type) {
    case updateUserData:
      return {
        ...state,
        is_logged_in: action.payload.is_logged_in,
        is_admin: action.payload.is_admin,
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

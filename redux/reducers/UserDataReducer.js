import Cookies from "js-cookie";

import { updateUserData } from "../types";
import Gettoken from "../../components/Helper/Gettoken";
import Parsetoken from "../../components/Helper/Parsetoken";

const initial_state = {
  is_logged_in: false,
  email: "",
  first_name: "",
  last_name: "",
  username: "",
};

let refresh_token = Cookies.get("refresh");
if (refresh_token) {
  if (Gettoken(refresh_token)) {
    const data = Parsetoken(Cookies.get("access"));
    initial_state.is_logged_in = true;
    initial_state.email = data.user_mail;
    initial_state.first_name = data.first_name;
    initial_state.last_name = data.last_name;
    initial_state.username = data.username;
  }
}

export const userDataReducer = (state = initial_state, action) => {
  switch (action.type) {
    case updateUserData:
      return {
        ...state,
        is_logged_in: action.payload.is_logged_in,
        email: action.payload.email,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        username: action.payload.username,
      };
    default:
      return state;
  }
};

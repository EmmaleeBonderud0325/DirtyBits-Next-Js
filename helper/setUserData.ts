import Cookies from "js-cookie";
import parseToken from "helper/parseToken";
import { UserStateType } from "features/UserData";

type Payload = {
  access: string;
  refresh: string;
};

export const setUserData = (
  state: UserStateType,
  payload: Payload,
  remember_me: boolean = true
) => {
  state.pending = false;
  const { access, refresh } = payload;
  if (remember_me) {
    var inTwentyMinutes = new Date(new Date().getTime() + 20 * 60 * 1000);
    Cookies.set("access", access, { expires: inTwentyMinutes });
    Cookies.set("refresh", refresh, { expires: 14 });
  } else {
    Cookies.set("refresh", refresh);
    Cookies.set("access", access);
  }
  const data = parseToken(access);
  if (data.is_verified) {
    (state.data.is_logged_in = true),
      (state.data.is_admin = data.is_admin),
      (state.data.is_verified = data.is_verified),
      (state.data.email = data.email),
      (state.data.first_name = data.first_name),
      (state.data.last_name = data.last_name),
      (state.data.username = data.username),
      (state.data.profile_pic = data.profile_pic);
  } else {
    state.error = true;
    state.errorString = "User Not Verified !";
  }
};

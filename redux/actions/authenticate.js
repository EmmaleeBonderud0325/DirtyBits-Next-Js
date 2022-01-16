import Cookies from "js-cookie";
import {
  githubLoginApi,
  googleLoginApi,
  logoutUser,
} from "../../components/api/apis";
import Parsetoken from "../../components/Helper/Parsetoken";
import { updateUserinfo } from "./index";
import Router from "next/router";
import { openNotificationWithIcon } from "../../components/OpenNotification";

export const updatedata = (result, dispatch) => {
  const { access, refresh } = result;
  const data = Parsetoken(access);
  if (data.is_verified) {
    var inTwentyMinutes = new Date(new Date().getTime() + 20 * 60 * 1000);
    Cookies.set("access", access, { expires: inTwentyMinutes });
    Cookies.set("refresh", refresh, { expires: 14 });
    dispatch(
      updateUserinfo({
        is_logged_in: true,
        is_admin: data.is_admin,
        email: data.user_mail,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        profile_pic: data.profile_pic,
      })
    );
    Router.push("/");
  }
};

export const githubLogin = (auth_token) => async (dispatch, _) => {
  await githubLoginApi
    .post("/", { auth_token })
    .then((result) => {
      updatedata(result.data, dispatch);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        openNotificationWithIcon(
          "error",
          "Login Error",
          error.response.data["detail"]
        );
      } else {
        console.error("Error", error);
      }
    });
};

export const googleLogin = (auth_token) => async (dispatch, _) => {
  await googleLoginApi
    .post("/", { auth_token })
    .then((result) => {
      updatedata(result.data, dispatch);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        openNotificationWithIcon(
          "error",
          "Login Error",
          error.response.data["detail"]
        );
      } else {
        console.error("Error", error);
      }
    });
};

export const signoutUser = (redirectOnSignout) => async (dispatch, _) => {
  try {
    logoutUser.post("/", { refresh_token: Cookies.get("refresh") });
  } catch (err) {
    console.error("error");
  }
  dispatch(
    updateUserinfo({
      is_logged_in: false,
      is_admin: false,
      email: "",
      first_name: "",
      last_name: "",
      username: "",
      profile_pic: "",
    })
  );
  Cookies.remove("access");
  Cookies.remove("refresh");
  if (redirectOnSignout) {
    Router.push("/");
  }
};

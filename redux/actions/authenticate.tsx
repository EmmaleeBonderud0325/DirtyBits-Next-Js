import Cookies from "js-cookie";
import Router from "next/router";
import { Dispatch } from "redux";

import { openNotificationWithIcon } from "components/OpenNotification";
import {
  githubLoginApi,
  googleLoginApi,
  logoutUser,
} from "../../components/api/apis";
import Parsetoken from "../../components/Helper/Parsetoken";
import {
  notifyFirstLoad,
  updateGithubSpinner,
  updateGoogleSpinner,
  UpdateNotifyFirstLoad,
  updateUserinfo,
} from "./index";
import { DispatchI, GetStateI, userDataI } from "../interfaces";

interface ResultI {
  access: string;
  refresh: string;
}

export const updatedata = (result: ResultI, dispatch: DispatchI): void => {
  const { access, refresh } = result;
  const data: userDataI = Parsetoken(access);
  if (data.is_verified) {
    var inTwentyMinutes = new Date(new Date().getTime() + 20 * 60 * 1000);
    Cookies.set("access", access, { expires: inTwentyMinutes });
    Cookies.set("refresh", refresh, { expires: 14 });
    dispatch(
      updateUserinfo({
        is_logged_in: true,
        is_admin: data.is_admin,
        is_verified: data.is_verified,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        profile_pic: data.profile_pic,
      })
    );
    dispatch<any>(notifyFirstLoad());
    Router.push("/");
  }
};

export const githubLogin =
  (auth_token: string) => async (dispatch: Dispatch, _: GetStateI) => {
    dispatch(updateGithubSpinner(true));
    await githubLoginApi
      .post<ResultI>("/", { auth_token })
      .then((result) => {
        updatedata(result.data, dispatch);
        Router.push('/')
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
    dispatch(updateGithubSpinner(false));
  };

export const googleLogin =
  (auth_token: string) => async (dispatch: Dispatch, _) => {
    dispatch(updateGoogleSpinner(true));
    await googleLoginApi
      .post<ResultI>("/", { auth_token })
      .then((result) => {
        updatedata(result.data, dispatch);
        Router.push('/')
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
    dispatch(updateGoogleSpinner(false));
  };

export const signoutUser =
  (redirectOnSignout: boolean) => async (dispatch: DispatchI, _: GetStateI) => {
    // try {
    //   logoutUser.post("/", { refresh_token: Cookies.get("refresh") });
    // } catch (err) {
    //   console.error("error");
    // }
    dispatch(
      updateUserinfo({
        is_logged_in: false,
        is_admin: false,
        is_verified: false,
        email: "",
        first_name: "",
        last_name: "",
        username: "",
        profile_pic: "",
      })
    );
    Cookies.remove("access");
    Cookies.remove("refresh");
    dispatch(
      UpdateNotifyFirstLoad({ last_requested: null, notifications: [] })
    );
    if (redirectOnSignout) {
      Router.push("/");
    }
  };

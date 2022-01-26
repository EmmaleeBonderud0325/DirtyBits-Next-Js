import axios from "axios";
import Cookies from "js-cookie";
import { refreshTokenApi } from "./apis";
import { signoutUser } from "../../redux/actions/authenticate";
import Router from "next/router";

export const CreateAxiosRequest = (baseURL) => {
  const newInstance = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  newInstance.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = "JWT " + Cookies.get("access");
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  newInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        originalRequest.url === baseURL + "auth/refresh/"
      ) {
        Router.push("/auth/signin");
        return Promise.reject(error);
      }

      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        const refresh_token = Cookies.get("refresh");
        return refreshTokenApi
          .post("/", {
            refresh: refresh_token,
          })
          .then((response) => {
            const { access, refresh } = response.data;
            Cookies.set("access", access);
            Cookies.set("refresh", refresh, { expires: 14 });
            newInstance.defaults.headers["Authorization"] = "JWT " + access;
            originalRequest.headers["Authorization"] = "JWT " + access;
            return newInstance(originalRequest);
          })
          .catch((err) => {
            // LOGOUT AND REDIRECT TO SIGNIN AGAIN
            console.log(err);
            // signoutUser(false);
            // Router.push("/auth/signin");
          });
      } else {
        // signoutUser(false);
        // Router.push("/auth/signin");
        return Promise.reject(error);
      }
    }
  );
  return newInstance;
};

import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { store } from "../../../redux/store";

import { githubLoginApi } from "../../../components/api/apis";
import Cookies from "js-cookie";
import { ContactSupportOutlined } from "@mui/icons-material";

function GitHubCallback() {
  return (
    <div>
      <h1>Code</h1>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const code = context.query.code;
  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: "fe9ab7d5c6d4b5d39cdb",
      code,
      client_secret: "3e37e78d5b01ab5d11352020ec8f83e26975d36e",
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  const access_token = response.data["access_token"];

  const result = await githubLoginApi.post("/", { auth_token: access_token });
  if (result.data["access"] && result.data["refresh"]) {
    // store.dispatch(updateUserinfoGithub(result.data));
    return {
      redirect: {
        destination: context.query.state,
        permanent: false,
      },
      props: {
        status: true,
        data: result.data,
      },
    };
  }
  return {
    redirect: {
      destination: context.query.state,
      permanent: false,
    },
    props: {
      status: false,
      data: "Error",
    },
  };
};

export default GitHubCallback;

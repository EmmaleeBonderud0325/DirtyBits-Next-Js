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
  console.log('getServerSideProps' ,process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID)
  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      code,
      client_secret: process.env.GITHUB_SECRET_ID,
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

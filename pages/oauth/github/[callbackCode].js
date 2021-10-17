import React from "react";
import axios from "axios";
import { githubLoginApi } from "../../../components/api/apis";

function GitHubCallback() {
  return (
    <div>
      <h1>Code</h1>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  console.log(context.query);
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
  console.log(response.data);
  const access_token = response.data["access_token"];

  //post access token
  await githubLoginApi
    .post("/", { auth_token: access_token })
    .then((result) => {
      console.log(result.data);
    });

  return {
    redirect: {
      destination: context.query.state,
      permanent: false,
    },
    props: {
      message: code,
    },
  };
};

export default GitHubCallback;

import React from "react";
import axios from "axios";

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
    }
  );

  var urlParams;
  const decodeParams = () => {
    var match,
      pl = /\+/g, // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) {
        return decodeURIComponent(s.replace(pl, " "));
      },
      query = response.data;

    urlParams = {};
    while ((match = search.exec(query)))
      urlParams[decode(match[1])] = decode(match[2]);
  };

  decodeParams();
  console.log(urlParams["access_token"]);
  //post access token
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

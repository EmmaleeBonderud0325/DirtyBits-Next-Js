import React from "react";
import GitHubLogin from "react-github-login";
import { AiFillGithub } from "react-icons/ai";
import { useSelector } from "react-redux";
import { githubLogin } from "../../../redux/actions/authenticate";

function GitHubLoginButton({ dispatch, loader }) {
  const isLoading = useSelector((state) => state.githubLoginSpinner);
  return (
    <GitHubLogin
      clientId={process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}
      onSuccess={(response) => {
        dispatch(githubLogin(response.code));
      }}
      onFailure={(response) => {
        console.error(response);
      }}
      redirectUri=""
      scope="read:user,user:email"
      buttonText=""
      className="social-login-btn"
    >
      {isLoading ? (
        <span>{loader}</span>
      ) : (
        <>
          <AiFillGithub />
          <span className="text-sm font-light">Sign In</span>
        </>
      )}
    </GitHubLogin>
  );
}

export default GitHubLoginButton;

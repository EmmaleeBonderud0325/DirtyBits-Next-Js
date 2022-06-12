import React from "react";
import GitHubLogin from "react-github-login";
import { AiFillGithub } from "react-icons/ai";
import { AnyIfEmpty, useSelector } from "react-redux";
// import { githubLogin } from "../../../redux/actions/authenticate";
import { githubLogin, setSigninError } from "features/UserData";

function GitHubLoginButton({
  dispatch,
  loader,
  githubLoginSpinnerState,
  setGithubLoginSpinnerState,
}) {
  const isLoading = githubLoginSpinnerState;
  return (
    <GitHubLogin
      clientId={process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}
      onSuccess={(response: any) => {
        // dispatch(githubLogin(response.code));
        dispatch(
          githubLogin({
            auth_token: response.code,
          })
        );
      }}
      onFailure={(response: any) => {
        console.error(response);
        dispatch(
          setSigninError({
            errorString: "Error Occured in Github Login!!",
          })
        );
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

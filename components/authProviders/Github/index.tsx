import React from "react";
import GitHubLogin from "react-github-login";
import { AiFillGithub } from "react-icons/ai";
import { githubLogin, setSigninError } from "features/UserData";
import { selectSprinnerData, setGithubSpinner } from "features/Spinners";
import { useAppSelector as useAppSelectorD } from "app/hooks";

function GitHubLoginButton({ dispatch, loader }) {
  const isLoading = useAppSelectorD(selectSprinnerData).githubSpinner;
  return (
    <GitHubLogin
      clientId={process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}
      onSuccess={(response: any) => {
        dispatch(setGithubSpinner(true));
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
import { useAppSelector } from "app/hooks";

export default GitHubLoginButton;

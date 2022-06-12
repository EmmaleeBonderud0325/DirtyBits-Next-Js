import React from "react";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";
// import { googleLogin } from "../../../redux/actions/authenticate";
import { googleLogin, setSigninError } from "features/UserData";

function GoogleSignInButton({
  dispatch,
  loader,
  googleLoginSpinnerState,
  setGoogleLoginSpinnerState,
}) {
  const isLoading = googleLoginSpinnerState;
  return (
    <GoogleLogin
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="social-login-btn"
        >
          {isLoading ? (
            <>
              <span>{loader}</span>
            </>
          ) : (
            <>
              <FcGoogle />
              <span className="text-sm font-light">Sign In</span>
            </>
          )}
        </button>
      )}
      onSuccess={(data) => {
        // dispatch(googleLogin(data["tokenId"]));
        dispatch(
          googleLogin({
            auth_token: data["tokenId"],
          })
        );
      }}
      onFailure={() => {
        dispatch(
          setSigninError({ errorString: "Google Authentication failed !" })
        );
        // console.error("Google Authentication failed !");
      }}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default GoogleSignInButton;

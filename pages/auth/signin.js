import React, { useState } from "react";
import Link from "next/link";
import GoogleLogin from "react-google-login";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { validate } from "email-validator";
import { FcGoogle } from "react-icons/fc";
import Cookies from "js-cookie";
import { connect, useDispatch } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/router";
import GitHubLogin from "react-github-login";
import { AiFillGithub } from "react-icons/ai";

import { Loading } from "@nextui-org/react";

import { updateSignInSpinner, updateUserinfo } from "../../redux/actions";
import Input from "../../components/Input";
import { signinApi } from "../../components/api/apis";
import Parsetoken from "../../components/Helper/Parsetoken";
import SmoothList from "react-smooth-list";
import { githubLogin, googleLogin } from "../../redux/actions/authenticate";

function Signin(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const antIcon = <Loading type="points-opacity" size="sm" />;
  let [formData, setFormData] = useState({
    email: "",
    password: "",
    remeberMe: false,
  });

  let [showPassword, setShowPassword] = useState(false);

  let [isError, setIsError] = useState({
    email: { error: false, details: "" },
    password: { error: false, details: "" },
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const emailInputColor = isError.email.error
    ? "border-red-500"
    : "border-custom-indigo";
  const emailInputFocusColor = isError.email.error
    ? "border-white"
    : "border-custom-indigo";
  const emailLabelColor = isError.email.error
    ? "text-red-500"
    : "text-gray-700";

  const passwordInputColor = isError.password.error
    ? "border-red-500"
    : "border-custom-indigo";
  const passwordInputFocusColor = isError.password.error
    ? "border-red-500"
    : "border-custom-indigo";
  const passwordLabelColor = isError.password.error
    ? "text-red-500"
    : "text-gray-700";

  const validateFormData = () => {
    if (validate(formData.email)) {
      if (formData.password.length === 0) {
        setIsError({
          ...isError,
          email: { error: false, details: "" },
          password: { error: true, details: "Password can't be empty !" },
        });
        return false;
      } else {
        setIsError({
          email: { error: false, details: "" },
          password: { error: false, details: "" },
        });
        return true;
      }
    } else {
      if (formData.password.length === 0) {
        setIsError({
          ...isError,
          email: { error: true, details: "Invalid Email !" },
          password: { error: true, details: "Password can't be empty !" },
        });
        return false;
      } else {
        setIsError({
          ...isError,
          email: { error: true, details: "Invalid Email !" },
        });
        return false;
      }
    }
  };

  const postAuthentication = (tokens) => {
    const { access, refresh } = tokens;
    const data = Parsetoken(access);
    console.log("data", data);
    if (data.is_verified) {
      if (formData.remeberMe) {
        var inTwentyMinutes = new Date(new Date().getTime() + 20 * 60 * 1000);
        Cookies.set("access", access, { expires: inTwentyMinutes });
        Cookies.set("refresh", refresh, { expires: 14 });
      } else {
        Cookies.set("access", access);
        Cookies.set("refresh", refresh);
      }
      dispatch(
        updateUserinfo({
          is_logged_in: true,
          is_admin: data.is_admin,
          email: data.user_mail,
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
          profile_pic: data.profile_pic,
        })
      );
      router.push("/");
    } else {
      setIsError({
        ...isError,
        email: { error: true, details: "" },
        password: { error: true, details: "Account not verified !" },
      });
    }
  };

  const submitLoginForm = async (e) => {
    dispatch(updateSignInSpinner(true));
    e.preventDefault();
    setIsDisabled(true);
    setIsError({
      email: { error: false, details: "" },
      password: { error: false, details: "" },
    });
    const isValid = validateFormData();
    if (isValid) {
      try {
        await signinApi
          .post("/", formData)
          .then((result) => {
            postAuthentication(result.data);
          })
          .catch(() => {
            setIsError({
              ...isError,
              email: { error: true, details: "" },
              password: { error: true, details: "Invalid Credentials !" },
            });
            console.error("Invalid Credentials !");
          });
      } catch (e) {
        console.error("Server Error !");
      }
    }
    setIsDisabled(false);
    dispatch(updateSignInSpinner(false));
    return;
  };

  return (
    <>
      <Head>
        <title>Sign In to DirtyBits</title>
      </Head>
      <div className=" loginSignUp">
        <div className="absolute w-60 h-60 rounded-xl bg-custom-indigo -top-5 -left-16 z-0 transform rotate-45 hidden md:hidden lg:block"></div>
        <div className="absolute w-48 h-48 rounded-xl bg-custom-indigo -bottom-10 transform rotate-12 hidden md:hidden lg:block"></div>
        <div className="w-40 h-40 absolute bg-custom-indigo rounded-full top-0 right-12 hidden md:hidden lg:block"></div>
        <div className="w-20 h-40 absolute bg-custom-indigo rounded-full bottom-20 right-10 transform rotate-45 hidden md:hidden lg:block"></div>

        <div className="absolute md:bg-gradient-to-b from-black to-black opacity-75 lg:inset-0 z-0"></div>

        <div className="lg:min-h-screen lg:flex lg:justify-center lg:space-x-48 p-8 space-y-5 lg:z-10">
          {/* HEADING FOR SMALL SIZE SCREENS */}
          <div className="text-white text-xl text-center lg:hidden">
            Welcome to{" "}
            <span className="text-custom-indigo text-2xl font-semibold">
              <a href="/">DirtyBits</a>
            </span>
          </div>
          {/* HEADING FOR LARGER SIZE SCREENS */}
          <div className="flex-col lg:flex hidden  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <SmoothList>
                <h1 className="loginSignUpHeading text-transparent bg-clip-text bg-gradient-to-r from-[#AE67FA] to-[#F49867]">
                  Hola,
                </h1>
                <br />
                <div className=" flex space-x-6">
                  <h2 className="text-white text-6xl">
                    Welcome to{" "}
                    <span className="text-custom-indigo font-extrabold">
                      <a href="/">DirtyBits</a>
                    </span>
                  </h2>
                </div>
              </SmoothList>
            </div>
          </div>
          <div className="flex lg:justify-center md:justify-start lg:self-center z-10">
            <div className="p-10 lg:p-16 bg-white mx-auto rounded-2xl w-full lg:w-100 ">
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Sign In{" "}
                </h3>
                <p className="text-gray-500">Please sign in to your account.</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-1">
                  {/* Change text-red-700 to text-gray-700 if there's no error */}
                  <label
                    className={`text-sm font-medium ${emailLabelColor} tracking-wide`}
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder={"@gmail.com"}
                    value={formData.email}
                    color={emailInputColor}
                    focusColor={emailInputFocusColor}
                    id={"none"}
                    onchangeFunction={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <div style={{ height: "1rem" }}>
                    {isError.email.error ? (
                      <span className="text-xs text-red-500 ml-2 mb:2">
                        {isError.email.details}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <label
                    className={`mb-5 text-sm font-medium ${passwordLabelColor} tracking-wide`}
                  >
                    Password
                  </label>
                  <div className={`w-full rounded-lg flex`}>
                    <input
                      className={`w-full px-4 py-2 border-2 text-black ${passwordInputColor} focus:${passwordInputFocusColor} focus:outline-none rounded-lg`}
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      placeholder="Password"
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    {showPassword ? (
                      <EyeIcon
                        onClick={() => setShowPassword(false)}
                        className="cursor-pointer h-5 w-5 -ml-10 mt-2 text-black"
                      />
                    ) : (
                      <EyeOffIcon
                        onClick={() => setShowPassword(true)}
                        className="cursor-pointer h-5 w-5 -ml-10 mt-2 text-black"
                      />
                    )}
                  </div>

                  <div style={{ height: "1rem" }}>
                    {isError.password.error ? (
                      <span className="text-xs text-red-500 ml-2">
                        {isError.password.details}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between my-2">
                  <div className="flex items-center accent-custom-indigo">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      checked={formData.remeberMe}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          remeberMe: !formData.remeberMe,
                        })
                      }
                      className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link href="/auth/resetpassword">
                      <a className="text-indigo-400 text-xs hover:text-black">
                        Forgot your password?
                      </a>
                    </Link>
                  </div>
                </div>
                <div>
                  <button
                    disabled={isDisabled ? true : false}
                    type="submit"
                    onClick={(e) => submitLoginForm(e)}
                    className={`social-login-btn  bg-custom-indigo hover:bg-indigo-900 hover:outline-black
                      transition ease-in duration-500
                      ${isDisabled && "opacity-50 cursor-not-allowed"}
                    `}
                    autofocus
                  >
                    {props.signInSpinner ? (
                      <>
                        <span>{antIcon}</span>
                      </>
                    ) : (
                      <span className="text-sm font-light">Sign In</span>
                    )}{" "}
                  </button>

                  <GoogleLogin
                    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="social-login-btn"
                      >
                        {props.googleSpinner ? (
                          <>
                            <span>{antIcon}</span>
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
                      dispatch(googleLogin(data["tokenId"]));
                    }}
                    onFailure={() => {
                      console.error("Google Authentication failed !");
                    }}
                    cookiePolicy={"single_host_origin"}
                  />
                  <GitHubLogin
                    clientId={process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}
                    onSuccess={(response) => {
                      dispatch(githubLogin(response.code));
                    }}
                    onFailure={(response) => {
                      console.error(response);
                    }}
                    children={
                      <>
                        {props.githubSpinner ? (
                          <>
                            <span>{antIcon}</span>
                          </>
                        ) : (
                          <>
                            <AiFillGithub />
                            <span className="text-sm font-light">Sign In</span>
                          </>
                        )}
                      </>
                    }
                    redirectUri=""
                    scope="read:user,user:email"
                    buttonText=""
                    className="social-login-btn"
                  />
                </div>
              </div>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Don't have account ?{" "}
                  <Link href="/auth/signup">
                    <a className="text-custom-indigo hover:text-black">
                      Sign Up
                    </a>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Signin.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    googleSpinner: state.googleLoginSpinner,
    githubSpinner: state.githubLoginSpinner,
    signInSpinner: state.loginInSpinner,
  };
};

export default connect(mapStateToProps, { updateUserinfo })(Signin);

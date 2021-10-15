import React, { useState } from "react";
import Link from "next/link";
import GoogleLogin from "react-google-login";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { validate } from "email-validator";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Cookies from "js-cookie";
import { connect, useDispatch } from "react-redux";
import { updateUserinfo } from "../../redux/Actions";

import Input from "../../components/input";
import { signinApi } from "../../components/api/apis";
import Parsetoken from "../../components/Helper/Parsetoken";

function signin() {
  const dispatch = useDispatch();
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
    ? "border-red-300"
    : "border-white-400";
  const emailInputFocusColor = isError.email.error
    ? "border-red-300"
    : "border-custom-yellow";
  const emailLabelColor = isError.email.error
    ? "text-red-700"
    : "text-gray-700";

  const passwordInputColor = isError.password.error
    ? "border-red-300"
    : "border-white-400";
  const passwordInputFocusColor = isError.password.error
    ? "border-red-300"
    : "border-custom-yellow";
  const passwordLabelColor = isError.password.error
    ? "text-red-700"
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

  const responseGoogleSuccess = (data) => {
    console.log("success", data);
  };

  const responseGoogleFailure = () => {
    console.log("failed");
  };

  const postAuthentication = (tokens) => {
    const { access, refresh } = tokens;
    const data = Parsetoken(access);
    if (data.is_verified) {
      Cookies.set("access", access);
      Cookies.set("refresh", refresh, { expires: 14 });
      dispatch(
        updateUserinfo({
          is_logged_in: true,
          email: data.user_mail,
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
        })
      );
    } else {
      setIsError({
        ...isError,
        email: { error: true, details: "" },
        password: { error: true, details: "Account not verified !" },
      });
    }
  };

  const submitLoginForm = async (e) => {
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
          .catch((result) => {
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
    return;
  };

  return (
    <>
      <div
        className="bg-no-repeat bg-cover bg-center relative"
        style={{ background: "url('')" }}
      >
        <div className="absolute bg-gradient-to-b from-black to-black opacity-75 inset-0 z-0"></div>
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <img src="" className="mb-3" />
              <h1 className="mb-3 font-bold text-5xl">
                Hello Welcome to{" "}
                <span className="text-custom-yellow">
                  <Link href="/">
                    <a>DirtyBits</a>
                  </Link>
                </span>
              </h1>
              <p className="pr-3">
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups
              </p>
            </div>
          </div>
          <div className="flex justify-center self-center  z-10">
            <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
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
                    type="text"
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
                      <span className="text-xs text-red-400 ml-2 mb:2">
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
                      className={`w-full px-4 py-2 border text-black ${passwordInputColor} focus:${passwordInputFocusColor} focus:outline-none rounded-lg`}
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
                      <span className="text-xs text-red-400 ml-2">
                        {isError.password.details}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between my-2">
                  <div className="flex items-center">
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
                      for="remember_me"
                      className="ml-2 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="text-indigo-400 text-xs hover:text-black"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    disabled={isDisabled ? true : false}
                    type="submit"
                    onClick={(e) => submitLoginForm(e)}
                    className={`w-full flex justify-center bg-custom-yellow2 hover:bg-custom-yellow text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500
                      ${isDisabled && "opacity-50 cursor-not-allowed"}
                    `}
                  >
                    Sign In
                  </button>

                  <GoogleLogin
                    clientId="64402702960-mlmnvge26bhhdf6ghgrt6viqbqhv0610.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="mt-3 w-full flex justify-center rounded-full bg-black px-4 p-3 font-semibold text-white inline-flex items-center space-x-2 rounded"
                      >
                        <FcGoogle />
                        <span>Sign In </span>
                      </button>
                    )}
                    onSuccess={responseGoogleSuccess}
                    onFailure={responseGoogleFailure}
                    cookiePolicy={"single_host_origin"}
                  />
                  <button className="mt-3 w-full flex justify-center rounded-full bg-black px-4 p-3 font-semibold text-white inline-flex items-center space-x-2 rounded">
                    <AiFillGithub />
                    <span>Sign In </span>
                  </button>
                </div>
              </div>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Don't have account ?{" "}
                  <Link href="/auth/signup">
                    <a className="text-custom-yellow hover:text-black">
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

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps, { updateUserinfo })(signin);

signin.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

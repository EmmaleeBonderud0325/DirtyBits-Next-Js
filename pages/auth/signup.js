import React, { useState, useCallback } from "react";
import Link from "next/link";
import { validate } from "email-validator";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";

var debounce = require("lodash.debounce");

import Input from "../../components/Input";
import {
  validateUserName,
  validateEmail,
  createUser,
} from "../../components/api/apis";

import {
  updateFirstNameError,
  updateLastNameError,
  updateUsernameError,
  updateEmailError,
  updatePasswordError,
  updateConfirmPasswordError,
} from "../../redux/actions";

function signup(props) {
  const dispatch = useDispatch();
  const notifyError = () =>
    toast.error("Try Again", {
      position: toast.POSITION.TOP_RIGHT,
    });

  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(false);

  const emailInputColor = props.isErrors.email.error
    ? "border-red-300"
    : "border-custom-indigo";
  const emailInputFocusColor = props.isErrors.email.error
    ? "border-red-300"
    : "border-custom-indigo";
  const emailLabelColor = props.isErrors.email.error
    ? "text-red-700"
    : "text-gray-700";

  const firstnameInputColor = props.isErrors.firstname.error
    ? "border-red-300"
    : "border-custom-indigo";
  const firstnameInputFocusColor = props.isErrors.firstname.error
    ? "border-red-300"
    : "border-custom-indigo";
  const firstnameLabelColor = props.isErrors.firstname.error
    ? "text-red-700"
    : "text-gray-700";

  const lastnameInputColor = props.isErrors.lastname.error
    ? "border-red-300"
    : "border-custom-indigo";
  const lastnameInputFocusColor = props.isErrors.lastname.error
    ? "border-red-300"
    : "border-custom-indigo";
  const lastnameLabelColor = props.isErrors.lastname.error
    ? "text-red-700"
    : "text-gray-700";

  const usernameInputColor = props.isErrors.username.error
    ? "border-red-300"
    : "border-custom-indigo";
  const usernameInputFocusColor = props.isErrors.username.error
    ? "border-red-300"
    : "border-custom-indigo";
  const usernameLabelColor = props.isErrors.username.error
    ? "text-red-700"
    : "text-gray-700";

  const passwordInputColor = props.isErrors.password.error
    ? "border-red-300"
    : "border-custom-indigo";
  const passwordInputFocusColor = props.isErrors.password.error
    ? "border-red-300"
    : "border-custom-indigo";
  const passwordLabelColor = props.isErrors.password.error
    ? "text-red-700"
    : "text-gray-700";

  const confirmPasswordInputColor = props.isErrors.confirmPassword.error
    ? "border-red-300"
    : "border-custom-indigo";
  const confirmPasswordInputFocusColor = props.isErrors.confirmPassword.error
    ? "border-red-300"
    : "border-custom-indigo";
  const confirmPasswordLabelColor = props.isErrors.confirmPassword.error
    ? "text-red-700"
    : "text-gray-700";

  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    remeberMe: false,
  });

  const handleUsernameChange = async () => {
    const username = document.getElementById("username-field-signup").value;
    if (username.length < 5) {
      dispatch(
        updateUsernameError({
          error: true,
          details: "Username should have atleast 5 characters !",
        })
      );
    } else {
      try {
        const res = await validateUserName.post("/", { username: username });
        if (res.status !== 200) {
          console.error("Bad Request !");
          return true;
        }
        const data = res.data;
        if (data.success) {
          dispatch(
            updateUsernameError({
              error: false,
              details: "",
            })
          );
          return true;
        } else {
          dispatch(
            updateUsernameError({
              error: true,
              details: "Username Exsists !",
            })
          );
          return false;
        }
      } catch (e) {
        console.error("Auth Server Error!");
        return true;
      }
    }
  };

  const HandleUserNameUpdateDebounce = useCallback(
    debounce(handleUsernameChange, 1000),
    []
  );

  const handleEmailChange = async () => {
    const email = document.getElementById("email-field-signup").value;
    if (!validate(email)) {
      dispatch(updateEmailError({ error: true, details: "Invalid Email !" }));
    } else {
      try {
        const res = await validateEmail.post("/", { email: email });
        if (res.status !== 200) {
          console.error("Bad Request !");
          return true;
        }
        const data = res.data;
        if (data.success) {
          dispatch(updateEmailError({ error: false, details: "" }));
          return true;
        } else {
          dispatch(
            updateEmailError({ error: true, details: "Email Exists !" })
          );

          return false;
        }
      } catch (e) {
        console.error("Auth Server Error!");
        return true;
      }
    }
  };

  const HandleEmailUpdateDebounce = useCallback(
    debounce(handleEmailChange, 1000),
    []
  );

  const handlePasswordChange = () => {
    const password = document.getElementById("password-field-signup").value;
    if (password.length < 8) {
      dispatch(
        updatePasswordError({
          error: true,
          details: "Password must have atleast 8 characters !",
        })
      );
      return false;
    } else {
      dispatch(
        updatePasswordError({
          error: false,
          details: "",
        })
      );
      return true;
    }
  };

  const HandlePasswordUpdateDebounce = useCallback(
    debounce(handlePasswordChange, 1000),
    []
  );

  const handleConfirmPasswordChange = () => {
    const password = document.getElementById("password-field-signup").value;
    const confirmPassword = document.getElementById(
      "confirmpassword-field-signup"
    ).value;
    if (confirmPassword.length < 8) {
      dispatch(
        updateConfirmPasswordError({
          error: true,
          details: "Password must have atleast 8 characters !",
        })
      );
      return false;
    } else {
      if (confirmPassword !== password) {
        dispatch(
          updateConfirmPasswordError({
            error: true,
            details: "Passwords do not Match !",
          })
        );
        return false;
      } else {
        dispatch(
          updateConfirmPasswordError({
            error: false,
            details: "",
          })
        );
        return true;
      }
    }
  };

  const HandleConfirmPasswordUpdateDebounce = useCallback(
    debounce(handleConfirmPasswordChange, 1000),
    []
  );

  const submitSignupForm = async (e) => {
    e.preventDefault();
    if (formData.firstName.length === 0) {
      dispatch(
        updateFirstNameError({ error: true, details: "First Name is required" })
      );
      return;
    } else {
      dispatch(updateFirstNameError({ error: false, details: "" }));
    }
    if (formData.lastName.length === 0) {
      dispatch(
        updateLastNameError({ error: true, details: "Last Name is required" })
      );
      return;
    } else {
      dispatch(updateFirstNameError({ error: false, details: "" }));
    }
    let flag = false;
    for (const obj in props.isErrors) {
      flag = flag || props.isErrors[obj].error;
    }
    if (flag) {
      return;
    }
    const username = document.getElementById("username-field-signup").value;
    const email = document.getElementById("email-field-signup").value;
    const password = document.getElementById("password-field-signup").value;
    const confirmPassword = document.getElementById(
      "confirmpassword-field-signup"
    ).value;
    const sendData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: username,
      email: email,
      password: password,
    };
    try {
      toast
        .promise(createUser.post("/", sendData), {
          pending: "Signing you up...",
          success: "Redirecting soon...",
          error: "Try Again",
        })
        .then((result) => {
          if (result.status === 201) {
            setTimeout(() => router.push("/auth/registered"), 2000);
          }
        });
    } catch (e) {
      notifyError();
      console.error("Server Error !");
    }
  };

  return (
    <div>
      <Head>
        <title>Sign Up to DirtyBits</title>
      </Head>
      <ToastContainer theme="dark" />
      <div class="loginSignUp">
        <div class="absolute w-60 h-60 rounded-xl bg-custom-indigo -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
        <div class="absolute w-48 h-48 rounded-xl bg-custom-indigo -bottom-10 transform rotate-12 hidden md:block"></div>
        <div class="w-40 h-40 absolute bg-custom-indigo rounded-full top-0 right-12 hidden md:block"></div>
        <div class="w-20 h-40 absolute bg-custom-indigo rounded-full bottom-20 right-10 transform rotate-45 hidden md:block"></div>
        <div class="absolute md:bg-gradient-to-b from-black to-black opacity-75 lg:inset-0 z-0"></div>
        <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div class="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div class="self-start hidden lg:flex flex-col  text-white">
              <img src="" class="mb-3" />
              <h1 class="loginSignUpHeading">
                Hello Welcome to{" "}
                <span className="text-custom-indigo">
                  <a href="/">DirtyBits</a>
                </span>
              </h1>
              {/* <p className="pr-3">
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups
              </p> */}
            </div>
          </div>
          <div class="flexContainer self-center  z-10">
            <div class="p-5 md:p-9 bg-white mx-auto rounded-2xl w-100 -mt-14 mb-4 lg:m-0 md:m-0">
              <div class="mb-4">
                <h3 class="font-semibold text-2xl text-gray-800">Sign Up </h3>
                <p class="text-gray-500">Please sign in to your account.</p>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${usernameLabelColor} tracking-wide`}
                  >
                    Username
                  </label>
                  <Input
                    id={"username-field-signup"}
                    type={"text"}
                    placeholder="Your username"
                    color={usernameInputColor}
                    focusColor={usernameInputFocusColor}
                    onchangeFunction={HandleUserNameUpdateDebounce}
                  />
                  <div style={{ height: ".3rem" }}>
                    {props.isErrors.username.error ? (
                      <span className="text-xs text-red-500 ml-2 mb:2">
                        {props.isErrors.username.details}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${firstnameLabelColor} tracking-wide`}
                  >
                    Firstname
                  </label>
                  <Input
                    value={formData.firstName}
                    type={"text"}
                    placeholder="Your firstname"
                    color={firstnameInputColor}
                    focusColor={firstnameInputFocusColor}
                    id={"none"}
                    onchangeFunction={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                  <div style={{ height: ".3rem" }}>
                    {props.isErrors.firstname.error ? (
                      <span className="text-xs text-red-500 ml-2 mb:2">
                        {props.isErrors.firstname.details}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${lastnameLabelColor} tracking-wide`}
                  >
                    Lastname
                  </label>
                  <Input
                    value={formData.lastName}
                    type={"text"}
                    placeholder="Your lastname"
                    color={lastnameInputColor}
                    focusColor={lastnameInputFocusColor}
                    id={"none"}
                    onchangeFunction={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                  <div style={{ height: ".3rem" }}>
                    {props.isErrors.lastname.error ? (
                      <span className="text-xs text-red-500 ml-2 mb:2">
                        {props.isErrors.lastname.details}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${emailLabelColor} tracking-wide`}
                  >
                    Email
                  </label>
                  <Input
                    placeholder={"@gmail.com"}
                    type={"email"}
                    color={emailInputColor}
                    focusColor={emailInputFocusColor}
                    id={"email-field-signup"}
                    onchangeFunction={HandleEmailUpdateDebounce}
                  />
                  <div style={{ height: ".3rem" }}>
                    {props.isErrors.email.error ? (
                      <span className="text-xs text-red-500 ml-2 mb:2">
                        {props.isErrors.email.details}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                <div class="space-y-2">
                  <label
                    class={`text-sm font-medium ${passwordLabelColor} tracking-wide`}
                  >
                    Password
                  </label>
                  <Input
                    placeholder="Password"
                    type={"password"}
                    color={passwordInputColor}
                    focusColor={passwordInputFocusColor}
                    id={"password-field-signup"}
                    onchangeFunction={HandlePasswordUpdateDebounce}
                  />
                  <div style={{ height: ".3rem" }}>
                    {props.isErrors.password.error ? (
                      <span className="text-xs text-red-500 ml-2 mb:2">
                        {props.isErrors.password.details}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${confirmPasswordLabelColor} tracking-wide`}
                  >
                    Confirm Password
                  </label>
                  <Input
                    type={"password"}
                    placeholder="Confirm Password"
                    color={confirmPasswordInputColor}
                    focusColor={confirmPasswordInputFocusColor}
                    id={"confirmpassword-field-signup"}
                    onchangeFunction={HandleConfirmPasswordUpdateDebounce}
                  />
                  <div style={{ height: ".3rem" }}>
                    {props.isErrors.confirmPassword.error ? (
                      <span className="text-xs text-red-500 ml-2 mb:2">
                        {props.isErrors.confirmPassword.details}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      onChange={() =>
                        setFormData({
                          ...formData,
                          remeberMe: !formData.remeberMe,
                        })
                      }
                      type="checkbox"
                      className="h-4 w-4 rounded accent-custom-indigo"
                    />
                    <label
                      for="remember_me"
                      className="ml-2 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-custom-indigo">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className={`w-full flex justify-center bg-custom-indigo  hover:bg-indigo-900 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500 ${
                      isDisabled && "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={(e) => submitSignupForm(e)}
                  >
                    Register
                  </button>
                </div>
              </div>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Already have an account ?{" "}
                  <Link href="/auth/signin">
                    <a className="text-custom-indigo">Sign In</a>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

signup.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

const mapStateToProps = (state) => {
  return {
    isErrors: state.signupErrors,
  };
};

export default connect(mapStateToProps, {
  updateEmailError,
  updateFirstNameError,
  updateLastNameError,
  updateUsernameError,
  updatePasswordError,
  updateConfirmPasswordError,
})(signup);

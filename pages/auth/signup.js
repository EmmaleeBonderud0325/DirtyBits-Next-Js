import React, { useState, useCallback } from "react";
import Link from "next/link";
import { validate } from "email-validator";
import Head from 'next/head'
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import 'react-toastify/dist/ReactToastify.min.css';


import Input from "../../components/Input";
import {
  validateUserName,
  validateEmail,
  createUser,
} from "../../components/api/apis";
import Debounce from "../../components/Helper/Debounce";

function signup() {
  const isError = false;
  const inputColor = isError ? "border-red-300" : "border-white-400";
  const inputFocusColor = isError ? "border-red-300" : "border-custom-yellow";
  const labelColor = isError ? "text-red-700" : "text-gray-700";

  const notifyError = () =>
    toast.error("Try Again", {
      position: toast.POSITION.TOP_RIGHT,
    });

  const router = useRouter();

  const router = useRouter()
  
  let [isErrors, setIsErrors] = useState({
    username: { error: false, details: "" },
    firstname: { error: false, details: "" },
    lastname: { error: false, details: "" },
    email: { error: false, details: "" },
    password: { error: false, details: "" },
    confirmPassword: { error: false, details: "" },
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const emailInputColor = isErrors.email.error
    ? "border-red-300"
    : "border-white-400";
  const emailInputFocusColor = isErrors.email.error
    ? "border-red-300"
    : "border-custom-yellow";
  const emailLabelColor = isErrors.email.error
    ? "text-red-700"
    : "text-gray-700";

  const firstnameInputColor = isErrors.firstname.error
    ? "border-red-300"
    : "border-white-400";
  const firstnameInputFocusColor = isErrors.firstname.error
    ? "border-red-300"
    : "border-custom-yellow";
  const firstnameLabelColor = isErrors.firstname.error
    ? "text-red-700"
    : "text-gray-700";

  const lastnameInputColor = isErrors.lastname.error
    ? "border-red-300"
    : "border-white-400";
  const lastnameInputFocusColor = isErrors.lastname.error
    ? "border-red-300"
    : "border-custom-yellow";
  const lastnameLabelColor = isErrors.lastname.error
    ? "text-red-700"
    : "text-gray-700";

  const usernameInputColor = isErrors.username.error
    ? "border-red-300"
    : "border-white-400";
  const usernameInputFocusColor = isErrors.username.error
    ? "border-red-300"
    : "border-custom-yellow";
  const usernameLabelColor = isErrors.username.error
    ? "text-red-700"
    : "text-gray-700";

  const passwordInputColor = isErrors.password.error
    ? "border-red-300"
    : "border-white-400";
  const passwordInputFocusColor = isErrors.password.error
    ? "border-red-300"
    : "border-custom-yellow";
  const passwordLabelColor = isErrors.password.error
    ? "text-red-700"
    : "text-gray-700";

  const confirmPasswordInputColor = isErrors.confirmPassword.error
    ? "border-red-300"
    : "border-white-400";
  const confirmPasswordInputFocusColor = isErrors.confirmPassword.error
    ? "border-red-300"
    : "border-custom-yellow";
  const confirmPasswordLabelColor = isErrors.confirmPassword.error
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
      setIsErrors({
        ...isErrors,
        username: {
          error: true,
          details: "Username should have atleast 5 characters !",
        },
      });
    } else {
      try {
        const res = await validateUserName.post("/", { username: username });
        if (res.status !== 200) {
          console.error("Bad Request !");
          return true;
        }
        const data = res.data;
        if (data.success) {
          var stateData = { ...isErrors };
          stateData.username = { error: false, details: "" };
          setIsErrors(stateData);
          return true;
        } else {
          var stateData = { ...isErrors };
          stateData.username = {
            error: true,
            details: "Username Exsists !",
          };
          setIsErrors(stateData);
          return false;
        }
      } catch (e) {
        console.error("Auth Server Error!");
        return true;
      }
    }
  };

  const HandleUserNameUpdateDebounce = useCallback(
    Debounce(handleUsernameChange),
    []
  );

  const handleEmailChange = async () => {
    console.log(isErrors);
    const email = document.getElementById("email-field-signup").value;
    if (!validate(email)) {
      var stateData = { ...isErrors };
      stateData.email = { error: true, details: "Invalid Email !" };
      setIsErrors(stateData);
    } else {
      try {
        const res = await validateEmail.post("/", { email: email });
        if (res.status !== 200) {
          console.error("Bad Request !");
          return true;
        }
        const data = res.data;
        if (data.success) {
          var stateData = { ...isErrors };
          stateData.email = { error: false, details: "" };
          setIsErrors(stateData);
          return true;
        } else {
          var stateData = { ...isErrors };
          stateData.email = { error: true, details: "Email Exists !" };
          setIsErrors(stateData);
          return false;
        }
      } catch (e) {
        console.error("Auth Server Error!");
        return true;
      }
    }
  };

  const HandleEmailUpdateDebounce = useCallback(
    Debounce(handleEmailChange),
    []
  );

  const handlePasswordChange = () => {
    const password = document.getElementById("password-field-signup").value;
    if (password.length < 8) {
      setIsErrors({
        ...isErrors,
        password: {
          error: true,
          details: "Password must have atleast 8 characters !",
        },
      });
      return false;
    } else {
      setIsErrors({
        ...isErrors,
        password: {
          error: false,
          details: "",
        },
      });
      return true;
    }
  };

  const HandlePasswordUpdateDebounce = useCallback(
    Debounce(handlePasswordChange),
    []
  );

  const handleConfirmPasswordChange = () => {
    const password = document.getElementById("password-field-signup").value;
    const confirmPassword = document.getElementById(
      "confirmpassword-field-signup"
    ).value;
    console.log(password, confirmPassword);
    if (confirmPassword.length < 8) {
      setIsErrors({
        ...isErrors,
        confirmPassword: {
          error: true,
          details: "Password must have atleast 8 characters !",
        },
      });
      return false;
    } else {
      if (confirmPassword !== password) {
        setIsErrors({
          ...isErrors,
          confirmPassword: {
            error: true,
            details: "Passwords do not Match !",
          },
        });
        return false;
      } else {
        setIsErrors({
          ...isErrors,
          confirmPassword: {
            error: false,
            details: "",
          },
        });
        return true;
      }
    }
  };

  const HandleConfirmPasswordUpdateDebounce = useCallback(
    Debounce(handleConfirmPasswordChange),
    []
  );

  const submitSignupForm = async (e) => {
    e.preventDefault();
    setIsErrors({
      ...isErrors,
      username: { error: false, details: "" },
      firstname: { error: false, details: "" },
      lastname: { error: false, details: "" },
      email: { error: false, details: "" },
      password: { error: false, details: "" },
      confirmPassword: { error: false, details: "" },
    });
    const username = document.getElementById("username-field-signup").value;
    const email = document.getElementById("email-field-signup").value;
    const password = document.getElementById("password-field-signup").value;
    const confirmPassword = document.getElementById(
      "confirmpassword-field-signup"
    ).value;
    console.log(username, email, password, confirmPassword);
    const usernameValid = await handleUsernameChange();
    if (!usernameValid) {
      return;
    }
    if (formData.firstName.length === 0) {
      setIsErrors({
        ...isErrors,
        firstname: { error: true, details: "First Name is required" },
      });
      return;
    } else {
      setIsErrors({
        ...isErrors,
        firstname: { error: false, details: "" },
      });
    }
    if (formData.lastName.length === 0) {
      setIsErrors({
        ...isErrors,
        lastname: { error: true, details: "Last Name is required" },
      });
      return;
    } else {
      setIsErrors({
        ...isErrors,
        lastname: { error: false, details: "" },
      });
    }
    const emailValid = await handleEmailChange();
    if (!emailValid) {
      return;
    }
    if (!handleConfirmPasswordChange()) {
      return;
    }
    const sendData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: username,
      email: email,
      password: password,
    };
    try {
      // await createUser
      //   .post("/", sendData)
      //   .then((result) => {
      //     notifySuccess()
      //   })
      //   .catch(() => {
      //     notifyError()
      //     console.error("Registeration Failed !");
      //   });
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
      })
    }catch (e) {
      notifyError()
      console.error("Server Error !");
    }
  };

  return (
    <div>
        <Head>
          <title>Sign Up to DirtyBits</title>
        </Head>
      <ToastContainer theme="dark"/>
      <div class="bg-no-repeat bg-cover bg-center relative overflow-hidden">
        <div class="absolute w-60 h-60 rounded-xl bg-custom-yellow2 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
        <div class="absolute w-48 h-48 rounded-xl bg-custom-yellow2 -bottom-10 transform rotate-12 hidden md:block"></div>
        <div class="w-40 h-40 absolute bg-custom-yellow2 rounded-full top-0 right-12 hidden md:block"></div>
        <div class="w-20 h-40 absolute bg-custom-yellow2 rounded-full bottom-20 right-10 transform rotate-45 hidden md:block"></div>
        <div class="absolute md:bg-gradient-to-b from-black to-black opacity-75 lg:inset-0 z-0"></div>
        <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div class="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div class="self-start hidden lg:flex flex-col  text-white">
              <img src="" class="mb-3" />
              <h1 class="mb-3 font-bold text-5xl">
                Hello Welcome to{" "}
                <span className="text-custom-yellow">DirtyBits</span>
              </h1>
              <p className="pr-3">
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center self-center  z-10">
            <div class="p-5 lg:p-12 bg-white mx-auto rounded-2xl w-100 ">
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
                    color={usernameInputColor}
                    focusColor={usernameInputFocusColor}
                    onchangeFunction={HandleUserNameUpdateDebounce}
                  />
                  <div style={{ height: ".3rem" }}>
                    {isErrors.username.error ? (
                      <span className="text-xs text-red-400 ml-2 mb:2">
                        {isErrors.username.details}
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
                    color={firstnameInputColor}
                    focusColor={firstnameInputFocusColor}
                    id={"none"}
                    onchangeFunction={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                  <div style={{ height: ".3rem" }}>
                    {isErrors.firstname.error ? (
                      <span className="text-xs text-red-400 ml-2 mb:2">
                        {isErrors.firstname.details}
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
                    color={lastnameInputColor}
                    focusColor={lastnameInputFocusColor}
                    id={"none"}
                    onchangeFunction={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                  <div style={{ height: ".3rem" }}>
                    {isErrors.lastname.error ? (
                      <span className="text-xs text-red-400 ml-2 mb:2">
                        {isErrors.lastname.details}
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
                    {isErrors.email.error ? (
                      <span className="text-xs text-red-400 ml-2 mb:2">
                        {isErrors.email.details}
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
                    type={"password"}
                    color={passwordInputColor}
                    focusColor={passwordInputFocusColor}
                    id={"password-field-signup"}
                    onchangeFunction={HandlePasswordUpdateDebounce}
                  />
                  <div style={{ height: ".3rem" }}>
                    {isErrors.password.error ? (
                      <span className="text-xs text-red-400 ml-2 mb:2">
                        {isErrors.password.details}
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
                    color={confirmPasswordInputColor}
                    focusColor={confirmPasswordInputFocusColor}
                    id={"confirmpassword-field-signup"}
                    onchangeFunction={HandleConfirmPasswordUpdateDebounce}
                  />
                  <div style={{ height: ".3rem" }}>
                    {isErrors.confirmPassword.error ? (
                      <span className="text-xs text-red-400 ml-2 mb:2">
                        {isErrors.confirmPassword.details}
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
                    <a href="#" className="text-black hover:text-custom-yellow">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className={`w-full flex justify-center bg-custom-yellow2  hover:bg-custom-yellow text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500 ${
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
                    <a className="text-black hover:text-custom-yellow">
                      Sign In
                    </a>
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

export default signup;

signup.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

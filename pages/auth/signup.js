import React, { useState, useCallback } from "react";
import Link from "next/link";
import { validateUserName, validateEmail } from "../../components/api/apis";
import { validate } from "email-validator";

import Debounce from "../../components/Helper/Debounce";
import Input from "../../components/input";

function signup() {
  const isError = false;
  const inputColor = isError ? "border-red-300" : "border-white-400";
  const inputFocusColor = isError ? "border-red-300" : "border-custom-yellow";
  const labelColor = isError ? "text-red-700" : "text-gray-700";

  let [isErrors, setIsErrors] = useState({
    username: { error: false, details: "" },
    email: { error: false, details: "" },
    password: { error: false, details: "" },
  });

  const emailInputColor = isErrors.email.error
    ? "border-red-300"
    : "border-white-400";
  const emailInputFocusColor = isErrors.email.error
    ? "border-red-300"
    : "border-custom-yellow";
  const emailLabelColor = isErrors.email.error
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

  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    remeberMe: false,
  });

  // console.log(formData);

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
        await validateUserName
          .post("/", { username: username })
          .then((result) => {
            const data = result.data;
            if (data.success) {
              setIsErrors({
                ...isErrors,
                username: {
                  error: false,
                  details: "",
                },
              });
            } else {
              setIsErrors({
                ...isErrors,
                username: {
                  error: true,
                  details: "Username Exsists !",
                },
              });
            }
            console.log(result.data);
          });
      } catch (e) {
        console.error("Auth Server Error!");
      }
    }
  };

  const HandleUserNameUpdateDebounce = useCallback(
    Debounce(handleUsernameChange),
    []
  );

  const handleEmailChange = async () => {
    const email = document.getElementById("email-field-signup").value;
    if (!validate(email)) {
      setIsErrors({
        ...isErrors,
        email: {
          error: true,
          details: "Invalid email !",
        },
      });
    } else {
      try {
        await validateEmail.post("/", { email: email }).then((result) => {
          const data = result.data;
          if (data.success) {
            setIsErrors({
              ...isErrors,
              email: {
                error: false,
                details: "",
              },
            });
          } else {
            setIsErrors({
              ...isErrors,
              email: {
                error: true,
                details: "Email Exsists !",
              },
            });
          }
          console.log(result.data);
        });
      } catch (e) {
        console.error("Auth Server Error!");
      }
    }
  };

  const HandleEmailUpdateDebounce = useCallback(
    Debounce(handleEmailChange),
    []
  );

  return (
    <div>
      <div className="bg-no-repeat bg-cover bg-center relative">
        <div className="absolute bg-gradient-to-b from-black to-black opacity-75 inset-0 z-0"></div>
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <img src="" className="mb-3" />
              <h1 className="mb-3 font-bold text-5xl">
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
          <div className="flex justify-center self-center  z-10">
            <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Sign Up{" "}
                </h3>
                <p className="text-gray-500">Please sign in to your account.</p>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${usernameLabelColor} tracking-wide`}
                  >
                    Username
                  </label>
                  <Input
                    // value={formData.userName}
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
                    className={`text-sm font-medium ${labelColor} tracking-wide`}
                  >
                    Firstname
                  </label>
                  <Input
                    value={formData.firstName}
                    type={"text"}
                    color={inputColor}
                    focusColor={inputFocusColor}
                    id={"none"}
                    onchangeFunction={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${labelColor} tracking-wide`}
                  >
                    Lastname
                  </label>
                  <Input
                    value={formData.lastName}
                    type={"text"}
                    color={inputColor}
                    focusColor={inputFocusColor}
                    id={"none"}
                    onchangeFunction={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
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
                    value={formData.password}
                    type={"password"}
                    color={passwordInputColor}
                    focusColor={passwordInputFocusColor}
                    id={"none"}
                    onchangeFunction={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <div style={{ height: ".3rem" }}>
                    {isErrors.password.error ? (
                      <span className="text-xs text-red-400 ml-2 mb:2">
                        isErrors.password.details
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${passwordLabelColor} tracking-wide`}
                  >
                    Confirm Password
                  </label>
                  <Input
                    value={formData.confirmPassword}
                    type={"password"}
                    color={passwordInputColor}
                    focusColor={passwordInputFocusColor}
                    id={"none"}
                    onchangeFunction={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <div style={{ height: ".3rem" }}>
                    {isErrors.password.error ? (
                      <span className="text-xs text-red-400 ml-2 mb:2">
                        isErrors.password.details
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
                      onChange={(e) =>
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
                    className="w-full flex justify-center bg-custom-yellow2  hover:bg-custom-yellow text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
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

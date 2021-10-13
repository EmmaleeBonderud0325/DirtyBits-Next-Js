import React, { useState, useCallback } from "react";
import Link from "next/link";
import { validateUserName } from "../../components/api/apis";

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

  let [usernameInputFocusColor, setUsernameInputFocusColor] = useState(
    "border-custom-yellow"
  );

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

  console.log(formData);

  const handleUsernameChange = async () => {
    console.log("called");
    const username = document.getElementById("username-field").value;
    if (username.length < 5) {
      setUsernameInputFocusColor("border-green-300");
      setIsErrors({
        ...isErrors,
        username: {
          error: true,
          details: "Username should have atleast 5 characters !",
        },
      });
    } else {
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
            setUsernameInputFocusColor("border-green-400");
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
    }
  };

  const HandleUserNameUpdateDebounce = useCallback(
    Debounce(handleUsernameChange),
    []
  );

  return (
    <div>
      <div class="bg-no-repeat bg-cover bg-center relative">
        <div class="absolute bg-gradient-to-b from-black to-black opacity-75 inset-0 z-0"></div>
        <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div class="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div class="self-start hidden lg:flex flex-col  text-white">
              <img src="" class="mb-3" />
              <h1 class="mb-3 font-bold text-5xl">
                Hello Welcome to{" "}
                <span className="text-custom-yellow">DirtyBits</span>
              </h1>
              <p class="pr-3">
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups
              </p>
            </div>
          </div>
          <div class="flex justify-center self-center  z-10">
            <div class="p-12 bg-white mx-auto rounded-2xl w-100 ">
              <div class="mb-4">
                <h3 class="font-semibold text-2xl text-gray-800">Sign Up </h3>
                <p class="text-gray-500">Please sign in to your account.</p>
              </div>
              <div class="space-y-5">
                <div class="space-y-2">
                  <label
                    class={`text-sm font-medium ${usernameLabelColor} tracking-wide`}
                  >
                    Username
                  </label>
                  <Input
                    // value={formData.userName}
                    id={"username-field"}
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
                <div class="space-y-2">
                  <label
                    class={`text-sm font-medium ${labelColor} tracking-wide`}
                  >
                    Firstname
                  </label>
                  <Input
                    value={formData.firstName}
                    type={"text"}
                    color={inputColor}
                    focusColor={inputFocusColor}
                    onchangeFunction={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div class="space-y-2">
                  <label
                    class={`text-sm font-medium ${labelColor} tracking-wide`}
                  >
                    Lastname
                  </label>
                  <Input
                    value={formData.lastName}
                    type={"text"}
                    color={inputColor}
                    focusColor={inputFocusColor}
                    onchangeFunction={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
                <div class="space-y-2">
                  <label
                    class={`text-sm font-medium ${emailLabelColor} tracking-wide`}
                  >
                    Email
                  </label>
                  <Input
                    value={formData.email}
                    placeholder={"@gmail.com"}
                    type={"email"}
                    color={emailInputColor}
                    focusColor={emailInputFocusColor}
                    onchangeFunction={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <div style={{ height: ".3rem" }}>
                    {isErrors.email.error ? (
                      <span className="text-xs text-red-400 ml-2 mb:2">
                        isErrors.email.details
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
                <div class="space-y-2">
                  <label
                    class={`text-sm font-medium ${passwordLabelColor} tracking-wide`}
                  >
                    Confirm Password
                  </label>
                  <Input
                    value={formData.confirmPassword}
                    type={"password"}
                    color={passwordInputColor}
                    focusColor={passwordInputFocusColor}
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
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
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
                      class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label
                      for="remember_me"
                      class="ml-2 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                  <div class="text-sm">
                    <a href="#" class="text-black hover:text-custom-yellow">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    class="w-full flex justify-center bg-custom-yellow2  hover:bg-custom-yellow text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Register
                  </button>
                </div>
              </div>
              <div class="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Already have an account ?{" "}
                  <Link href="/auth/signin">
                    <a class="text-black hover:text-custom-yellow">Sign In</a>
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

import React, { useState } from "react";
import Link from "next/link";
import Input from "../../components/Input";

function signin() {
  const isError = false;
  const inputColor = isError ? "border-red-300" : "border-white-400";
  const inputFocusColor = isError ? "border-red-300" : "border-custom-yellow";
  const labelColor = isError ? "text-red-700" : "text-gray-700";

  let [formData, setFormData] = useState({ email: "", password: "" });
  console.log(formData);

  return (
    <div>
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
                <span classNameName="text-custom-yellow">
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
                <div className="space-y-2">
                  {/* Change text-red-700 to text-gray-700 if there's no error */}
                  <label
                    className={`text-sm font-medium ${labelColor} tracking-wide`}
                  >
                    Email
                  </label>
                  <Input
                    type="text"
                    placeholder={"@gmail.com"}
                    value={formData.email}
                    color={inputColor}
                    focusColor={inputFocusColor}
                    onchangeFunction={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <div style={{ height: "1rem" }}>
                    {isError ? (
                      <span classNameName="text-xs text-red-400 ml-2 mb:2">
                        Invalid Email
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className={`mb-5 text-sm font-medium ${labelColor} tracking-wide`}
                  >
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder={"Enter your password"}
                    value={formData.password}
                    color={inputColor}
                    focusColor={inputFocusColor}
                    onchangeFunction={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <div style={{ height: "1rem" }}>
                    {isError ? (
                      <span classNameName="text-xs text-red-400 ml-2">
                        Password can't be empty
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
                    <a href="#" className="text-indigo-400 hover:text-black">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-custom-yellow2 hover:bg-custom-yellow text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>
                  <Link href="/auth/signup">
                    <a
                      type="submit"
                      className="w-full flex justify-center bg-indigo-400  hover:bg-black text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500 mt-3"
                    >
                      Sign Up
                    </a>
                  </Link>
                </div>
              </div>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Copyright © 2021-2022
                  <a
                    href="https://codepen.io/uidesignhub"
                    rel=""
                    target="_blank"
                    title="Ajimon"
                    className="text-green hover:text-green-500 "
                  >
                    AJI
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default signin;

signin.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

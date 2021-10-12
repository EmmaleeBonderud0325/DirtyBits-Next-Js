import React, { useState } from "react";
import Link from "next/link";
import {EyeIcon, EyeOffIcon} from '@heroicons/react/solid'


import Input from "../../components/Input";
import { validate } from "email-validator";


function signin() {
  let [formData, setFormData] = useState({
    email: "",
    password: "",
    remeberMe: false,
  });

  let [isError, setIsError] = useState({
    email: { error: false, details: "" },
    password: { error: false, details: "" },
  });

  const [showPassword, setShowPassword] = useState(false)

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
      } else if (formData.password.length < 8) {
        setIsError({
          ...isError,
          email: { error: false, details: "" },
          password: {
            error: true,
            details: "Password must have atleast 8 characters !",
          },
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
      } else if (formData.password.length < 8) {
        setIsError({
          ...isError,
          email: { error: true, details: "Invalid Email !" },
          password: {
            error: true,
            details: "Password must have atleast 8 characters !",
          },
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

  const submitLoginForm = () => {
    const isValid = validateFormData();
    if (isValid) {
      console.log(formData);
    }
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
                <div className="space-y-2">
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
                <div className="space-y-2">
                  <label
                    className={`mb-5 text-sm font-medium ${passwordLabelColor} tracking-wide`}
                  >
                    Password
                  </label>
                  <div className={`w-full rounded-lg flex`}>
                    <input className={`w-full px-4 py-2 border ${passwordInputColor} focus:${passwordInputFocusColor} focus:outline-none rounded-lg`} 
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        placeholder="Password"
                        onChange = {(e) => setFormData({...formData, password: e.target.value})}
                    />
                    {
                      showPassword ? <EyeIcon onClick={() => setShowPassword(false)} className="cursor-pointer h-5 w-5 -ml-10 mt-2"/>  : <EyeOffIcon onClick={() => setShowPassword(true)} className="cursor-pointer h-5 w-5 -ml-10 mt-2"/>
                    }
                    
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
                    <a href="#" className="text-indigo-400 text-xs hover:text-black">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={submitLoginForm}
                    className="w-full flex justify-center bg-custom-yellow2 hover:bg-custom-yellow text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign In
                  </button>
        
                  <button class="mt-3 w-full flex justify-center rounded-full bg-black px-4 p-3 font-semibold text-white inline-flex items-center space-x-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      width="20" height="20"
                      viewBox="0 0 48 48"
                      style={{fill:'#000000'}}><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                    <span>Sign In </span>
                  </button>
                </div>
              </div>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Don't have account ? {" "}
                  <Link href="/auth/signup">
                    <a
                      className="text-custom-yellow hover:text-black"
                    >
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

export default signin;

signin.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import { validate } from "email-validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { connect, useDispatch } from "react-redux";
import SmoothList from "react-smooth-list";
import { TextInput, PasswordInput } from "@mantine/core";
import { FcCheckmark } from "react-icons/fc";

import { PasswordStrength } from "../PasswordMeter";
import { validateUserName, validateEmail, createUser } from "../api/apis";
import {
  updateFirstNameError,
  updateLastNameError,
  updateUsernameError,
  updateEmailError,
  updatePasswordError,
  updateConfirmPasswordError,
} from "../../redux/actions";
import Background from '../Background'

function Signup(props) {
  const dispatch = useDispatch();
  const notifyError = () =>
    toast.error("Try Again", {
      position: toast.POSITION.TOP_RIGHT,
    });

  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);

  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    remeberMe: false,
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  let [timeoutId, setTimeoutId] = useState(null);

  const handleUsernameChange = async (username) => {
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
        // @ts-ignore
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

  let usernameTimeOutId;
  const usernameHandler = (event) => {
    setFormData({
      ...formData,
      username: event.currentTarget.value,
    });
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const username = event.currentTarget.value;
    usernameTimeOutId = setTimeout(() => {
      handleUsernameChange(username);
    }, 1000);
    setTimeoutId(usernameTimeOutId);
  };

  const handleEmailChange = async (email) => {
    if (email.length > 0 && !validate(email)) {
      dispatch(updateEmailError({ error: true, details: "Invalid Email !" }));
    } else {
      try {
        const res = await validateEmail.post("/", { email: email });
        if (res.status !== 200) {
          console.error("Bad Request !");
          return true;
        }
        const data = res.data;
        // @ts-ignore
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

  let emailTimeOutId;
  const handleEmail = (event) => {
    setFormData({
      ...formData,
      email: event.currentTarget.value,
    });
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const email = event.currentTarget.value;
    emailTimeOutId = setTimeout(() => {
      handleEmailChange(email);
    }, 1000);
    setTimeoutId(emailTimeOutId);
  };

  const handlePasswordChange = (password) => {
    console.log("called");
    if (password.length > 0 && password.length < 8) {
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

  const handleConfirmPasswordChange = (password, confirmPassword) => {
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

  let confirmPassTimeOutId;
  const handleConfirmPassword = (event) => {
    setFormData({
      ...formData,
      confirmPassword: event.currentTarget.value,
    });
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const confirmPassword = event.currentTarget.value;
    confirmPassTimeOutId = setTimeout(() => {
      handleConfirmPasswordChange(formData.password, confirmPassword);
    }, 1000);
    setTimeoutId(confirmPassTimeOutId);
  };

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

    const sendData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
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
      notifyError()
      console.error("Server Error !");
    }
  };

  return (
    <div>
      <Head>
        <title>Sign Up to DirtyBits</title>
      </Head>
      <ToastContainer theme="dark" />
      <div className="loginSignUp">
        
        <Background/>
        <div className="lg:h-screen xl:h-screen lg:flex-row xl:flex-row md:flex md:flex-col md:h-screen md:justify-center md:items-center lg:justify-center lg:space-x-0 xl:space-x-38 p-8 space-y-5 lg:z-10 ">
          {/* HEADING FOR SMALL SIZE SCREENS */}
          <div className="text-white text-center lg:hidden">
            <h1 className="text-xl md:text-4xl xs:text-xl sm:text-xl">Welcome to{" "}
            <span className="text-custom-indigo text-2xl font-semibold">
              <Link href="/">
                <a className="md:text-4xl">DirtyBits</a>
              </Link>
            </span>
            </h1>
          </div>
          {/* HEADING FOR LARGER SIZE SCREENS */}
          <div className=" lg:flex hidden  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <SmoothList>
                <h1 className="loginSignUpHeading lg:text-7xl xl:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#AE67FA] to-[#F49867]">
                  Hola,
                </h1>
                <br />
                <div className=" flex space-x-6 ">
                  <h2 className="text-white text-6xl lg:text-5xl xl:text-6xl">
                    Welcome to{" "}
                    <span className="text-custom-indigo font-extrabold">
                      <Link href="/">
                        <a>DirtyBits</a>
                      </Link>
                    </span>
                  </h2>
                </div>
              </SmoothList>
            </div>
          </div>

          <div className="flexContainer self-center  z-10 ">
            <div className="p-5 md:p-9 lg:py-3 lg:w-96 xl:w-[500px] bg-white mx-auto rounded-2xl w-100 -mt-14 mb-4 lg:m-0 md:m-0">
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Sign Up{" "}
                </h3>
                <p className="text-gray-500">Please sign in to your account.</p>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <TextInput
                    label="Username"
                    placeholder="Your username here"
                    value={formData.username}
                    radius="md"
                    onChange={usernameHandler}
                    error={props.isErrors.username.details}
                    invalid={props.isErrors.username.error}
                    required
                    size="sm"
                  />
                </div>
                <div className="space-y-2">
                  <TextInput
                    label="Firstname"
                    placeholder="Your firstname here"
                    value={formData.firstName}
                    radius="md"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        firstName: event.currentTarget.value,
                      })
                    }
                    error={props.isErrors.firstname.details}
                    invalid={props.isErrors.firstname.error}
                    required
                    size="sm"
                  />
                </div>
                <div className="space-y-2">
                  <TextInput
                    label="Lastname"
                    placeholder="Your lastname here"
                    value={formData.lastName}
                    radius="md"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        lastName: event.currentTarget.value,
                      })
                    }
                    error={props.isErrors.lastname.details}
                    invalid={props.isErrors.lastname.error}
                    required
                    size="sm"
                  />
                </div>
                <div className="space-y-2">
                  <TextInput
                    type="email"
                    label="Email"
                    placeholder="@gmail.com"
                    value={formData.email}
                    radius="md"
                    onChange={handleEmail}
                    error={props.isErrors.email.details}
                    invalid={props.isErrors.email.error}
                    required
                    size="sm"
                  />
                </div>
                <div className="space-y-2">
                  <PasswordStrength
                    formData={formData}
                    value={formData.password}
                    setValue={setFormData}
                    cb={handlePasswordChange}
                    timeoutId={timeoutId}
                    setTimeoutId={setTimeoutId}
                    error={props.isErrors.password.details}
                    invalid={props.isErrors.password.error}
                  />
                </div>
                <div className="space-y-2">
                  <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    radius="md"
                    onChange={handleConfirmPassword}
                    error={props.isErrors.confirmPassword.details}
                    invalid={props.isErrors.confirmPassword.error}
                    required
                    size="sm"
                  />
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
})(Signup);

import React, { useState } from "react";
import Link from "next/link";
import { changePass } from "../../components/api/apis";

function changePassword() {
  let [mail, setMail] = useState("");

  const sendData = async (e) => {
    e.preventDefault();
    console.log(mail);
    try {
      await changePass
        .post("/", { email: mail })
        .then((result) => {
          console.log("Password reset link is sent to the registered mail id");
        })
        .catch(() => {
          console.error("Invalid email !");
        });
    } catch (e) {
      console.error("server error !");
    }
  };

  return (
    <div className="h-[1200px] flex justify-center items-center ">
      <div className="absolute w-60 h-60 opacity-50 rounded-xl bg-custom-indigo -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
      <div className="absolute opacity-50 w-48 h-48 rounded-xl bg-custom-indigo -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
      <div className="py-5 px-5 lg:py-12 lg:px-12 bg-white rounded-2xl shadow-xl z-20">
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            Forgot Password ?
          </h1>
          <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">
            Change your password a confirmation mail will be send to your
            registerd email
          </p>
        </div>
        <div className="space-y-4">
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Enter your registerd email"
            className="block text-base lg:text-lg py-3 px-4 rounded-lg w-full border border-custom-indigo outline-none text-black"
          />
        </div>
        <div className="flex flex-col justify-center items-center mt-6">
          <button
            type="submit"
            onClick={sendData}
            className="py-[.7rem] lg:py-3 lg:w-64 w-52 text-xl md:block text-white bg-custom-indigo rounded-full"
          >
            Send
          </button>
          <Link href="/auth/signin">
            <a className="mt-4 text-sm text-black">
              <span className="cursor-pointer"> Sign In</span>
            </a>
          </Link>
        </div>
      </div>
      <div className="w-40 h-40 opacity-50 absolute bg-custom-indigo rounded-full top-0 right-12 hidden md:block"></div>
      <div className="w-20 h-40 absolute bg-custom-indigo rounded-full bottom-20 left-10 transform rotate-45 hidden md:block opacity-50"></div>
    </div>
  );
}

export default changePassword;

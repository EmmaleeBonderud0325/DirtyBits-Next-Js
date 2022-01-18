import { useState } from "react";
import Link from "next/link";

const ConfirmPassword = () => {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  return (
    <div>
      <div className="h-[1200px] flex justify-center items-center ">
        <div className="absolute w-60 h-60 opacity-50 rounded-xl bg-custom-indigo -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
        <div className="absolute opacity-50 w-48 h-48 rounded-xl bg-custom-indigo -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
        <div className="py-5 px-5 lg:py-12 lg:px-12 bg-white rounded-2xl shadow-xl z-20">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
              Change Password ?
            </h1>
            <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">
              Change your password
            </p>
          </div>
          <form autoComplete={false}>
            <div className="space-y-4">
              <input
                type="text"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="New Password"
                className="block text-base lg:text-lg py-3 px-4 rounded-lg w-full border border-custom-indigo outline-none text-black"
              />
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Confirm New Password"
                className="block text-base lg:text-lg py-3 px-4 rounded-lg w-full border border-custom-indigo outline-none text-black"
              />
            </div>
            <div className="flex flex-col justify-center items-center mt-6">
              <button
                type="submit"
                //   onClick={sendData}
                className="py-[.7rem] lg:py-3 lg:w-64 w-52 text-xl md:block text-white bg-custom-indigo rounded-full"
              >
                Confirm
              </button>
              <Link href="/auth/signin">
                <a className="mt-4 text-sm text-black">
                  <span className="cursor-pointer"> Sign In</span>
                </a>
              </Link>
            </div>
          </form>
        </div>
        <div className="w-40 h-40 opacity-50 absolute bg-custom-indigo rounded-full top-0 right-12 hidden md:block"></div>
        <div className="w-20 h-40 absolute bg-custom-indigo rounded-full bottom-20 left-10 transform rotate-45 hidden md:block opacity-50"></div>
      </div>
    </div>
  );
};

export default ConfirmPassword;

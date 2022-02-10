import React from "react";
import Link from "next/link";

function Form(props) {
  return (
    <>
      <div className="relative flexContainer h-[900px]">
        <div className="py-5 px-5 lg:py-12 lg:px-12 bg-white rounded-2xl shadow-xl z-20">
          <div>
            <h1 className="text-3xl text-black font-bold text-center mb-4 cursor-pointer">
              {props.title}
            </h1>
            <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">
              {props.description}
            </p>
          </div>
          <form className="space-y-4">
            <div className="space-y-4">
              <input
                type={props.type}
                value={props.currentValue}
                onChange={(e) => props.getValue(e.target.value)}
                placeholder={props.placeholder}
                className={`block text-base lg:text-lg py-3 px-4 rounded-lg w-full border ${
                  props.error ? "border-red-500" : "border-custom-indigo"
                } outline-none text-black`}
              />
              {props.extraField ? (
                <input
                  type="password"
                  value={props.currentValue2}
                  onChange={(e) => props.getValue2(e.target.value)}
                  placeholder="Confirm New Password"
                  className={`block text-base lg:text-lg py-3 px-4 rounded-lg w-full border ${
                    props.error ? "border-red-500" : "border-custom-indigo"
                  } outline-none text-black`}
                />
              ) : null}
            </div>
            <div className="text-red-500 pl-3 h-4">{props.error}</div>
            <div className="flex flex-col justify-center items-center mt-6">
              <button
                type="submit"
                onClick={(e) => props.send(e)}
                className="py-[.7rem] lg:py-3 lg:w-64 w-52 text-xl md:block text-white bg-custom-indigo rounded-full"
              >
                {props.buttonText}
              </button>
              <Link href="/auth/signin">
                <a className="mt-4 text-sm text-black">
                  <span className="cursor-pointer"> Sign In</span>
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;

import React from "react";

function Background() {
  return (
    <>
      <div className="absolute w-60 h-60 rounded-xl bg-custom-indigo -top-5 -left-16 z-0 transform rotate-45 hidden md:hidden lg:block"></div>
      <div className="absolute w-48 h-48 rounded-xl bg-custom-indigo -bottom-10 transform rotate-12 hidden md:hidden lg:block"></div>
      <div className="w-40 h-40 absolute bg-custom-indigo rounded-full top-0 right-12 hidden md:hidden lg:block"></div>
      <div className="w-20 h-40 absolute bg-custom-indigo rounded-full bottom-20 right-10 transform rotate-45 hidden md:hidden lg:block"></div>

      <div className="absolute md:bg-gradient-to-b from-black to-black opacity-75 lg:inset-0 z-0"></div>
    </>
  );
}

export default Background;

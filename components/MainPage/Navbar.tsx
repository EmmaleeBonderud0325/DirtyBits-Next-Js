import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between flex-row  py-2">
      <div className="flex flex-row justify-center min-w-[10rem]">
        <div className="min-w-[0.8rem] bg-swatch1 mr-2" />
        <b>DirtyBits</b>
      </div>
      <div>
        <ul className="flex justify-between flex-row list-none ">
          <li>Home</li>
          <li>Compete</li>
          <li>Practice</li>
          <li>Blogs</li>
        </ul>
      </div>
      <div>Signup</div>
    </nav>
  );
};

export default Navbar;

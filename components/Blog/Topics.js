import React from "react";

function Topics() {
  return (
    <div className="p-4 fixed top-50 right-[22rem] hidden lg:block w-[15rem]">
      <h1 className="mb-4 text-xl font-bold text-white">Categories</h1>
      <div className="flex flex-col max-w-sm px-4 py-6 mx-auto bg-gray-800 rounded-lg shadow-md">
        <ul>
          <li>
            <a
              href="#"
              className="mx-1 font-bold text-white hover:text-gray-600 hover:underline"
            >
              - AWS
            </a>
          </li>
          <li className="mt-2">
            <a
              href="#"
              className="mx-1 font-bold text-white hover:text-gray-600 hover:underline"
            >
              - Laravel
            </a>
          </li>
          <li className="mt-2">
            <a
              href="#"
              className="mx-1 font-bold text-white hover:text-gray-600 hover:underline"
            >
              - Vue
            </a>
          </li>
          <li className="mt-2">
            <a
              href="#"
              className="mx-1 font-bold text-white hover:text-gray-600 hover:underline"
            >
              - Design
            </a>
          </li>
          <li className="flex items-center mt-2">
            <a
              href="#"
              className="mx-1 font-bold text-white hover:text-gray-600 hover:underline"
            >
              - Django
            </a>
          </li>
          <li className="flex items-center mt-2">
            <a
              href="#"
              className="mx-1 font-bold text-white hover:text-gray-600 hover:underline"
            >
              - PHP
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Topics;

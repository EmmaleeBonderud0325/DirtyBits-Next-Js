import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";

import Cookies from "js-cookie";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Profile = () => {
  const profileImageLink = useSelector((state) => state.userData.profile_pic);

  const signOutUser = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    dispatch(
      updateUserinfo({
        is_logged_in: false,
        is_admin: false,
        email: "",
        first_name: "",
        last_name: "",
        username: "",
      })
    );
  };
  return (
    <>
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">Open user menu</span>
            {profileImageLink && (
              <Image
                className="rounded-full"
                width={40}
                height={40}
                src={profileImageLink}
                alt="profile pic"
              />
            )}
          </Menu.Button>
        </div>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/profile/mohitbisht"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Your Profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/addproblems"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Add Problem
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  onClick={signOutUser}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Sign out
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

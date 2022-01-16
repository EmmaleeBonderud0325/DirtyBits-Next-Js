import React from "react";
import { signoutUser } from "../redux/actions/authenticate";
import { Fragment } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Menu, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { openNotificationWithIcon } from "./OpenNotification";
import Image from "next/image";
import Link from "next/link";
import { classNames } from "./Helper/Classnames";

export const UserProfileDropDown = (props) => {
  const dispatch = useDispatch();

  const profilePic = useSelector((state) => state.userData.profile_pic);
  const username = useSelector((state) => state.userData.username);
  const isAdmin = useSelector((state) => state.userData.is_admin);

  const notificationHandler = () => {
    if (!isAdmin) {
      const message = "Not an Admin";
      const description =
        "You don't have enough privileges, because you are not an admin";
      openNotificationWithIcon(
        "info",
        (message = message),
        (description = description)
      );
    }
  };
  return (
    <>
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">Open user menu</span>
            {profilePic && (
              <Image
                className="h-10 w-10 rounded-full"
                src={profilePic}
                alt="profilePic"
                height="40"
                width="40"
              />
            )}
            {props.showUserName && (
              <span className="text-white px-2 pt-1.5 pr-3 text-base hidden sm:block">
                {username}
              </span>
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
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
                  href={`/profile/${username}`}
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
                  href={`${isAdmin ? "/addproblems" : "#"}`}
                  onClick={notificationHandler}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "px-4 py-2 text-sm text-gray-700 flex items-center gap-2"
                  )}
                >
                  <span>Add Problem</span>
                  {!isAdmin && (
                    <AiOutlineInfoCircle className="text-red-500 text-lg" />
                  )}
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href="/">
                  <a
                    onClick={() => {
                      dispatch(signoutUser(props.redirectOnSignout));
                    }}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Sign out
                  </a>
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

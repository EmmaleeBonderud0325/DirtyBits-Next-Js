import React from "react";
import { signoutUser } from "../redux/actions/authenticate";
import { Fragment } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, connect } from "react-redux";
import { openNotificationWithIcon } from "./OpenNotification";
import Image from "next/image";
import { classNames } from "./Helper/Classnames";

function UserProfileDropDown(props) {
  const dispatch = useDispatch();

  const notificationHandler = () => {
    if (!props.props.isAdmin) {
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
            {props.profilePic && (
              <Image
                className="h-10 w-10 rounded-full"
                src={props.profilePic}
                alt="profilePic"
                height="40"
                width="40"
              />
            )}
            {props.showUserName && (
              <span className="text-white px-2 pt-1.5 pr-3 text-base hidden sm:block">
                {props.username}
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
                  href={`/profile/${props.username}`}
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
                  href={`${props.isAdmin ? "/addproblems" : "#"}`}
                  onClick={notificationHandler}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "px-4 py-2 text-sm text-gray-700 flex items-center gap-2"
                  )}
                >
                  <span>Add Problem</span>
                  {!props.isAdmin && (
                    <AiOutlineInfoCircle className="text-red-500 text-lg" />
                  )}
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    dispatch(signoutUser(props.redirectOnSignout));
                  }}
                  className={classNames(
                    active
                      ? "bg-gray-100 hover:cursor-pointer text-blue-400"
                      : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Sign out
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    profilePic: state.userData.profile_pic,
    username: state.userData.username,
    isAdmin: state.userData.is_admin,
  };
};

export default connect(mapStateToProps)(UserProfileDropDown);

import React, { ReactElement } from "react";
import { signoutUser } from "../redux/actions/authenticate";
import { Fragment } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
// import { Menu, Transition } from "@headlessui/react";
import { useDispatch, connect, useSelector } from "react-redux";
// import { openNotificationWithIcon } from "./OpenNotification";
import Image from "next/image";
import { classNames } from "./Helper/Classnames";
import Link from "next/link";
import { IRootState } from "../redux/reducers";
import { showNotification } from '@mantine/notifications';
import { Menu, Divider as Div, UnstyledButton } from '@mantine/core';
import { Flex } from "@chakra-ui/react";
import { Avatar, AvatarsGroup } from '@mantine/core';
import Router from "next/router";
import { FcInfo } from "react-icons/fc";

interface Props {
  profilePic: string;
  username: string;
  isAdmin: boolean;
  showUserName: boolean;
  redirectOnSignout: boolean;
}

function UserProfileDropDown(props: Props): ReactElement {
  const dispatch = useDispatch();

  const { is_logged_in, profile_pic, username, is_admin } = useSelector(
    (state: any) => state.userData
  );
  const addProbemRouteHandler = () => {
    if (is_admin) {
      Router.push("/addproblems");
    } else {
      console.log('called')
      showNotification({
        title: 'Not an Admin',
        message: "You don't have enough privileges, because you are not an admin",
        icon: <FcInfo className="text-4xl"/>
      })
    }
  };

  const profileRouteHandler = () => {
    Router.push(`/profile/${username}`)
  } 

  const signoutHandler = () => {
    dispatch(signoutUser(true))
  }

  return (
    <>
      {/* <Menu as="div" className="ml-3 relative">
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
            className={`origin-top-right absolute right-0 ${
              !props.showUserName ? "mt-1" : "mt-12"
            } w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
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
                <Link href={`${props.isAdmin ? "/addproblems" : "#"}`}>
                  <a
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
                </Link>
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
      </Menu> */}

<Menu 
               className="group" 
              
               control={
                  <UnstyledButton className="hidden md:block min-w-max">  
                    <Flex className="group-hover:cursor-pointer" alignItems="center">
                      {/* <Avatar className="mt-2" name={username} src={profile_pic} size="sm" /> */}
                      <Avatar radius="xl" size="lg" src={profile_pic} />;
                      {/* <span className="text-white ml-2 font-medium">{username}</span> */}
                    </Flex>
                  </UnstyledButton>}>
                <Menu.Item  
                  sx={(theme) => ({
                    '&:hover': {
                    backgroundColor: theme.colors.gray[8],
                    },
                  })}
                  onClick={profileRouteHandler}>
                    Your Profile
                </Menu.Item> 
                <Menu.Item  
                  sx={(theme) => ({
                    '&:hover': {
                    backgroundColor: theme.colors.gray[8],
                    },
                  })}
                  disabled={!is_admin}
                  onClick={addProbemRouteHandler}>
                    Add problems
                </Menu.Item> 
                <Div />           
                <Menu.Item  
                  sx={(theme) => ({
                    '&:hover': {
                    backgroundColor: theme.colors.gray[8],
                    },
                  })}
                  onClick={signoutHandler}
                  color="red"
                  >
                    Sign Out
                </Menu.Item> 
               </Menu>
    </>
  );
}

const mapStateToProps = (state: IRootState) => {
  return {
    profilePic: state.userData.profile_pic,
    username: state.userData.username,
    isAdmin: state.userData.is_admin,
  };
};

export default connect(mapStateToProps)(UserProfileDropDown);

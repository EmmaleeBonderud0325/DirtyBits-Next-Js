import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { notification } from "antd";

import LoginButton from "./LoginButton";
import { updateUserinfo } from "../redux/actions";
import logo2 from "../public/logo2.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ bg, fixedHeader }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.userData.is_logged_in);
  const isAdmin = useSelector((state) => state.userData.is_admin);
  const profilePic = useSelector((state) => state.userData.profile_pic);
  const username = useSelector((state) => state.userData.username);

  const navigation = [
    {
      name: "Home",
      href: "/",
      current: router.pathname === "/" ? true : false,
    },
    {
      name: "Compete",
      href: "/compete",
      current: router.pathname === "/compete" ? true : false,
    },
    {
      name: "Practice",
      href: "/problemset",
      current: router.pathname === "/problemset" ? true : false,
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
      current: router.pathname === "/leaderboard" ? true : false,
    },
    {
      name: "Blogs",
      href: "/blogs",
      current: router.pathname === "/blogs" ? true : false,
    },
  ];
  // useEffect(() => console.log('props', userInfo.is_logged_in))
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

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Not an Admin",
      description:
        "You don't have enough privileges, because you are not an admin",
      style: {
        background: "black",
        color: "white",
      },
      className: "notification",
    });
  };

  const notificationHandler = () => {
    if (!isAdmin) {
      openNotificationWithIcon("info");
    }
  };

  return (
    <div className={fixedHeader}>
      <Disclosure as="nav" className={bg}>
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-center sm:justify-start ">
                  <div className="flex-shrink-0 flex items-center pt-2">
                    <Image
                      className="hidden"
                      src={logo2}
                      width={300}
                      height={50}
                    />
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          className={classNames(
                            item.current
                              ? "bg-custom-indigo text-white hover:text-white"
                              : "text-gray-300 hover:bg-gray-500 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium font-sans"
                          )}
                          aria-current={item.current ? "page" : undefined}
                          href={item.href}
                          key={item.name}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  {isLoggedIn ? (
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <Image
                            className="h-10 w-10 rounded-full"
                            src={profilePic}
                            alt="profilePic"
                            height="40"
                            width="40"
                          />
                          <span className="text-white px-2 pt-1.5 pr-3 text-base hidden sm:block">
                            {username}
                          </span>
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
                                  "block px-4 py-2 text-sm text-gray-700 flex items-center gap-2"
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
                                  onClick={signOutUser}
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
                  ) : (
                    <div className="lg:space-x-3">
                      <LoginButton url={"/auth/signin"} text="Login" />
                      <span className="border-r border-white"></span>
                      <LoginButton url={"/auth/signup"} text="Sign Up" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        item.current
                          ? "bg-custom-yellow text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default Navbar;

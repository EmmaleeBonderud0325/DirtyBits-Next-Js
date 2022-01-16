import { useSelector } from "react-redux";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import LoginButton from "./LoginButton";
import logo2 from "../public/logo2.svg";
import { UserProfileDropDown } from "./UserProfileDropDown";
import { classNames } from "./Helper/Classnames";

function Navbar({ bg, fixedHeader }) {
  const router = useRouter();

  const isLoggedIn = useSelector((state) => state.userData.is_logged_in);

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
                  {isLoggedIn ? (
                    <UserProfileDropDown
                      showUserName={true}
                      redirectOnSignout={false}
                    />
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

import { Container } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import logo from "public/logo.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { logout } from "features/UserData/userDataSlice";

function Navbar() {
  const dispatch = useDispatch();
  return (
    <div id="glassNavbar" className="glassNavbar">
      <Container size="xl">
        <nav className="flex mx-auto flex-1 justify-between items-center">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/">
            {/* <div className="brand mr-2"></div> */}
            <Image height={40} width={120} src={logo} alt="Logo" />
          </a>
          <ul className="gap-16 items-center text-white list-none hidden md:flex">
            <li className="group font-medium hover:cursor-pointer tracking-wide space-y-1">
              <Link href="/compete">
                <a className="mb-5 no-underline text-white">Compete</a>
              </Link>
              <div className="h-0.5 bg-custom-indigo scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
            </li>
            <li className="group font-medium hover:cursor-pointer tracking-wide space-y-1">
              <Link href="/problemset">
                <a className="mb-5 no-underline text-white">Problems</a>
              </Link>
              <div className="h-0.5 bg-custom-indigo scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
            </li>
            <li className="group font-medium hover:cursor-pointer tracking-wide space-y-1">
              <Link href="/leaderboard">
                <a className="mb-5 no-underline text-white">Leaderboard</a>
              </Link>
              <div className="h-0.5 bg-custom-indigo scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
            </li>
            <li
              onClick={() => dispatch(logout())}
              className="group text-lg font-medium hover:cursor-pointer tracking-wide space-y-1"
            >
              {/* <Link href="/blogs"> */}
              {/* <a className="text-lg no-underline text-white"> */}
              <FaRegUser />
              {/* </a> */}
              {/* </Link> */}
              {/* <div className="h-0.5 bg-custom-indigo scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div> */}
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
}

export default Navbar;

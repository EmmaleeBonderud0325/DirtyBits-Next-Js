import { Container } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { FaRegUser } from "react-icons/fa";

function Navbar() {
  return (
    <div id="glassNavbar" className="glassNavbar">
      <Container size="xl">
        <nav className="flex mx-auto flex-1 justify-between items-center">
          <a
            href="#"
            className="text-white pb-1 tracking-wider no-underline text-2xl font-bold"
          >
            <div className="brand mr-2"></div>
            DirtyBits
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
            <li className="group text-lg font-medium hover:cursor-pointer tracking-wide space-y-1">
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

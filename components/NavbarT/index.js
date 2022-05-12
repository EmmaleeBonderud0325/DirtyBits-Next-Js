import { Container } from "@mantine/core";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div id="glassNavbar" className="glassNavbar">
      <Container size="xl">
        <nav className="flex mx-auto flex-1 justify-between items-center">
          <a
            href="#"
            className="text-custom-indigo pb-1 tracking-wider no-underline text-2xl font-bold"
          >
            DirtyBits
          </a>
          <ul className="flex gap-16 items-center text-white list-none">
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
            <li className="group font-medium hover:cursor-pointer tracking-wide space-y-1">
              <Link href="/blogs">
                <a className="mb-16 no-underline text-white">Blogs</a>
              </Link>
              <div className="h-0.5 bg-custom-indigo scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
}

export default Navbar;

import React, { useState } from "react";
import UserDropdown from "components/UserDropdown";
import Notification from "components/Navbar/Notification";
import { CreditCardIcon } from "SVG";
import { Burger } from "@mantine/core";

function ProfileNavbar({ setModalState }) {
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close navigation" : "Open navigation";

  const handleBurgerClick = () => {
    setOpened(!opened);
    setModalState(!opened);
  };

  return (
    <nav className="flex mx-auto flex-1 justify-between items-center font-secondary">
      <a
        href="#"
        className="text-white pb-1 tracking-wider no-underline text-2xl font-bold sm:flex sm:items-center"
      >
        <div className="brand mr-2"></div>
        <span>Dashboard</span>
      </a>
      <div className="block md:hidden">
        <Burger opened={opened} onClick={handleBurgerClick} title={title} />
      </div>
      <div className="text-white items-center md:space-x-20 hidden md:flex">
        <ul className="list-none flex gap-10 items-center">
          <li className="hidden lg:block">Home</li>
          <li className="hidden lg:block">Home</li>
          <li className="font-semibold flex items-center space-x-2">
            <CreditCardIcon height="30" width="30" />
            <span className="text-custom-indigo ">200 PBC</span>
          </li>
        </ul>
        <div className="flex items-center">
          <span className="hidden lg:block">
            <Notification />
          </span>
          <UserDropdown showUserName size={40} />
        </div>
      </div>
    </nav>
  );
}

export default ProfileNavbar;

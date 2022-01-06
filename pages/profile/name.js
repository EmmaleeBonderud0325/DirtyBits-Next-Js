import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { VscSettingsGear } from "react-icons/vsc";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Rate } from "antd";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";

function Name() {
  return (
    <div className="space-y-8 container p-10 mx-auto max-w-screen-xl">
      <div class="p-4">
        <header class="flex justify-between items-center">
          <div class="left">
            <h1 class="font-semibold text-2xl text-white">Hello, James !</h1>
            <p class="uppercase text-gray-400 text-xs tracking-wider">
              Welcome To Your Dashboard
            </p>
          </div>

          <div class="center flex items-center p-1 pl-2 rounded-2xl">
            <AiOutlineSearch className="text-[20px]" />
            <input
              class="ml-1 text-lg placeholder:text-base placeholder:p-1 placeholder:tracking-wide outline-none bg-transparent py-4 caret-custom-indigo"
              type="text"
              placeholder="Search..."
            />
          </div>
          <div class="right flex gap-4">
            <VscSettingsGear className="text-lg" />
            <Badge color="secondary" badgeContent={0} showZero>
              <IoMdNotificationsOutline className="text-lg" />
            </Badge>
          </div>
        </header>

        {/* https://www.pngplay.com/wp-content/uploads/7/Happy-Girl-PNG-Images-HD.png */}

        <main>
          <div class="flex mt-10 p-4">
            <div class="relative left h-full lg:w-1/3 md:w-1/2 rounded-2xl">
              <div class="flex justify-between items-center h-5/6">
                <div className="relative rounded-full h-56 w-56 flex justify-center items-center">
                  <img
                    className="absolute h-52 object-contain"
                    src="https://pngimage.net/wp-content/uploads/2018/05/executive-woman-png-5.png"
                    alt=""
                  />
                </div>
                <div class="absolute text-right w-full flex flex-col items-end">
                  <button class="bg-indigo-600 rounded-md px-1 py-1">
                    <img
                      class="h-5"
                      src="https://img.icons8.com/emoji/48/000000/pencil-emoji.png"
                    />
                  </button>
                  <p class="font-semibold tracking-wider">Jarrad Jackson</p>
                  <p class="text-gray-500 text-sm">
                    Jarrad.jackson@hotmail.com
                  </p>
                  <p>28, F</p>
                  <div class="my-6 flex flex-col">
                    <label class="text-gray-500 text-sm">Role</label>
                    <Chip label="Trainer" color="success" />
                  </div>

                  <div class="flex-col inline-flex my-6">
                    <label class="text-gray-500 text-sm">Primary Trainer</label>
                    <p>Steve Hills</p>
                  </div>
                </div>
              </div>

              <div className="my-4">
                <Rate defaultValue={4} disabled />
              </div>

              <div class="mt-5">
                <h2 class="uppercase text-left text-[15px] text-white">
                  Contact Information
                </h2>
                <div class="flex justify-between">
                  <div>
                    <label class="text-[11px] text-gray-500" for="mobile">
                      Mobile
                    </label>
                    <p class="text-[13px] font-semibold">0401312312</p>
                    <label class="text-[11px] text-gray-500" for="mobile">
                      Mobile
                    </label>
                    <p class="text-[13px] font-semibold">0401312312</p>
                    <label class="text-[11px] text-gray-500" for="mobile">
                      Mobile
                    </label>
                    <p class="text-[13px] font-semibold">0401312312</p>
                  </div>
                  <div>
                    <label class="text-[11px] text-gray-500" for="mobile">
                      Mobile
                    </label>
                    <p class="text-[13px] font-semibold">0401312312</p>
                    <label class="text-[11px] text-gray-500" for="mobile">
                      Mobile
                    </label>
                    <p class="text-[13px] font-semibold">0401312312</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="right bg-green-400 h-5/6 w-1/2"></div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Name;

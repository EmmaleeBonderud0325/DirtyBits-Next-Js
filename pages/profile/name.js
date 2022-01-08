import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { VscSettingsGear } from "react-icons/vsc";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Button, Rate, Result } from "antd";
import Image from "next/image";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import { Progress } from "antd";
import { Statistic, Card, Row, Col } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

function Name() {
  return (
    <div className="space-y-8 container p-10 mx-auto max-w-screen-xs lg:max-w-screen-xl">
      <div class="lg:p-4">
        <span className="block lg:hidden">
          <h1 className="text-white text-center text-[35px] font-medium">
            Hello, James!
          </h1>
        </span>
        <header class="flex justify-between items-center">
          <div class="hidden lg:block">
            <h1 class="font-semibold lg:text-2xl text-white">Hello, James !</h1>
            <p class="uppercase text-gray-400 text-xs tracking-wider">
              Welcome To Your Dashboard
            </p>
          </div>

          <div class="center flex items-center p-1 pl-2 rounded-2xl">
            <AiOutlineSearch className="text-[20px] text-white" />
            <input
              class="ml-1 text-lg placeholder:text-base placeholder:p-1 placeholder:tracking-wide outline-none bg-transparent py-4 caret-custom-indigo text-white"
              type="text"
              placeholder="Search..."
            />
          </div>
          <div class="right flex gap-4 text-white">
            <VscSettingsGear className="text-lg" />
            <Badge color="secondary" badgeContent={0} showZero>
              <IoMdNotificationsOutline className="text-lg" />
            </Badge>
          </div>
        </header>

        {/* https://www.pngplay.com/wp-content/uploads/7/Happy-Girl-PNG-Images-HD.png */}

        <main>
          <div class="flex flex-col lg:flex-row mt-10 p-4">
            <div className="relative block lg:hidden h-full w-full">
              <Image
                className="absolute object-contain rounded-full"
                height={100}
                width={100}
                src={
                  "https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp.jpg"
                }
                alt="profile pic"
                layout="responsive"
              />
            </div>

            <div class="relative left h-full lg:w-1/3 md:w-1/2 rounded-2xl">
              <div class="flex justify-between items-center h-5/6">
                <div className="absolute hidden rounded-full h-56 w-56 lg:flex justify-center items-center">
                  <div className="relative h-full w-full">
                    <Image
                      className="absolute object-contain rounded-full overflow-hidden"
                      height={100}
                      width={100}
                      src={
                        "https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp.jpg"
                      }
                      alt="profile pic"
                      layout="responsive"
                    />
                  </div>
                </div>
                <div class="lg:relative text-right w-full flex flex-col lg:items-end justify-center items-center">
                  <button class="bg-indigo-600 rounded-md px-1 py-1">
                    <img
                      class="h-5"
                      src="https://img.icons8.com/emoji/48/000000/pencil-emoji.png"
                    />
                  </button>
                  <p class="font-semibold tracking-wider text-lg text-white">
                    Jarrad Jackson
                  </p>
                  <p class="text-gray-500 text-sm">
                    Jarrad.jackson@hotmail.com
                  </p>
                  <p className="text-white">28, F</p>
                  <div class="lg:my-6 my-3 flex lg:flex-col lg:items-end items-center space-x-2">
                    <label class="text-gray-500 text-sm">Role</label>
                    <Chip label="Trainer" color="success" />
                  </div>

                  <div class="lg:flex-col flex lg:inline-flex lg:my-6 my-3  lg:items-end space-x-2">
                    <label class="text-gray-500 text-sm">Primary Trainer</label>
                    <p className="text-white">Steve Hills</p>
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

            <div class="mt-24 lg:mt-0 flex-1 p-2 flex flex-col items-center justify-center lg:pl-48 lg:space-y-10  rounded-2xl">
              <div className="w-full grid grid-cols-2 place-items-center lg:grid-cols-4 gap-4 lg:p-4">
                <Progress
                  strokeColor={"lime"}
                  type="circle"
                  percent={30}
                  width={100}
                  showInfo={true}
                  trailColor={"grey"}
                />
                <Progress
                  strokeColor={"yellow"}
                  type="circle"
                  percent={30}
                  width={100}
                  trailColor={"grey"}
                />
                <Progress
                  strokeColor={"red"}
                  type="circle"
                  percent={30}
                  width={100}
                  trailColor={"grey"}
                />
              </div>
              <div className="bottombar ">
                <Result
                  status="success"
                  title="Successfully Purchased Cloud Server ECS!"
                  subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                  extra={[
                    <Button type="primary" key="console">
                      Go Console
                    </Button>,
                    <Button key="buy">Buy Again</Button>,
                  ]}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Name;

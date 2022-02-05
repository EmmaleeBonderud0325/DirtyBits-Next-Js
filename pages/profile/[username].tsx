import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { VscSettingsGear } from "react-icons/vsc";
import { IoMdNotificationsOutline } from "react-icons/io";

import Image from "next/image";

import { XAxis, Tooltip, AreaChart, Area } from "recharts";
import { getStaticData, getUserProfile } from "../../components/api/apis";
import Head from "next/head";
import { IRootState } from "../../redux/reducers";

interface SubmissionsI {
  date: string;
  "Questions Solved": number;
}

interface UserProfileI {
  id: number;
  email: string;
  score: number;
  rank: number;
  rating: number;
  hard_solved: number;
  medium_solved: number;
  easy_solved: number;
  submissions: SubmissionsI[];
}

interface StaticdataI {
  id: number;
  easy: number;
  medium: number;
  hard: number;
  avatar_count: number;
  users_count: number;
}

function Profile(): ReactElement {
  const userInfo = useSelector((state: IRootState) => state.userData);

  const [percentage, setPercentage] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  const [sub, setSub] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { easy_solved, medium_solved, hard_solved, submissions },
      } = await getUserProfile.get<UserProfileI>("/");

      const {
        data: { easy, medium, hard },
      } = await getStaticData.get<StaticdataI>("/");

      const perc = {
        easy: (easy_solved / easy) * 100,
        medium: (medium_solved / medium) * 100,
        hard: (hard_solved / hard) * 100,
      };

      setPercentage(perc);
      setSub(submissions);
    };
    getProfile();
  }, []);

  return (
    <>
      <Head>
        <title>{userInfo.username ? userInfo.username : "Loading..."}</title>
      </Head>
      <div className="bg-[#060F1E] min-h-screen">
        <div className="space-y-8 container p-10 mx-auto max-w-screen-xs lg:max-w-screen-xl ">
          <div className="lg:p-4">
            <span className="block lg:hidden">
              <h1 className="text-white text-center text-[35px] font-medium">
                Hello, {userInfo.username}!
              </h1>
            </span>
            <header className="flex justify-between items-center">
              <div className="hidden lg:block">
                <h1 className="font-semibold lg:text-2xl text-white">
                  Hello, {userInfo.username} !
                </h1>
                <p className="uppercase text-gray-400 text-xs tracking-wider">
                  Welcome To Your Dashboard
                </p>
              </div>

              <div className="center flex items-center p-1 pl-2 rounded-2xl">
                <AiOutlineSearch className="text-[20px] text-white" />
                <input
                  className="ml-1 text-lg placeholder:text-base placeholder:p-1 placeholder:tracking-wide outline-none bg-transparent py-4 caret-custom-indigo text-white"
                  type="text"
                  placeholder="Search..."
                />
              </div>
              <div className="right flex gap-4 text-white">
                <VscSettingsGear className="text-lg" />
              </div>
            </header>

            <main>
              <div className="flex flex-col lg:flex-row mt-10 p-4">
                <div className="relative block overflow-hidden  lg:hidden h-[300px] w-[250px]">
                  {userInfo.profile_pic && (
                    <Image
                      className="absolute object-contain rounded-full"
                      height={150}
                      width={150}
                      src={userInfo.profile_pic}
                      alt="profile pic"
                      layout="responsive"
                    />
                  )}
                </div>

                <div className="relative left h-full lg:w-1/3 md:w-1/2 rounded-2xl">
                  <div className="flex justify-between items-center h-5/6">
                    <div className="absolute hidden rounded-full h-36 w-36 lg:flex justify-center items-center">
                      <div className="relative h-full w-full">
                        {userInfo.profile_pic && (
                          <Image
                            className="absolute object-contain rounded-md overflow-hidden"
                            height={50}
                            width={50}
                            src={userInfo.profile_pic}
                            alt="profile pic"
                            layout="responsive"
                          />
                        )}
                      </div>
                    </div>
                    <div className="lg:relative text-right w-full flex flex-col lg:items-end justify-center items-center">
                      <button className="bg-indigo-600 rounded-md px-1 py-1">
                        <Image
                          src="https://img.icons8.com/emoji/48/000000/pencil-emoji.png"
                          alt="edit button image"
                          width={20}
                          height={5}
                        />
                      </button>
                      <p className="font-semibold tracking-wider text-lg text-white">
                        {userInfo.first_name} {userInfo.last_name}
                      </p>
                      <p className="text-gray-500 text-sm">{userInfo.email}</p>
                      <p className="text-white">28, F</p>
                      <div className="lg:my-6 my-3 flex lg:flex-col lg:items-end items-center space-x-2">
                        <label className="text-gray-500 text-sm">Role</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-24 lg:mt-0 flex-1 p-2 flex flex-col items-center justify-center lg:pl-36 lg:space-y-10  rounded-2xl">
                  {/* <div className="w-full grid grid-cols-2 place-items-center lg:grid-cols-4 gap-4 lg:p-0">
                    <div className="space-x-5">
                      <label className="text-gray-400">Easy:</label>
                      <Progress
                        strokeColor={"lime"}
                        type="circle"
                        percent={percentage.easy}
                        width={100}
                        showInfo={true}
                        trailColor={"black"}
                      />
                    </div>

                    <div className="space-x-5">
                      <label className="text-gray-400">Medium:</label>
                      <Progress
                        strokeColor={"orange"}
                        type="circle"
                        percent={percentage.medium}
                        width={100}
                        trailColor={"black"}
                      />
                    </div>
                    <div className="space-x-5">
                      <label className="text-gray-400">Hard:</label>
                      <Progress
                        strokeColor={"red"}
                        type="circle"
                        percent={percentage.hard}
                        width={100}
                        trailColor={"black"}
                      />
                    </div>
                  </div> */}
                  <div className="bottombar h-full w-full hidden lg:block">
                    <div className="space-y-6">
                      <label className="text-white font-bold text-2xl">
                        Questions Solved
                      </label>

                      <AreaChart
                        width={600}
                        height={250}
                        data={sub}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#8884d8"
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="95%"
                              stopColor="#8884d8"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />

                        <Tooltip
                          cursor={false}
                          contentStyle={{
                            background: "black",
                            color: "white",
                            border: "none",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="Questions Solved"
                          stroke="#5476DA"
                          fillOpacity={1}
                          strokeWidth={5}
                          fill="url(#colorUv)"
                        />
                      </AreaChart>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
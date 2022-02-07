import { ReactElement } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { IRootState } from "../redux/reducers";
import {RingProgress, Text} from '@mantine/core'
import { XAxis, Tooltip, AreaChart, Area } from "recharts";
import { useBreakpointValue } from '@chakra-ui/react'

function Profile(): ReactElement {
  const userData = useSelector((state: IRootState) => state.userData);
  const isMobile = useBreakpointValue({ base: true, md: false })

  console.log('mobile', isMobile)
  
  const item = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  
  
  return (
    <div className="">
      <div className="">
        <div className="w-full text-white bg-main-color">
          <div
            x-data="{ open: false }"
            className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
          >
            <div className="p-4 flex flex-row items-center justify-between">
              <a
                href="#"
                className="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline"
              >
                Your Dashboard
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className=" p-3 border-t-4 border-custom-indigo">
                <div className="image overflow-hidden">
                  {userData.profile_pic && (
                    <Image
                      className="h-auto w-full mx-auto"
                      src={userData.profile_pic}
                      alt="profile pic"
                      width={500}
                      height={500}
                    />
                  )}
                </div>
                <h1 className="text-white-900 capitalize font-bold text-xl leading-8 my-1">
                  {userData.username}
                </h1>
                <h3 className="text-white-600 font-lg text-semibold leading-6">
                  Owner at Her Company Inc.
                </h3>
                <p className="text-sm text-white-500 hover:text-white-600 leading-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, eligendi dolorum sequi illum qui unde
                  aspernatur non deserunt
                </p>
                <ul className=" text-white-600 hover:text-white-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="bg-custom-indigo py-1 px-2 rounded text-white text-sm">
                        Problem Solver
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">Nov 07, 2016</span>
                  </li>
                </ul>
              </div>
              <div className="my-4"></div>
              <div className=" p-3 hover:shadow">
                <div className="flex items-center space-x-3 font-semibold text-white-900 text-xl leading-8">
                  <span className="text-custom-indigo">
                    <svg
                      className="h-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </span>
                  <span>Similar Profiles</span>
                </div>
                <div className="grid grid-cols-3">
                 </div>
              </div>
            </div>
            <div className="w-full md:w-9/12 mx-2 h-64">
              <div className=" p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-white-900 leading-8">
                  <span className="text-custom-indigo">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-whie-700">
                  <div className="grid md:grid-cols-3 grid-cols-2 text-sm">
                    <div>
                      <label>Easy :</label>
                        <RingProgress
                          sections={[{ value: 40, color: 'green' }]}
                          label={
                          <Text color="green" weight={700} align="center" size="xl">
                          40%
                          </Text>
                         }
                        />
                    </div>
                    <div>
                    <label>Medium :</label>
                        <RingProgress
                          sections={[{ value: 40, color: 'yellow' }]}
                          label={
                          <Text color="yellow" weight={700} align="center" size="xl">
                          40%
                          </Text>
                         }
                        />
                    </div>
                    <div>
                    <label>Hard :</label>
                        <RingProgress
                          sections={[{ value: 40, color: 'red' }]}
                          label={
                          <Text color="red" weight={700} align="center" size="xl">
                          40%
                          </Text>
                         }
                        />
                    </div>
                  
                                            
                                     
                  </div>
                </div>
                {/* <button className="block w-full text-custom-indigo text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                  Show Full Information
                </button> */}
              </div>

              <div className="my-4"></div>
              <div className=" p-3 shadow-sm rounded-sm">
                <div className="grid grid-cols-1">
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-white-900 leading-8 mb-3">
                      <span className="text-custom-indigo">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">Check Your Daily Progress</span>
                    </div>

                    <div className="">
                    <AreaChart
                        width={isMobile ? 300 : 900}
                        height={250}
                        data={item}
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
                        <XAxis dataKey="name" />

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
                          dataKey="uv"
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


              <div className="p-3 shadow-sm rounded-sm">
                <div className="grid grid-cols-1">
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-white-900 leading-8 mb-3">
                      <span className="text-custom-indigo">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">Your Recent Submissions</span>
                    </div>

                    <section className="  container font-mono scrollbar-hide">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg scrollbar-hide">
        <div className="w-full overflow-x-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-500 bg-slate-800 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Result</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Language</th>
                <th className="px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800">
              {/* {props.submissionList !== null && listRowHandler()} */}
            </tbody>
          </table>
          {/* {props.submissionList === null && (
            <div className="text-center w-full">
              <p className="text-white font-bold text-2xl p-4">
                <Loading type="points-opacity" size="xl" />
              </p>
            </div>
          )} */}
            <div className="text-center w-full">
              <p className="text-white p-4 font-bold text-2xl">
                No Submissions
              </p>
            </div>
        </div>
      </div>
    </section>
                  </div>
                </div>
              </div>
















              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

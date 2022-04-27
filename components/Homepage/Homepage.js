import Image from "next/image";
import ms from "../../public/ms.png";
import cal from "../../public/calendar.png";
import hero from "../../public/hero.png";
import SmoothList from "react-smooth-list";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import { MdLeaderboard } from "react-icons/md";
import { GiLightningShield } from "react-icons/gi";
import { FaBlog } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import himanshu from "../../public/himanshu.jpeg";
import mohit from "../../public/mohit.jpg";
import akshat from "../../public/akshat.jpeg";

import Feature from "../Features/Feature";
import Link from "next/link";

export default function Homepage() {
  return (
    <>
      <div className="relative p-10 md:p-3 space-y-8 container mx-auto max-w-screen-xl flex-col justify-center items-center">
        <Zoom>
          <div className="absolute hidden md:block opacity-70 top-[10rem] right-[30rem]">
            <Image
              src={ms}
              width={100}
              height={100}
              className="object-contain"
              alt="message image"
            />
          </div>
        </Zoom>
        <Zoom>
          <div className="absolute hidden md:block  opacity-70 top-[10rem] right-[4rem]">
            <Image
              src={cal}
              width={100}
              height={100}
              className="object-contain"
              alt="calendar image"
            />
          </div>
        </Zoom>
        <div className="container md:px-4 sm:px-8  mx-auto md:h-[1100px] h-[650px] ">
          <div className="hero-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start  md:items-center lg:mt-[8rem] sm:mt[5rem]">
            <div className="hero-text col-span-6 ">
              <SmoothList>
                <h1 className="text-5xl lg:block hidden max-w-xl text-white leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#AE67FA] to-[#F49867] font-light font-lato">
                  Welcome to DirtyBits
                </h1>
                {/* For Mobile */}
                <h1 className="text-3xl md:hidden text-white leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#AE67FA] to-[#F49867] font-light font-lato text-center">
                  Welcome to DirtyBits
                </h1>
              </SmoothList>
              <SmoothList>
                <span className="block text-center md:text-left text-white font-light xl:block mt-5 text-xl md:text-4xl tracking-wider font-lato">
                  Be a Coder with us.
                </span>
              </SmoothList>
              <SmoothList>
                <p className="mt-3 text-base text-center md:text-left text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-lato">
                  First, solve the problem. Then, write the code.
                </p>
              </SmoothList>
              <SmoothList>
                <div className="mt-8 flex justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link href="/problemset">
                      <a className="w-full flexContainer px-8 py-3 border border-transparent text-base   rounded-full font-light text-black bg-white hover:opacity-70 hover:text-black md:py-4 md:text-lg md:px-10 shadow-xl shadow-white/20 transition-all ease-in-out duration-400 active:ring-4 active:ring-white/50">
                        Explore Now
                      </a>
                    </Link>
                  </div>
                </div>
              </SmoothList>

              <Zoom>
                <div className="md:hidden">
                  <Image
                    className=""
                    src={hero}
                    alt="hero section image"
                    width={600}
                    height={700}
                    priority
                    placeholder="blur"
                  />
                </div>
              </Zoom>
            </div>

            <div className="hero-image col-span-6 md:block hidden">
              <Zoom>
                <div className="">
                  <Image
                    className="cartoon"
                    src={hero}
                    alt="hero section image"
                    width={550}
                    height={650}
                    priority
                    placeholder="blur"
                  />
                </div>
              </Zoom>
            </div>
          </div>
        </div>
        <div className="w-full  h-full  sm:px-8  mx-auto md:h-[1100px] ">
          <div className="space-y-16">
            <div className="text-center sm:space-y-10 lg:space-y-16">
              <div className="flex space-x-2 justify-center items-center font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white capitalize">
                <h2 className="">Coding</h2>
                <span className="text-custom-indigo tracking-wider">
                  Platform
                </span>{" "}
              </div>
              <p className="mt-2 text-base leading-8 font-bold tracking-tight text-white sm:text-2xl text-center font-lato">
                Platform To Enhance Your Skills
              </p>
              <p className="mt-4 lg:text-lg text- text-center text-gray-500 lg:mx-auto">
                SOME FEATURES
              </p>
            </div>
            {/* <div className="flex lg:flex-row lg:justify-center lg:items-center lg:space-x-20"> */}
            <div className="grid lg:grid-cols-3 space-y-9 grid-rows-4 lg:space-y-0 md:justify-evenly  gap-16">
              <Zoom>
                <div className="">
                  <Feature
                    name="Fast Judge Server"
                    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it"
                    colorString="from-indigo-500 via-purple-500 to-pink-500"
                    icon={<GiLightningShield />}
                    borderColor="border-[#BF50D6]"
                  />
                </div>
              </Zoom>

              <Zoom>
                <div>
                  <Feature
                    name="Create your Blog"
                    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it"
                    icon={<FaBlog />}
                    colorString="from-orange-700 via-orange-600 to-pink-400"
                    borderColor="border-[#EF6458]"
                  />
                </div>
              </Zoom>
              <Zoom>
                <div>
                  <Feature
                    name="Leaderboard"
                    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it"
                    icon={<MdLeaderboard />}
                    colorString="from-green-400 via-green-500 to-lime-300"
                    borderColor="border-[#7EDF61]"
                  />
                </div>
              </Zoom>
              <Zoom>
                <div>
                  <Feature
                    name="Add Problems"
                    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it"
                    icon={<FiLayers />}
                    colorString="from-indigo-600 via-indigo-500 to-sky-300"
                    borderColor="border-custom-indigo"
                  />
                </div>
              </Zoom>
            </div>
          </div>
        </div>

        <div className="py-12 xs:h-[1500px] md:h-[900px] ">
          <div className="">
            <section className=" mx-auto sm:px-6 space-y-20">
              <div className="text-center pb-12">
                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white capitalize">
                  Check our Awesome{" "}
                  <span className="text-custom-indigo">team</span>
                </h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <Fade bottom>
                  <div className="rounded-lg shadow-lg flex md:p-12 p-5 flex-col justify-center items-center">
                    <div className="mb-8 round p-1 border-2 border-custom-indigo rounded-full">
                      <Image
                        className="object-center object-cover rounded-full"
                        src={himanshu}
                        alt="photo"
                        height={150}
                        width={150}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-xl text-white font-bold mb-2">
                        Himanshu Dhiman
                      </p>
                      <p className="text-base text-slate-400 font-extrabold">
                        Backend Developer / DevOps
                      </p>
                    </div>
                  </div>
                </Fade>

                <Fade bottom>
                  <div className=" rounded-lg shadow-lg md:p-12 p-5 flex flex-col justify-center items-center">
                    <div className="mb-8 p-1 border-2 border-custom-indigo rounded-full">
                      <Image
                        className="object-center object-cover rounded-full"
                        src={mohit}
                        alt="photo"
                        height={150}
                        width={150}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-xl text-white font-bold mb-2">
                        Mohit Singh Bisht
                      </p>
                      <p className="text-base text-slate-400 font-extrabold">
                        Frontend Developer / DevOps
                      </p>
                    </div>
                  </div>
                </Fade>

                <Fade bottom>
                  <div className=" rounded-lg shadow-lg md:p-12 p-5 flex flex-col justify-center items-center">
                    <div className="mb-8 p-1 border-2 border-custom-indigo rounded-full">
                      <Image
                        className="object-center object-cover rounded-full"
                        src={akshat}
                        alt="photo"
                        height={150}
                        width={150}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-xl text-white font-bold mb-2">
                        Akshat Jindal
                      </p>
                      <p className="text-base text-slate-400 font-extrabold">
                        Backend Developer
                      </p>
                    </div>
                  </div>
                </Fade>
              </div>
            </section>
          </div>
        </div>

        <div className="">
          <div className="">
            <div className="text-center font-semibold">
              <h1 className="text-5xl">
                <span className="text-custom-indigo tracking-wide">
                  Flexible{" "}
                </span>
                <span>Plans</span>
              </h1>
              <p className="pt-6 text-xl text-gray-400 font-normal w-full px-8 md:w-full">
                Choose a plan that works best for you and
                <br /> your team.
              </p>
            </div>

            <div className="my-16 sm:flex flex-wrap justify-around items-center gap-8">
              <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-slate-400 mt-6 shadow-lg rounded-lg">
                <div className="px-6 py-8 sm:p-10 sm:pb-6">
                  <div className="flex justify-center">
                    <span className="inline-flex px-4 py-1 rounded-full text-sm leading-5 font-semibold tracking-wide uppercase">
                      Basic
                    </span>
                  </div>
                  <div className="mt-4 flex justify-center text-6xl leading-none font-extrabold">
                    $0
                    <span className="ml-1 pt-8 text-2xl leading-8 font-medium text-gray-500">
                      /month
                    </span>
                  </div>
                </div>
                <p className="text-md mt-4">Plan include :</p>
                <ul className="text-sm w-full mt-6 mb-6">
                  <li className="mb-3 flex items-center ">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="green"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    All illimited components
                  </li>
                  <li className="mb-3 flex items-center ">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="green"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Own custom Tailwind styles
                  </li>
                  <li className="mb-3 flex items-center ">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="green"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Unlimited Templates
                  </li>
                  <li className="mb-3 flex items-center ">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="green"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Free premium dashboard
                  </li>
                  <li className="mb-3 flex items-center ">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="green"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Best ranking
                  </li>
                  <li className="mb-3 flex items-center opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      className="h-6 w-6 mr-2"
                      fill="red"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Premium svg
                  </li>
                </ul>
                <button
                  type="button"
                  className="w-full px-3 py-3 text-sm shadow rounded-lg text-indigo-500 hover:text-white bg-white hover:bg-indigo-500 transition-colors duration-700 transform"
                >
                  Continue
                </button>
              </div>

              <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-indigo-500 text-white mt-6 shadow-lg rounded-lg">
                <div className="px-6 py-8 sm:p-10 sm:pb-6">
                  <div className="flex justify-center">
                    <span className="inline-flex px-4 py-1 rounded-full text-sm leading-5 font-semibold tracking-wide uppercase">
                      Popular
                    </span>
                  </div>
                  <div className="mt-4 flex justify-center text-6xl leading-none font-extrabold">
                    $0
                    <span className="ml-1 pt-8 text-2xl leading-8 font-medium text-gray-100">
                      /month
                    </span>
                  </div>
                </div>
                <p className="text-md mt-4">Plan include :</p>
                <ul className="text-sm w-full mt-6 mb-6">
                  <li className="mb-3 flex items-center ">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    All illimited components
                  </li>
                  <li className="mb-3 flex items-center ">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Own custom Tailwind styles
                  </li>
                  <li className="mb-3 flex items-center ">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Unlimited Templates
                  </li>
                  <li className="mb-3 flex items-center ">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Free premium dashboard
                  </li>
                  <li className="mb-3 flex items-center ">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Best ranking
                  </li>
                  <li className="mb-3 flex items-center opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      className="h-6 w-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Premium svg
                  </li>
                </ul>
                <button
                  type="button"
                  className="w-full px-3 py-3 text-sm shadow rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-700 transform"
                >
                  Continue
                </button>
              </div>

              <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-slate-400 mt-6 shadow-lg rounded-lg">
                <div className="px-6 py-8 sm:p-10 sm:pb-6">
                  <div className="flex justify-center">
                    <span className="inline-flex px-4 py-1 rounded-full text-sm leading-5 font-semibold tracking-wide uppercase">
                      Premium
                    </span>
                  </div>
                  <div className="mt-4 flex justify-center text-6xl leading-none font-extrabold">
                    $0
                    <span className="ml-1 pt-8 text-2xl leading-8 font-medium text-gray-500">
                      /month
                    </span>
                  </div>
                </div>
                <p className="text-md mt-4">Plan include :</p>
                <ul className="text-sm w-full mt-6 mb-6">
                  <li className="mb-3 flex items-center ">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="green"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    All illimited components
                  </li>
                  <li className="mb-3 flex items-center ">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="green"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Own custom Tailwind styles
                  </li>
                  <li className="mb-3 flex items-center ">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="green"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Unlimited Templates
                  </li>
                  <li className="mb-3 flex items-center ">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="green"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Free premium dashboard
                  </li>
                  <li className="mb-3 flex items-center ">
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="green"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Best ranking
                  </li>
                  <li className="mb-3 flex items-center opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      className="h-6 w-6 mr-2"
                      fill="red"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Premium svg
                  </li>
                </ul>
                <button
                  type="button"
                  className="w-full px-3 py-3 text-sm shadow rounded-lg text-indigo-500 hover:text-white bg-white hover:bg-indigo-500 transition-colors duration-700 transform"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import Image from "next/image";
import ms from "../../public/ms.png";
import cal from "../../public/calendar.png";
import hero from "../../public/hero.png";
import SmoothList from "react-smooth-list";
import Zoom from "react-reveal/Zoom";
import Reveal from "react-reveal/Reveal";
import Fade from "react-reveal/Fade";
import { ArrowForward, Check } from "@mui/icons-material";
import { MdLeaderboard } from "react-icons/md";
import { GiLightningShield } from "react-icons/gi";
import { FaBlog } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import himanshu from "../../public/himanshu.jpeg";
import mohit from "../../public/mohit.jpg";
import akshat from "../../public/akshat.jpeg";
import { Loading, Button } from "@nextui-org/react";
import Feature from "../Feature";

export default function Homepage() {
  return (
    <>
      <div className="relative space-y-8 container p-10 mx-auto max-w-screen-xl flex-col justify-center items-center">
        <Zoom>
          <div className="absolute hidden md:block opacity-70 top-[10rem] right-[30rem]">
            <Image
              src={ms}
              width={100}
              height={100}
              className="object-contain"
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
            />
          </div>
        </Zoom>
        <div className="container px-4 sm:px-8 xl:px-20 mx-auto md:h-[1100px] h-[650px]">
          <div className="hero-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start  md:items-center lg:mt-[8rem] sm:mt[5rem]">
            <div className="hero-text col-span-6 ">
              <SmoothList>
                <h1 className="text-4xl md:text-5xl lg:text-5xl max-w-xl text-white leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#AE67FA] to-[#F49867] font-light font-lato">
                  Welcome to DirtyBits
                </h1>
              </SmoothList>
              <SmoothList>
                <span className="block text-white font-light xl:block mt-5 text-xl md:text-4xl tracking-wider font-lato">
                  Be a Coder with us.
                </span>
              </SmoothList>
              <SmoothList>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-lato">
                  First, solve the problem. Then, write the code.
                </p>
              </SmoothList>
              <SmoothList>
                <div className="mt-8 flex justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="/problemset"
                      className="w-full flexContainer px-8 py-3 border border-transparent text-base   rounded-full font-light text-black bg-white hover:opacity-70 hover:text-black md:py-4 md:text-lg md:px-10 shadow-xl shadow-white/20 transition-all ease-in-out duration-400 active:ring-4 active:ring-white/50"
                    >
                      Explore Now
                    </a>
                  </div>
                </div>
              </SmoothList>
            </div>

            <div className="hero-image col-span-6 md:block hidden">
              <Zoom>
                <div className="">
                  <Image
                    className="cartoon"
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
          </div>
        </div>
        <div className="w-full mt-[20rem] h-full  sm:px-8 xl:px-20 mx-auto md:h-[1100px] p-4 px-4">
          <div className="space-y-16">
            <div className="lg:text-center text-center sm:space-y-10 lg:space-y-16">
              <h2 className="font-bold text-xl md:text-4xl lg:text-5xl font-heading text-white capitalize">
                Online{" "}
                <span className="text-custom-indigo tracking-wider">
                  Coding
                </span>{" "}
                Platform
              </h2>
              <p className="mt-2 text-base leading-8 font-bold tracking-tight text-white sm:text-2xl text-center font-lato">
                Platform To Enhance Your Skills
              </p>
              <p className="mt-4 lg:text-lg text- text-center text-gray-500 lg:mx-auto">
                SOME FEATURES
              </p>
            </div>
            {/* <div className="flex lg:flex-row lg:justify-center lg:items-center lg:space-x-20"> */}
            <div className="grid lg:grid-cols-3 space-y-9 grid-rows-3 lg:space-y-0 justify-evenly gap-16">
              <Zoom>
                <div>
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

        <div className="py-12 h-[700px]">
          <div className="">
            <section className=" mx-auto px-4 sm:px-6 lg:px-4 py-12 space-y-20">
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

        <div className="hidden lg:block">
          <body className="font-sans">
            <div className="min-h-screen flex justify-center items-center">
              <div>
                <Fade bottom>
                  <div className="text-center font-semibold">
                    <h1 className="text-5xl">
                      <span className="font-bold  text-3xl md:text-4xl lg:text-5xl font-heading text-custom-indigo tracking-wider capitalize">
                        Flexible{" "}
                      </span>
                      <span className="text-white font-bold">Plans</span>
                    </h1>
                    <p className="pt-6 text-xl text-gray-400 font-normal w-full px-8 md:w-full">
                      Choose a plan that works best for you.
                      <br />
                    </p>
                  </div>
                </Fade>
                <Zoom>
                  <div className="pt-24 flex lg:flex-row">
                    <div className="w-96 p-8 bg-white text-center rounded-3xl pr-16 shadow-xl opacity-50 cursor-not-allowed">
                      <h1 className="text-black font-semibold text-2xl">
                        Basic
                      </h1>
                      <p className="pt-2 tracking-wide">
                        <span className="text-gray-400 align-top">Rs. </span>
                        <span className="text-3xl font-semibold">0</span>
                        <span className="text-gray-400 font-medium">
                          / user
                        </span>
                      </p>
                      <hr className="mt-4 border-1" />
                      <div className="pt-8">
                        <p className="font-semibold text-gray-400 text-left">
                          <span className="material-icons align-middle">
                            <Check />
                          </span>
                          <span className="pl-2">
                            User Profile{" "}
                            <span className="text-black">access</span>
                          </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                          <span className="material-icons align-middle">
                            <Check />
                          </span>
                          <span className="pl-2">
                            Add Problems{" "}
                            <span className="text-black">access</span>
                          </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                          <span className="material-icons align-middle">
                            <Check />
                          </span>
                          <span className="pl-2">
                            <span className="text-black">Dashboard</span> access
                          </span>
                        </p>

                        <a href="#" className="cursor-not-allowed">
                          <p className="w-full py-4 bg-custom-indigo mt-8 rounded-xl text-white">
                            <span className="font-medium">Choose Plan</span>
                            <span className="pl-2 material-icons align-middle text-sm">
                              <ArrowForward />
                            </span>
                          </p>
                        </a>
                      </div>
                    </div>
                    <div className="w-80 p-8 bg-gray-900 text-center rounded-3xl text-white border-4 shadow-xl border-white transform scale-125">
                      <h1 className="text-white font-semibold text-2xl">
                        Startup
                      </h1>
                      <p className="pt-2 tracking-wide">
                        <span className="text-gray-400 align-top">Rs </span>
                        <span className="text-3xl font-semibold">1</span>
                        <span className="text-gray-400 font-medium">
                          / user
                        </span>
                      </p>
                      <hr className="mt-4 border-1 border-gray-600" />
                      <div className="pt-8">
                        <p className="font-semibold text-gray-400 text-left">
                          <span className="material-icons align-middle">
                            <Check />
                          </span>
                          <span className="pl-2">
                            User Profile{" "}
                            <span className="text-white">access</span>
                          </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                          <span className="material-icons align-middle">
                            <Check />
                          </span>
                          <span className="pl-2">
                            Add Problems{" "}
                            <span className="text-white">access</span>
                          </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                          <span className="material-icons align-middle">
                            <Check />
                          </span>
                          <span className="pl-2">
                            <span className="text-white">Dashboard</span> access
                          </span>
                        </p>

                        <a href="#" className="">
                          <p className="w-full py-4 bg-custom-indigo mt-8 rounded-xl text-white">
                            <span className="font-medium">Choose Plan</span>
                            <span className="pl-2 material-icons align-middle text-sm">
                              <ArrowForward />
                            </span>
                          </p>
                        </a>
                      </div>
                      <div className="absolute top-4 right-4">
                        <p className="bg-indigo-800 font-semibold px-4 py-1 rounded-full uppercase text-xs">
                          Popular
                        </p>
                      </div>
                    </div>
                    <div className="w-96 p-8 opacity-50 bg-white text-center rounded-3xl pl-16 shadow-xl cursor-not-allowed">
                      <h1 className="text-black font-semibold text-2xl">
                        Enterprise
                      </h1>
                      <p className="pt-2 tracking-wide">
                        <span className="text-gray-400 align-top">Rs </span>
                        <span className="text-3xl font-semibold">0</span>
                        <span className="text-gray-400 font-medium">
                          / user
                        </span>
                      </p>
                      <hr className="mt-4 border-1" />
                      <div className="pt-8">
                        <p className="font-semibold text-gray-400 text-left">
                          <span className="material-icons align-middle">
                            <Check />
                          </span>
                          <span className="pl-2">
                            User Profile{" "}
                            <span className="text-black">access</span>
                          </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                          <span className="material-icons align-middle">
                            <Check />
                          </span>
                          <span className="pl-2">
                            Add Problems{" "}
                            <span className="text-black">access</span>
                          </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                          <span className="material-icons align-middle">
                            <Check />
                          </span>
                          <span className="pl-2">
                            <span className="text-black">Dashboard</span> access
                          </span>
                        </p>

                        <a href="#" className="cursor-not-allowed">
                          <p className="w-full py-4 bg-custom-indigo mt-8 rounded-xl text-white">
                            <span className="font-medium">Choose Plan</span>
                            <span className="pl-2 material-icons align-middle text-sm">
                              <ArrowForward />
                            </span>
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                </Zoom>
              </div>
            </div>
          </body>
        </div>
      </div>
    </>
  );
}

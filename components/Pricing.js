import { ArrowForward, Check } from "@mui/icons-material";
import React from "react";

function Pricing() {
  return (
    <div className="hidden lg:block">
      <body className="font-sans">
        <div className="min-h-screen flex justify-center items-center">
          <div className="">
            <div className="text-center font-semibold">
              <h1 className="text-5xl">
                <span className="text-custom-yellow tracking-wide">
                  Flexible{" "}
                </span>
                <span className="text-white">Plans</span>
              </h1>
              <p className="pt-6 text-xl text-gray-400 font-normal w-full px-8 md:w-full">
                Choose a plan that works best for you.
                <br />
              </p>
            </div>
            <div className="pt-24 flex lg:flex-row">
              <div className="w-96 p-8 bg-white text-center rounded-3xl pr-16 shadow-xl opacity-50 cursor-not-allowed">
                <h1 className="text-black font-semibold text-2xl">Basic</h1>
                <p className="pt-2 tracking-wide">
                  <span className="text-gray-400 align-top">Rs. </span>
                  <span className="text-3xl font-semibold">0</span>
                  <span className="text-gray-400 font-medium">/ user</span>
                </p>
                <hr className="mt-4 border-1" />
                <div className="pt-8">
                  <p className="font-semibold text-gray-400 text-left">
                    <span className="material-icons align-middle">
                      <Check />
                    </span>
                    <span className="pl-2">
                      User Profile <span className="text-black">access</span>
                    </span>
                  </p>
                  <p className="font-semibold text-gray-400 text-left pt-5">
                    <span className="material-icons align-middle">
                      <Check />
                    </span>
                    <span className="pl-2">
                      Add Problems <span className="text-black">access</span>
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
                    <p className="w-full py-4 bg-custom-yellow mt-8 rounded-xl text-white">
                      <span className="font-medium">Choose Plan</span>
                      <span className="pl-2 material-icons align-middle text-sm">
                        <ArrowForward />
                      </span>
                    </p>
                  </a>
                </div>
              </div>
              <div className="w-80 p-8 bg-gray-900 text-center rounded-3xl text-white border-4 shadow-xl border-white transform scale-125">
                <h1 className="text-white font-semibold text-2xl">Startup</h1>
                <p className="pt-2 tracking-wide">
                  <span className="text-gray-400 align-top">$ </span>
                  <span className="text-3xl font-semibold">24</span>
                  <span className="text-gray-400 font-medium">/ user</span>
                </p>
                <hr className="mt-4 border-1 border-gray-600" />
                <div className="pt-8">
                  <p className="font-semibold text-gray-400 text-left">
                    <span className="material-icons align-middle">
                      <Check />
                    </span>
                    <span className="pl-2">
                      User Profile <span className="text-black">access</span>
                    </span>
                  </p>
                  <p className="font-semibold text-gray-400 text-left pt-5">
                    <span className="material-icons align-middle">
                      <Check />
                    </span>
                    <span className="pl-2">
                      Add Problems <span className="text-black">access</span>
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
                    <p className="w-full py-4 bg-custom-yellow mt-8 rounded-xl text-white">
                      <span className="font-medium">Choose Plan</span>
                      <span className="pl-2 material-icons align-middle text-sm">
                        <ArrowForward />
                      </span>
                    </p>
                  </a>
                </div>
                <div className="absolute top-4 right-4">
                  <p className="bg-custom-yellow2 font-semibold px-4 py-1 rounded-full uppercase text-xs">
                    Popular
                  </p>
                </div>
              </div>
              <div className="w-96 p-8 opacity-50 bg-white text-center rounded-3xl pl-16 shadow-xl cursor-not-allowed">
                <h1 className="text-black font-semibold text-2xl">
                  Enterprise
                </h1>
                <p className="pt-2 tracking-wide">
                  <span className="text-gray-400 align-top">$ </span>
                  <span className="text-3xl font-semibold">35</span>
                  <span className="text-gray-400 font-medium">/ user</span>
                </p>
                <hr className="mt-4 border-1" />
                <div className="pt-8">
                  <p className="font-semibold text-gray-400 text-left">
                    <span className="material-icons align-middle">
                      <Check />
                    </span>
                    <span className="pl-2">
                      User Profile <span className="text-black">access</span>
                    </span>
                  </p>
                  <p className="font-semibold text-gray-400 text-left pt-5">
                    <span className="material-icons align-middle">
                      <Check />
                    </span>
                    <span className="pl-2">
                      Add Problems <span className="text-black">access</span>
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
                    <p className="w-full py-4 bg-custom-yellow mt-8 rounded-xl text-white">
                      <span className="font-medium">Choose Plan</span>
                      <span className="pl-2 material-icons align-middle text-sm">
                        <ArrowForward />
                      </span>
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Pricing;

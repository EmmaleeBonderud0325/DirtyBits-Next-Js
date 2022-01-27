import { MdLeaderboard } from "react-icons/md";
import { GiLightningShield } from "react-icons/gi";
import { FaBlog } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";

import Feature from "./Feature";
import Zoom from "react-reveal/Zoom";

export default function Features() {
  return (
    <div className="relative py-12 lg:mt-50 w-screen h-[1024px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center space-y-10">
          <h2 className="text-base lg:text-2xl text-center text-custom-indigo font-semibold tracking-wide uppercase">
            Online Coding Platform
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-white sm:text-2xl text-center uppercase">
            Platform To Enhance Your Skills
          </p>
          <p className="mt-4 max-w-2xl lg:text-xl text-base text-center text-gray-500 lg:mx-auto">
            SOME FEATURES
          </p>
        </div>
        {/* <div className="flex lg:flex-row lg:justify-center lg:items-center lg:space-x-20"> */}
        <div className="grid lg:grid-cols-3 lg:gap-32 grid-rows-3">
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
  );
}

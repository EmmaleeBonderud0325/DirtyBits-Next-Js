import Image from "next/image";
import ms from "../public/ms.png";
import cal from "../public/calendar.png";
import hero from "../public/hero.png";

export default function Hero() {
  return (
    <>
      <div className="relative min-h-screen h-[824px] w-screen customHero  overflow-hidden">
        <div className="relative space-y-8 container p-10 mx-auto max-w-screen-xl flex justify-center items-center">
          {/* <div className="absolute top-[2rem] right-[14rem] opacity-70">
          </div> */}
          <div className="absolute top-[1rem] left-[44rem] opacity-70">
            <Image
              src={ms}
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <div className="absolute top-[6rem] right-[1rem] opacity-70">
            <Image
              src={cal}
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <div className="z-10">
            <main className="">
              <h1 className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#AE67FA] to-[#F49867]">
                Welcome to DirtyBits
              </h1>
              <span className="block text-white font-light xl:block mt-5 text-4xl tracking-wider">
                Be a Coder with us.
              </span>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                First, solve the problem. Then, write the code.
              </p>
              <div className="mt-8 flex justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="/problemset"
                    className="w-full flexContainer  px-8 py-3 border border-transparent text-base   rounded-full font-semibold text-black bg-white hover:opacity-70 hover:text-black md:py-4 md:text-lg md:px-10 shadow-xl shadow-white/20 transition-all ease-in-out duration-400 active:ring-4 active:ring-white/50"
                  >
                    Explore Now
                  </a>
                </div>
              </div>
            </main>
          </div>

          <div className="flex-1 flex justify-end">
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
        </div>
      </div>
    </>
  );
}

import hero from "../public/cartoon1.jpeg";
import Image from "next/image";
import Typewriter from "typewriter-effect";

export default function Hero() {
  return (
    <>
      <div className="relative bg-purple-400 h-screen w-screen customHero">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-black-400 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* <polygon points="50,0 100,0 50,100 0,100" /> */}
            </svg>
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-thin text-gray-900 sm:text-xs md:text-6xl">
                  <span className="block xl:block font-semibold text-custom-indigo lg:text-5xl md:text-3xl tracking-wider">
                    <Typewriter
                      options={{ loop: true }}
                      onInit={(typewriter) => {
                        typewriter
                          .typeString("Hello Coders")
                          .pauseFor(1500)
                          .deleteAll();
                        typewriter
                          .typeString("Learn Coding with us")
                          .pauseFor(1500)
                          .deleteAll();
                        typewriter
                          .typeString("Start your journey now")
                          .pauseFor(1500)
                          .deleteAll()
                          .start();
                      }}
                    />
                  </span>{" "}
                  <span className="block text-white font-light xl:block mt-5 text-4xl tracking-wider">
                    Be a Coder with us.
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  First, solve the problem. Then, write the code.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="/problemset"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-custom-indigo hover:bg-indigo-600 hover:text-white md:py-4 md:text-lg md:px-10 shadow-xl shadow-custom-indigo/40"
                    >
                      Explore Now
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 mt-40 mx-30 hidden sm:block">
          <Image
            className="h-100 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full cartoon"
            src={hero}
            alt="hero"
            width={500}
            height={500}
            priority
            placeholder="blur"
          />
        </div>
      </div>
    </>
  );
}

import React, { ReactElement } from "react";
import Image from "next/image";
import bg from "public/blog.jpeg";
import { motion } from "framer-motion";

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

function DetailView(): ReactElement {
  return (
    <div className="container mx-auto lg:p-10 p-6 w-full">
      <div className="flex flex-col space-y-9 lg:mx-56">
        <Image
          className="object-contain"
          src={bg}
          height={300}
          width={600}
          layout="responsive"
          alt="blog"
        />
        <motion.div animate={{ y: [20, 0, 0] }}>
          <header className="font-extrabold lg:text-5xl text-4xl w-full ">
            <h2 className="text-white text-center">
              Top 10 React JS Libraries + Bonus Tips
            </h2>
          </header>
        </motion.div>
        <div className="flex items-center space-x-2">
          <div className="rounded-full  p-1  border border-custom-yellow flex">
            <Image
              className="rounded-full object-cover"
              src={
                "https://lh3.googleusercontent.com/ogw/ADea4I5wIPGFJSysHMWa6CyMkW0ABbNxUasYYCCG2pZhpQ=s64-c-mo"
              }
              width={40}
              height={40}
              alt="avatar"
            />
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-custom-yellow font-semibold">Mohit Bisht</p>
            <p className="text-gray-400 flex space-x-2">
              <span>Nov 11 </span>
              <span>•</span>
              <span> 4 min read</span>
            </p>
            <p>asd</p>
          </div>
        </div>
        <motion.div initial="hidden" animate="visible" variants={variants}>
          <section className="font-semibold text-lg w-full">
            {/* MARKDOWN EDITOR VALUES */}
            So, in this article, you will come to know the variety of React JS
            component libraries that are excelling in terms of aspects
            comprising the design framework, user interface, components,
            utilities, animations, and the layout.
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export default DetailView;

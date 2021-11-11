import React from "react";
import Head from "next/head";
import Card from '../../components/Blog/Card'
import Topics from '../../components/Blog/Topics'
import {motion} from 'framer-motion'

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

function blogs() {
  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <div className="max-w-screen-xl p-5 container mx-auto flex flex-col items-start ">
      <motion.div animate={{ y: [20, 0, 0] }}>
        <h1 className="text-custom-bg mb-4 font-extrabold text-5xl">Blogs</h1>
        </motion.div>
        <hr/>
                <div className="grid lg:grid-cols-2">
                  <div className="flex flex-col items-center">
                  <motion.div  initial="hidden" animate="visible" variants={variants} >
                      <Card/>
                      <Card/>
                      <Card/>
                      <Card/>
                      <Card/>
                      <Card/>
                      <Card/>
                      <Card/>
                  </motion.div>
                  </div>
                  <motion.div  initial="hidden" animate="visible" variants={variants} >
                      <Topics/>
                  </motion.div>
                </div>


      
      </div>
    </>
  );
}

export default blogs;

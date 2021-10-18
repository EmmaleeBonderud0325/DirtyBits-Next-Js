import React from 'react'
import Hero from "../components/Hero";
import Head from 'next/head'
import Pricing from "../components/Pricing"

function index() {
  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>DirtyBits</title>
        <meta name="description" content="DirtyBits is the platform to help you enhance your skills, expand your knowledge and prepare for technical interviews."></meta>
      </Head>
      <Hero/>    
      <Pricing/>
    </div>
  )
}

export default index

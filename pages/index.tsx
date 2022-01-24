import React from "react";
import Hero from "../components/Hero";
import Head from "next/head";
import Pricing from "../components/Pricing";
import Features from "../components/Features";

function Index() {
  return (
    <>
      <Head>
        <title>DirtyBits</title>
        <meta
          name="description"
          content="DirtyBits is the platform to help you enhance your skills, expand your knowledge and prepare for technical interviews."
        ></meta>
      </Head>
      <Hero />
      <Features />
      <Pricing />
    </>
  );
}

export default Index;

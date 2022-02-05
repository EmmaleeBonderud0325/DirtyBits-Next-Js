import React, { ReactElement } from "react";
import Hero from "../components/Hero";
import Head from "next/head";
import Pricing from "../components/Pricing";
import Features from "../components/Features";
import Homepage from "../components/Homepage/Homepage";

function Index(): ReactElement {
  return (
    <>
      <Head>
        <title>DirtyBits</title>
        <meta
          name="description"
          content="DirtyBits is the platform to help you enhance your skills, expand your knowledge and prepare for technical interviews."
        ></meta>
      </Head>

      <Homepage />
      {/* <Hero /> */}
      {/* <Features /> */}
      {/* <Team/> */}
      {/* <Pricing /> */}
    </>
  );
}

export default Index;

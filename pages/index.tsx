import React, { ReactElement } from "react";
import Head from "next/head";
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
    </>
  );
}

export default Index;

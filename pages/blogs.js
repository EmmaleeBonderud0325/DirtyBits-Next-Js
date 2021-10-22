import React from "react";
import Head from "next/head";

function blogs() {
  return (
    <div className="flex lg:w-screen lg:h-screen h-screen w-screen">
      <Head>
        <title>Blogs</title>
      </Head>
      <h1 className="m-auto">Blogs Page</h1>
    </div>
  );
}

export default blogs;

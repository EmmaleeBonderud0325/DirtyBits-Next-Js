import React from "react";
import Head from "next/head";
import Card from '../components/Blog/Card'
import Topics from '../components/Blog/Topics'

function blogs() {
  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <div className="max-w-screen-xl p-5 container mx-auto flex flex-col items-start ">
        <h1 className="text-custom-bg mb-4 font-extrabold text-5xl">Blogs</h1>
        <hr/>
                <div className="grid lg:grid-cols-2">
                  <div className="flex flex-col items-center">
                      <Card/>
                      <Card/>
                      <Card/>
                      <Card/>
                      <Card/>
                      <Card/>
                      <Card/>
                      <Card/>
                  </div>
                      <Topics/>
                </div>


      
      </div>
    </>
  );
}

export default blogs;

import React, { useEffect } from "react";
import Head from "next/head";

function leaderboard() {
  return (
    <div className="flex lg:w-screen lg:h-screen h-screen w-screen">
      <Head>
        <title>Leaderboard</title>
      </Head>
      <h1 className="m-auto">Leaderboard</h1>
    </div>
  );
}

export default leaderboard;

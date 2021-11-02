import React, { useEffect } from "react";
import Head from "next/head";

function leaderboard() {
  useEffect(() => {
    var socket = new WebSocket("ws://db-code.herokuapp.com/ws/runcode/10/");
    socket.onopen = function (e) {
      console.log("opened");
    };
  }, []);
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

import React from "react";
import Terminal from "terminal-in-react";

function TerminalSimulator() {
  return (
    <div className="flex justify-center items-center">
      <Terminal
        color="white"
        backgroundColor="black"
        barColor="black"
        style={{
          fontWeight: "bold",
          fontSize: "1.3em",
          overflow: "hidden",
          borderRadius: "15px",
        }}
        commands={{
          explore: () =>
            "Explore the DirtyBits problem set by clicking the links above",
        }}
        descriptions={{
          "open-google": "opens google.com",
          showmsg: "shows a message",
          alert: "alert",
          popup: "alert",
        }}
        msg="Welcome To DirtyBits, type 'explore' to begin"
      />
    </div>
  );
}

export default TerminalSimulator;

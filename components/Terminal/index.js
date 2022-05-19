import React from "react";
import Terminal from "@joeashworth/react-animated-term";
import "@joeashworth/react-animated-term/dist/react-animated-term.css";

const spinner = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const termLines = [
  {
    text: "node dirtybits.js",
    cmd: true,
    delay: 80,
  },
  {
    text: "✔ Loaded Explore Now",
    cmd: false,
    repeat: true,
    repeatCount: 5,
    frames: spinner.map(function (spinner) {
      return {
        text: spinner + " Loading app",
        delay: 40,
      };
    }),
  },
];

const AnimatedTerminal = () => (
  <div className="mx-auto p-9 lg:w-1/2 xl:w-1/2">
    <Terminal lines={termLines} interval={80} height={440} />
  </div>
);

export default AnimatedTerminal;

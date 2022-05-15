import React from "react";

function Card({ child = "", color = "#fff" }) {
  return (
    <div
      className={`h-12 w-12 bg-[${color}]  overflow-hidden rounded-md flex items-center justify-center`}
    >
      <span className="text-sm text-black font-semibold">{child}</span>
    </div>
  );
}

export default Card;

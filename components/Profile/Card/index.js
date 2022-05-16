import React from "react";

function Card({ child, color = "fff" }) {
  return (
    <div
      style={{ backgroundColor: `#${color}` }}
      className={`h-12 w-12  overflow-hidden rounded-md flex items-center justify-center`}
    >
      <span className="text-sm text-black font-semibold">{child}</span>
    </div>
  );
}

export default Card;

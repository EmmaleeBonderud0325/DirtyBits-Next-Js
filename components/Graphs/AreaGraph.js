import React from "react";
import { XAxis, Tooltip, AreaChart, Area } from "recharts";

function AreaGraph({ isMobile, sub }) {
  return (
    <>
      <AreaChart
        width={isMobile ? 300 : 900}
        height={250}
        data={sub}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />

        <Tooltip
          cursor={false}
          contentStyle={{
            background: "black",
            color: "white",
            border: "none",
          }}
        />
        <Area
          type="monotone"
          dataKey="Questions Solved"
          stroke="#5476DA"
          fillOpacity={1}
          strokeWidth={5}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </>
  );
}

export default AreaGraph;

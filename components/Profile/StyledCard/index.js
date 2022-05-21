import { Text } from "@mantine/core";
import React from "react";

function StyledCard({ icon, label = "", value = "" }) {
  return (
    <div className="flex items-center gap-5">
      {icon}
      <div className="text-white">
        <span className="font-semibold text-2xl tracking-wider">{value}</span>
        <Text color="dimmed">{label}</Text>
      </div>
    </div>
  );
}

export default StyledCard;

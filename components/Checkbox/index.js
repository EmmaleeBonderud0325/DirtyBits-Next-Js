import { Checkbox, CheckboxGroup } from "@mantine/core";
import React from "react";

function CheckBox({ setDifficulty = () => {} }) {
  return (
    <div className="space-y-2">
      <CheckboxGroup
        label="Select Difficulty"
        defaultValue={[]}
        onChange={(e) => setDifficulty(e)}
      >
        <Checkbox value="E" label="Easy" />
        <Checkbox value="M" label="Medium" />
        <Checkbox value="H" label="Hard" />
      </CheckboxGroup>
    </div>
  );
}

export default React.memo(CheckBox);

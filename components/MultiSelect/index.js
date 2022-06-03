import React from "react";
import { MultiSelect } from "@mantine/core";

function CustomSelect({ tagsList = [], setTags = () => {} }) {
  return (
    <MultiSelect
      // @ts-ignore
      data={tagsList}
      className="w-full md:w-1/2"
      placeholder="Select Tags"
      searchable
      nothingFound="Nothing found"
      clearable
      onChange={(e) => setTags(e)}
      radius="xl"
    />
  );
}

export default React.memo(CustomSelect);

import React, {Dispatch, SetStateAction} from "react";
import { MultiSelect } from "@mantine/core";

function CustomSelect({ tagsList = [], setTags = () => {} }: {tagsList: string[], setTags: Dispatch<SetStateAction<any[]>>}) {
  return (
    <MultiSelect
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

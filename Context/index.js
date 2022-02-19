import React, { useEffect, createContext, useCallback } from "react";

import { getTagsApi } from "../components/api/apis";

export const Context = createContext();

function ContextProvider({ children }) {
  const [tags, setTags] = React.useState([]);

  const getTags = useCallback(async () => {
    try {
      const response = await getTagsApi("/");
      const parseData = response.data.results;
      let colourOptions = [];
      for (const data in parseData) {
        let tempData = { value: null, label: "", color: "" };
        tempData["value"] = parseData[data].id;
        tempData["label"] = parseData[data].name;
        tempData["color"] = "#4C0F89";
        colourOptions.push(tempData);
      }
      setTags(colourOptions);
    } catch (err) {
      console.error(err.message);
    }
  }, [tags]);

  useEffect(() => {
    console.log("context triggered");
    getTags();
  }, []);

  return <Context.Provider value={{ tags }}>{children}</Context.Provider>;
}

export default ContextProvider;

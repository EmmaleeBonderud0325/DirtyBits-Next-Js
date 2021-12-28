import React, { memo } from "react";

export const CONTEXT = React.createContext();

// NOTE:- ⚠️ NO USE FOR NOW
const ContextWrapper = ({ children }) => {
  return <CONTEXT.Provider value>{children}</CONTEXT.Provider>;
};

export default memo(ContextWrapper);

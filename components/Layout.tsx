import React, { useEffect } from "react";
import Navbar from "components/Navbar2.0";
import NextNProgress from "nextjs-progressbar";
import { NotificationsProvider } from "@mantine/notifications";
import { colors } from "constants/colors";

const layout = ({ children }) => {
  useEffect(() => {
    console.log("UseEffect Called");
  }, []);
  return (
    <>
      <NotificationsProvider position="top-right" zIndex={2077}>
        <NextNProgress height={2} color={colors.primary} />
        <Navbar />
        {children}
      </NotificationsProvider>
    </>
  );
};

export default layout;

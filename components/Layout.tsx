import React, { useEffect } from "react";
import { NotificationsProvider } from "@mantine/notifications";
import NextNProgress from "nextjs-progressbar";
import { colors } from "constants/colors";
import Navbar from "components/Navbar2.0";

const Layout = ({ children }) => {
  useEffect(() => {
    console.log("Layout called");
  }, []);
  return (
    <div>
      <NextNProgress height={2} color={colors.primary} />
      <NotificationsProvider position="top-right" zIndex={2077}>
        <Navbar />
        {children}
      </NotificationsProvider>
    </div>
  );
};

export default Layout;

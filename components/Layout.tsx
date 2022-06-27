import React, { useEffect } from "react";
import { NotificationsProvider } from "@mantine/notifications";
import NextNProgress from "nextjs-progressbar";
import { colors } from "constants/colors";
import Navbar from "components/Navbar2.0";
import { useAppDispatch } from "app/hooks";
import { getUserData } from "features/UserData";

const Layout = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserData());
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

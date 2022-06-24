import "@fontsource/space-grotesk";
import type { AppProps } from "next/app";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { MantineProvider } from "@mantine/core";
import NextNProgress from "nextjs-progressbar";
import { NotificationsProvider } from "@mantine/notifications";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "app/store";

import { colors } from "constants/colors";
import Context from "../Context";
import theme from "theme/theme";
import Navbar from "components/Navbar2.0";

import "react-quill/dist/quill.snow.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css";
import "styles/Profile/profile.css";
import "../styles/tinymce.css";
import "../styles/Editor.css";
import "../styles/index.css";

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

function MyApp({ Component, pageProps }: Props) {
  const router = useRouter();
  if (typeof window !== "undefined" && router.pathname === "/") {
    window.addEventListener("scroll", () => {
      let nav = document.getElementById("glassNavbar");
      if (nav) {
        nav.classList.toggle("scrolling-active", window.scrollY > 0);
      } else {
        return;
      }
    });
  }

  if (Component.getLayout) {
    return Component.getLayout(
      <MantineProvider theme={theme}>
        <NotificationsProvider position="top-right" zIndex={2077}>
          <NextNProgress height={2} color={colors.primary} />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </NotificationsProvider>
      </MantineProvider>
    );
  }

  return (
    <>
      <Context>
        <MantineProvider theme={theme}>
          <NotificationsProvider position="top-right" zIndex={2077}>
            <NextNProgress height={2} color={colors.primary} />
            <Provider store={store}>
              <Navbar />
              <Component {...pageProps} />
            </Provider>
          </NotificationsProvider>
        </MantineProvider>
      </Context>
    </>
  );
}

export default MyApp;

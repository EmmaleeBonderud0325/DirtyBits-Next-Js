import { createWrapper } from "next-redux-wrapper";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
// import Navbar from "../components/Navbar";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import { store } from "../redux/store";
import "../styles/index.css";
import { useRouter } from "next/router";
import "../styles/Editor.css";
import "../styles/tinymce.css";
import { NextPage } from "next";
import { ReactNode, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";
import NextNProgress from "nextjs-progressbar";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Button } from "@mantine/core";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import { useDispatch } from "react-redux";
import { notifyFirstLoad } from "../redux/actions";

import Context from '../Context'


type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

function MyApp({ Component, pageProps }: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(notifyFirstLoad());
  }, []);
  const router = useRouter();

  if (typeof window !== "undefined") {
    import("tw-elements/dist/js/index.min.js");
  }
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  let background: string;
  let fixedTop = "";
  let footer: JSX.Element;

  if (router.pathname === "/") {
    background = "bg-transparent-800 w-screen absolute z-50";
    footer = <Footer />;
  } else {
    background = "bg-black border-b-1 border-gray-500 w-screen z-50";
    fixedTop = "sticky top-0 z-50";
    footer = null;
  }
  return (
    <>
    <Context>

      <MantineProvider theme={{ colorScheme: "dark" }}>
        <NotificationsProvider position="top-right" zIndex={2077} color="red">
          <ChakraProvider theme={theme}>
            <NextNProgress height={2} color="#6366F1" />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="dark"
              pauseOnHover
            />
            {/* <Navbar fixedHeader={fixedTop} bg={background} /> */}
            <Navbar />
            <Component {...pageProps} />
          </ChakraProvider>
        </NotificationsProvider>
      </MantineProvider>
      {footer}
              </Context>
    </>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);

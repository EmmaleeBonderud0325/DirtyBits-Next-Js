import { createWrapper } from "next-redux-wrapper";
import type { AppProps } from 'next/app'

import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { store } from "../redux/store";
import "../styles/index.css";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import "../styles/Editor.css";
import "../styles/Steps.css";
import "../styles/tinymce.css";
import "../styles/Steps.css";
import { NextPage } from "next";
import { ReactNode } from "react";


type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
}

type Props = AppProps & {
  Component: Page;
}

function MyApp({ Component, pageProps }: Props) {
  if (typeof window !== "undefined") {
    import("tw-elements/dist/js/index.min.js");
  }
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  const router = useRouter();

  let background: string;
  
  let fixedTop = "";
  if (router.pathname === "/") {
    background = "bg-transparent-800 w-screen absolute z-50";
  } else {
    background = "bg-black border-b-1 border-gray-500 w-screen z-50";
    fixedTop = "sticky top-0 z-50";
  }
  return (
    <>
      <Navbar fixedHeader={fixedTop} bg={background} />
      <Component {...pageProps} />
    </>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);

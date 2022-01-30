import { createWrapper } from "next-redux-wrapper";
import type { AppProps } from 'next/app'
import { Toast } from 'primereact/toast';
import { ToastContainer } from 'react-toastify';
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { store } from "../redux/store";
import "../styles/index.css";
import { useRouter } from "next/router";
import "../styles/Editor.css";
import "../styles/tinymce.css";
import { NextPage } from "next";
import { ReactNode, useRef } from "react";
import { NextUIProvider } from '@nextui-org/react';
import 'react-toastify/dist/ReactToastify.css';

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
    <NextUIProvider>
      <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
theme="dark"
pauseOnHover/>
      <Navbar fixedHeader={fixedTop} bg={background} />
      <Component {...pageProps} />
    </NextUIProvider>
    </>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);

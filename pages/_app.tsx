import { createWrapper } from "next-redux-wrapper";
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { store } from "../redux/store";
import "../styles/index.css";
import { useRouter } from "next/router";
import "../styles/Editor.css";
import "../styles/tinymce.css";
import { NextPage } from "next";
import { ReactNode } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme/theme'

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
}

type Props = AppProps & {
  Component: Page;
}

function MyApp({ Component, pageProps }: Props) {
  const router = useRouter();
  
  if (typeof window !== "undefined") {
    import("tw-elements/dist/js/index.min.js");
  }
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

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
  <ChakraProvider theme={theme}>

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
</ChakraProvider>
    </>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);

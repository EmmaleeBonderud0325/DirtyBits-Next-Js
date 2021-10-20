import { createWrapper } from "next-redux-wrapper";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { store } from "../redux/store";
import "../styles/index.css";
import {useRouter} from 'next/router'

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  const router = useRouter()
  
  let background;
  let fixedTop = '';
  if(router.pathname === '/'){
    background = 'bg-transparent-800 w-screen absolute'
  }else {
    background = 'bg-black border-b-1 border-gray-500 w-screen'
    fixedTop = 'sticky top-0 z-50'
  }
  return (
    <>
      <Navbar fixedHeader={fixedTop} bg={background} />
      <Component {...pageProps} />
      {/* <Footer /> */}
    </>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);

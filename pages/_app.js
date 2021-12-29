import { createWrapper } from "next-redux-wrapper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { store } from "../redux/store";
import "../styles/index.css";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import ContextWrapper from "../context";
import "../styles/Editor.css";
import "../styles/tinymce.css";

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  const router = useRouter();

  let background;
  let fixedTop = "";
  if (router.pathname === "/") {
    background = "bg-transparent-800 w-screen absolute z-50";
  } else {
    background = "bg-black border-b-1 border-gray-500 w-screen z-50";
    fixedTop = "sticky top-0 z-50";
  }
  return (
    <ContextWrapper>
      <Navbar fixedHeader={fixedTop} bg={background} />
      <Component {...pageProps} />
      {/* <Footer /> */}
    </ContextWrapper>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);

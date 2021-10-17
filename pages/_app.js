import { createWrapper } from "next-redux-wrapper";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { store } from "../redux/store";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);

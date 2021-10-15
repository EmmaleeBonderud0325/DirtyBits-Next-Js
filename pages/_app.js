import { wrapper } from "../redux/store";

import "../styles/index.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

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

export default wrapper.withRedux(MyApp);

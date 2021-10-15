import '../styles/index.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {wrapper} from '../redux/store'

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

import { refreshTokenApi } from "../../components/api/apis";
import Cookies from "js-cookie";

const Gettoken = async (refresh_token) => {
  try {
    const result = await refreshTokenApi.post("/", {
      refresh: refresh_token,
    });
    if (result.status !== 200) {
      console.error("Token Error !");
      return false;
    }
    const { access, refresh } = result.data;
    var inTwentyMinutes = new Date(new Date().getTime() + 20 * 60 * 1000);
    Cookies.set("access", access, { expires: inTwentyMinutes });
    Cookies.set("refresh", refresh, { expires: 14 });
    return true;
  } catch (e) {
    console.error("Server Error !");
    return false;
  }
};

export default Gettoken;

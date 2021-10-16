import { refreshTokenApi } from "../../components/api/apis";
import Cookies from "js-cookie";

const Gettoken = async (refresh_token) => {
  try {
    const result = await refreshTokenApi.post("/", {
      refresh: refresh_token,
    });
    const { access, refresh } = result.data;
    Cookies.set("access", access);
    Cookies.set("refresh", refresh, { expires: 14 });
    return true;
  } catch (e) {
    console.error("Server Error !");
    return false;
  }
};

export default Gettoken;

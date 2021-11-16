import Cookies from "js-cookie";
import Gettoken from "./Gettoken";
import { getProblemsStatus } from "../api/apis";
import cloneDeep from "lodash/cloneDeep";

export const Updateproblemsstatus = async (data) => {
  let refresh_token = Cookies.get("refresh");
  if (refresh_token) {
    let idArray = [];
    for (let i = 0; i < data.length; i++) {
      idArray.push(data[i].id);
    }
    await Gettoken(Cookies.get("refresh"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: "JWT " + Cookies.get("access"),
    };
    let response = await getProblemsStatus.post(
      "/",
      { data: { ids: idArray } },
      {
        headers: headers,
      }
    );
    let oldState = cloneDeep(data);
    for (let i = 0; i < oldState.length; i++) {
      var curr = oldState[i].id;
      for (let j = 0; j < response.data.length; j++) {
        if (curr === response.data[j].id) {
          oldState[i].solved = response.data[j].solved;
        }
      }
    }
    return oldState;
  }
};
